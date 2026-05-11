import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Ruler, Hand, Music, Library, Play } from 'lucide-react';
import { cn } from '../lib/utils';

const GUIDES = [
  {
    id: 'anatomy',
    title: 'Instrument Anatomy',
    desc: 'Explore the resonance of wood and string.',
    icon: Ruler,
    path: '/lessons/anatomy',
    color: 'bg-primary/10 text-primary',
    tag: 'Module 01'
  },
  {
    id: 'chord',
    title: 'Chords & Fingers',
    desc: 'Master finger placement and chord shapes.',
    icon: Hand,
    path: '/lessons/chords',
    color: 'bg-tertiary/10 text-tertiary',
    tag: 'Module 02'
  },
  {
    id: 'strumming',
    title: 'Strumming Patterns',
    desc: 'Find your rhythm with essential patterns.',
    icon: Music,
    path: '/lessons/strumming',
    color: 'bg-secondary/10 text-secondary',
    tag: 'Module 03'
  },
  {
    id: 'songs',
    title: 'Song Library',
    desc: 'Real songs, real chords. Practice what you\'ve learned.',
    icon: Library,
    path: '/lessons/songs',
    color: 'bg-tertiary/10 text-tertiary',
    tag: 'Module 04'
  }
];

export const Dashboard = () => {
  return (
    <>
      <Helmet>
        <title>Reference Hub | Strum & Spruce</title>
        <meta name="description" content="Your ukulele quick reference guide. Access lessons on instrument anatomy, chords, strumming patterns, and songs." />
        <link rel="canonical" href="https://strumandspruce.com/reference-hub" />
      </Helmet>
      <div className="flex-1 px-4 sm:px-6 md:px-12 py-8 sm:py-12 max-w-7xl mx-auto w-full min-w-0 pb-4 md:pb-0">
      <header className="mb-10 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl font-headline font-extrabold text-primary tracking-tight leading-tight mb-4 break-words">Reference <span className="text-tertiary italic font-body font-medium">Hub</span></h2>
        <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed mb-4">Your reference guide for ukulele basics, organized for quick access</p>
        <p className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-low px-4 py-2 font-body text-sm text-on-surface-variant">
          <span className="font-semibold text-primary">New here?</span>
          Follow the modules in order, starting with Instrument Anatomy.
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
        {GUIDES.map((guide) => (
          <Link
            key={guide.id}
            to={guide.path}
            className="group bg-surface-container-low p-8 rounded-[40px] border border-outline-variant/30 hover:border-tertiary/50 transition-all duration-500 hover:shadow-2xl hover:translate-y-[-8px] relative overflow-hidden"
          >
            <div className={cn("w-16 h-16 rounded-3xl flex items-center justify-center mb-8 transition-transform group-hover:scale-110", guide.color)}>
              <guide.icon size={32} />
            </div>
            <span className="inline-block px-3 py-1 bg-surface-container-highest text-outline rounded-full font-label text-[10px] font-bold tracking-widest uppercase mb-4">{guide.tag}</span>
            <h3 className="text-2xl font-headline font-extrabold text-primary mb-3 group-hover:text-tertiary transition-colors">{guide.title}</h3>
            <p className="text-on-surface-variant font-body leading-relaxed mb-8">{guide.desc}</p>
            <div className="flex items-center gap-2 text-tertiary font-headline font-bold text-sm">
              Explore Guide
              <Play size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>
      </div>
    </>
  );
};