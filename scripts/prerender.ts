import { createServer } from 'vite';
import ReactDOMServer from 'react-dom/server';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

const BASE_URL = 'https://strumandspruce.com';

const ROUTES = [
  { path: '/', file: 'index.html' },
  { path: '/reference-hub', file: 'reference-hub.html' },
  { path: '/lessons/anatomy', file: 'lessons/anatomy.html' },
  { path: '/lessons/chords', file: 'lessons/chords.html' },
  { path: '/lessons/strumming', file: 'lessons/strumming.html' },
  { path: '/lessons/songs', file: 'lessons/songs.html' },
];

function extractHeadTags(html: string): { tags: string; body: string; canonical: string } {
  const titleMatch = html.match(/<title>(.*?)<\/title>/i);
  const metaMatches = html.match(/<meta[^>]+>/gi) || [];
  const linkMatches = html.match(/<link[^>]+>/gi) || [];
  
  const tags: string[] = [];
  let canonical = '';
  
  if (titleMatch) {
    tags.push(`<title>${titleMatch[1]}</title>`);
  }
  
  for (const meta of metaMatches) {
    if (meta.includes('name="description"') || meta.includes("name='description'")) {
      tags.push(meta);
    }
  }
  
  for (const link of linkMatches) {
    if (link.includes('rel="canonical"') || link.includes("rel='canonical'")) {
      canonical = link;
      break;
    }
  }
  
  let body = html;
  body = body.replace(/<title>.*?<\/title>/gi, '');
  body = body.replace(/<meta[^>]+name="description"[^>]*>/gi, '');
  body = body.replace(/<meta[^>]+name='description'[^>]*>/gi, '');
  body = body.replace(/<link[^>]+rel="canonical"[^>]*>/gi, '');
  body = body.replace(/<link[^>]+rel='canonical'[^>]*>/gi, '');
  
  return { tags: tags.join('\n'), body, canonical };
}

function injectIntoHead(html: string, tags: string, canonical: string): string {
  const titleMatch = tags.match(/<title>(.*?)<\/title>/i);
  const metaMatch = tags.match(/<meta[^>]+name="description"[^>]*>/i) || tags.match(/<meta[^>]+content="[^"]*"[^>]*name="description"[^>]*>/i);
  
  if (titleMatch) {
    html = html.replace(/(<title>)[^<]*(<\/title>)/i, `$1${titleMatch[1]}$2`);
  }
  
  if (metaMatch) {
    const newMeta = metaMatch[0];
    const existingMetaRegex = /<meta[^>]+name="description"[^>]*>/gi;
    const existingMetaMatch = html.match(existingMetaRegex);
    
    if (existingMetaMatch) {
      html = html.replace(existingMetaRegex, newMeta);
    } else {
      const insertPoint = html.indexOf('</head>');
      if (insertPoint > 0) {
        html = html.slice(0, insertPoint) + '\n    ' + newMeta + html.slice(insertPoint);
      }
    }
  }
  
  if (canonical) {
    const existingCanonicalRegex = /<link[^>]+rel="canonical"[^>]*>/gi;
    const existingCanonicalMatch = html.match(existingCanonicalRegex);
    
    if (existingCanonicalMatch) {
      html = html.replace(existingCanonicalRegex, canonical);
    } else {
      const insertPoint = html.indexOf('</head>');
      if (insertPoint > 0) {
        html = html.slice(0, insertPoint) + '\n    ' + canonical + html.slice(insertPoint);
      }
    }
  }

  const allTitles = html.match(/<title>[^<]*<\/title>/gi);
  if (allTitles && allTitles.length > 1) {
    html = html.replace(/<title>[^<]*<\/title>/gi, '');
    const insertPoint = html.indexOf('</head>');
    html = html.slice(0, insertPoint) + allTitles[0] + '\n' + html.slice(insertPoint);
  }

  return html;
}

async function prerender() {
  const vite = await createServer({
    appType: 'custom',
  });

  const { createSSRApp } = await vite.ssrLoadModule('/src/prerender-entry.tsx');
  let indexHtml = fs.readFileSync(path.join(projectRoot, 'dist', 'index.html'), 'utf-8');

  for (const route of ROUTES) {
    const app = createSSRApp(route.path);
    const html = ReactDOMServer.renderToString(app);
    
    const { tags, body, canonical } = extractHeadTags(html);
    let output = indexHtml.replace('<div id="root"></div>', `<div id="root">${body}</div>`);
    output = injectIntoHead(output, tags, canonical);

    const filePath = path.join(projectRoot, 'dist', route.file);
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
    fs.writeFileSync(filePath, output);
    console.log(`Generated: ${route.file}`);
  }

  await vite.close();
  console.log('Prerendering complete!');
}

prerender().catch(console.error);