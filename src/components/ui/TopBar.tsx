import { useTranslation } from 'react-i18next';
import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronDown, Languages } from 'lucide-react';
import { Hand } from 'lucide-react';
import logoUrl from '/logo.png?url';
import { useApp } from '../../context/AppContext';
import { cn } from '../../lib/utils';

const LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
  { code: 'pt', label: 'Português' },
  { code: 'fr', label: 'Français' },
  { code: 'de', label: 'Deutsch' },
];

interface TopBarProps {
  showBack?: boolean;
}

export const TopBar = ({ showBack = false }: TopBarProps) => {
  const { t, i18n } = useTranslation();
  const { isLeftHanded, toggleLeftHanded } = useApp();
  const currentLang = i18n.language;
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const changeLanguage = (code: string) => {
    i18n.changeLanguage(code);
    localStorage.setItem('locale', code);
    document.documentElement.lang = code;
    setLangOpen(false);
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 editorial-shadow pt-[env(safe-area-inset-top,0px)]">
      <div className="flex justify-between items-center gap-2 px-4 sm:px-6 h-16 w-full max-w-screen-2xl mx-auto min-w-0">
        <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
          {showBack && (
            <Link to="/reference-hub" className="p-2 shrink-0 hover:bg-surface-container rounded-full transition-colors text-primary" aria-label={t('Back to hub')}>
              <ArrowLeft size={22} />
            </Link>
          )}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <img src={logoUrl} alt={t('Strum & Spruce')} className="h-20 w-20 sm:h-12 sm:w-12 md:h-16 md:w-16 lg:h-20 lg:w-20" />
            <span className="hidden sm:inline font-headline font-black tracking-tight text-lg sm:text-2xl text-primary truncate">
              {t('Strum & Spruce')}
            </span>
          </Link>
        </div>
        <div className="flex items-center gap-1">
          <div className="relative" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors bg-surface-container-high text-on-surface-variant hover:bg-surface-container-high/80"
            >
              <span className="flex items-center"><Languages size={16} /></span>
              <span className="leading-none">{LANGUAGES.find(l => l.code === currentLang)?.label ?? currentLang}</span>
              <span className="flex items-center"><ChevronDown size={16} className={cn('transition-transform', langOpen && 'rotate-180')} /></span>
            </button>
            {langOpen && (
              <div className="absolute right-0 mt-1.5 w-36 rounded-xl border border-outline-variant/20 bg-surface-container-low shadow-xl overflow-hidden z-50">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => changeLanguage(lang.code)}
                    className={cn(
                      'w-full flex items-center gap-2 px-4 py-2.5 text-sm font-body text-left transition-colors',
                      currentLang === lang.code
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-on-surface-variant hover:bg-surface-container'
                    )}
                  >
                    <span className={cn(
                      'w-2 h-2 rounded-full shrink-0',
                      currentLang === lang.code ? 'bg-primary' : 'bg-transparent'
                    )} />
                    {lang.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            onClick={toggleLeftHanded}
            className={cn(
              'inline-flex items-center justify-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium transition-colors',
              isLeftHanded
                ? 'bg-primary text-on-primary'
                : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-high/80'
            )}
            aria-label={isLeftHanded ? t('Switch to right-handed mode') : t('Switch to left-handed mode')}
            aria-pressed={isLeftHanded}
          >
            <span className="flex items-center"><Hand size={16} className="-scale-x-100" /></span>
            <span className="leading-none">{t('Left-handed')}</span>
          </button>
        </div>
      </div>
    </header>
  );
};