import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { Ruler, Hand, Music, Library, Play, Coffee } from 'lucide-react';
import { cn } from '../lib/utils';

export const Dashboard = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const isRoot = location.pathname === '/';

  const GUIDES = [
    {
      id: 'anatomy',
      title: t('Instrument Anatomy'),
      desc: t('Explore the resonance of wood and string.'),
      icon: Ruler,
      path: '/lessons/anatomy',
      color: 'bg-primary/10 text-primary',
      tag: t('Module 01')
    },
    {
      id: 'chord',
      title: t('Chords & Fingers'),
      desc: t('Master finger placement and chord shapes.'),
      icon: Hand,
      path: '/lessons/chords',
      color: 'bg-tertiary/10 text-tertiary',
      tag: t('Module 02')
    },
    {
      id: 'strumming',
      title: t('Strumming Patterns'),
      desc: t('Find your rhythm with essential patterns.'),
      icon: Music,
      path: '/lessons/strumming',
      color: 'bg-secondary/10 text-secondary',
      tag: t('Module 03')
    },
    {
      id: 'songs',
      title: t('Song Library'),
      desc: t("Real songs, real chords. Practice what you've learned."),
      icon: Library,
      path: '/lessons/songs',
      color: 'bg-tertiary/10 text-tertiary',
      tag: t('Module 04')
    }
  ];

  return (
    <>
      <Helmet>
        {isRoot ? (
          <>
            <title>{`${t('Strum & Spruce')} | ${t('Learn Ukulele Online')}`}</title>
            <meta name="description" content={t("Learn ukulele the easy way, even if you're a complete beginner. Explore instrument anatomy, essential chords, strumming patterns, and a song library, all in one place.")} />
            <link rel="canonical" href="https://strumandspruce.com" />
          </>
        ) : (
          <>
            <title>{`${t('Reference Hub')} | ${t('Strum & Spruce')}`}</title>
            <meta name="description" content={t('Your ukulele quick reference guide. Access lessons on instrument anatomy, chords, strumming patterns, and songs.')} />
            <link rel="canonical" href="https://strumandspruce.com/reference-hub" />
          </>
        )}
      </Helmet>
      <div className="flex-1 px-4 sm:px-6 md:px-12 py-8 sm:py-12 max-w-7xl mx-auto w-full min-w-0 pb-4 md:pb-0">
      <header className="mb-10 sm:mb-16">
        <h2 className="text-4xl sm:text-5xl font-headline font-extrabold text-primary tracking-tight leading-tight mb-4 break-words">{t('Reference')} <span className="text-tertiary italic font-body font-medium">{t('Hub')}</span></h2>
        <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed mb-4">{t('Your reference guide for ukulele basics, organized for quick access')}</p>
        <p className="inline-flex items-center gap-2 rounded-full border border-outline-variant/30 bg-surface-container-low px-4 py-2 font-body text-sm text-on-surface-variant">
          <span className="font-semibold text-primary">{t('New here?')}</span>
          {t('Follow the modules in order, starting with Instrument Anatomy.')}
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
              {t('Explore Guide')}
              <Play size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      <section className="bg-surface-container-low rounded-[40px] border border-outline-variant/30 p-8 sm:p-12 mb-24">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="w-20 h-20 rounded-full bg-[#FF5E5B]/10 flex items-center justify-center shrink-0">
            <Coffee size={36} className="text-[#FF5E5B]" />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-2xl font-headline font-extrabold text-primary mb-2">{t('Enjoying the lessons?')}</h3>
            <p className="text-on-surface-variant font-body leading-relaxed mb-4 max-w-lg">
              {t('If Strum & Spruce is helping you learn ukulele, consider buying me a coffee! Your support keeps this project growing and improving.')}
            </p>
            <a
              href="https://ko-fi.com/strumandspruce"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FF5E5B] text-white font-headline font-bold text-sm hover:bg-[#FF5E5B]/90 transition-colors"
            >
              <Coffee size={18} />
              {t('Buy me a coffee')}
            </a>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};