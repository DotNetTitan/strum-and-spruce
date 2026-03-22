import React, { useState, useEffect, useCallback, createContext, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Ruler,
  UserCircle,
  Home,
  PlayCircle,
  BookOpen,
  ArrowLeft,
  CheckCircle2,
  Info,
  Play,
  Music,
  Search,
  Hand,
  Hash,
  CircleDot
} from 'lucide-react';
import { cn } from './lib/utils';
import { motion, AnimatePresence } from 'motion/react';

// --- Context & State ---

interface AppState {
  progress: number;
  completedLessons: string[];
  completeLesson: (id: string) => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <AppContext.Provider value={{ progress: 0, completedLessons: [], completeLesson: () => { } }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

// --- Audio Hook ---

export const useUkuleleAudio = () => {
  const playChord = useCallback((chordName: string) => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // Frequencies for G4, C4, E4, A4 (Standard Tuning)
    const tuning = {
      G: 392.00,
      C: 261.63,
      E: 329.63,
      A: 440.00
    };

    // Chord fingerings (semitones above open string)
    const chords: Record<string, number[]> = {
      'C': [0, 0, 0, 3],
      'G': [0, 2, 3, 2],
      'F': [2, 0, 1, 0],
      'Am': [2, 0, 0, 0],
      'Dm': [2, 2, 1, 0],
      'G7': [0, 2, 1, 2],
      'D': [2, 2, 2, 0],
      'Em': [0, 4, 3, 2],
      'A': [2, 1, 0, 0],
      'E7': [1, 2, 0, 2],
    };

    const fingerings = chords[chordName] || [0, 0, 0, 0];
    const baseFreqs = [tuning.G, tuning.C, tuning.E, tuning.A];

    const now = ctx.currentTime;

    fingerings.forEach((fret, i) => {
      const freq = baseFreqs[i] * Math.pow(2, fret / 12);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      // Ukulele-like pluck sound
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.3, now + (i * 0.05)); // Strum effect
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.5);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + (i * 0.05));
      osc.stop(now + 1.5);
    });
  }, []);

  const playStrum = useCallback((chordName: string, pattern: string) => {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();
    const tuning = { G: 392.00, C: 261.63, E: 329.63, A: 440.00 };
    const chords: Record<string, number[]> = {
      'C': [0, 0, 0, 3],
      'G': [0, 2, 3, 2],
      'F': [2, 0, 1, 0],
      'Am': [2, 0, 0, 0],
      'Dm': [2, 2, 1, 0],
      'G7': [0, 2, 1, 2],
      'D': [2, 2, 2, 0],
      'Em': [0, 4, 3, 2],
      'A': [2, 1, 0, 0],
      'E7': [1, 2, 0, 2],
    };
    const fingerings = chords[chordName] || [0, 0, 0, 0];
    const baseFreqs = [tuning.G, tuning.C, tuning.E, tuning.A];

    const playStroke = (time: number, isDown: boolean) => {
      fingerings.forEach((fret, i) => {
        const freq = baseFreqs[i] * Math.pow(2, fret / 12);
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        const delay = isDown ? i * 0.015 : (3 - i) * 0.015;
        gain.gain.setValueAtTime(0, time + delay);
        gain.gain.linearRampToValueAtTime(0.2, time + delay + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, time + delay + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time + delay);
        osc.stop(time + delay + 0.5);
      });
    };

    const now = ctx.currentTime;
    if (pattern === 'island') {
      // D D U U D U
      playStroke(now, true);
      playStroke(now + 0.4, true);
      playStroke(now + 0.6, false);
      playStroke(now + 1.0, false);
      playStroke(now + 1.2, true);
      playStroke(now + 1.4, false);
    } else {
      playStroke(now, true);
    }
  }, []);

  return { playChord, playStrum };
};

// --- Components ---

export const GrainOverlay = () => (
  <div className="fixed inset-0 grain-overlay z-[100] pointer-events-none" />
);

export const TopBar = ({ showBack = false }: { showBack?: boolean }) => (
  <header className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-xl border-b border-outline-variant/10 editorial-shadow">
    <div className="flex justify-between items-center px-6 h-16 w-full max-w-screen-2xl mx-auto">
      <div className="flex items-center gap-4">
        {showBack && (
          <Link to="/dashboard" className="p-2 hover:bg-surface-container rounded-full transition-colors text-primary">
            <ArrowLeft size={24} />
          </Link>
        )}
        <Link to="/" className="font-headline font-black tracking-tight text-2xl text-primary">
          Strum & Spruce
        </Link>
      </div>
      <div className="flex items-center gap-2">
      </div>
    </div>
  </header>
);

export const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Reference Hub', path: '/dashboard' },
    { icon: Ruler, label: 'Anatomy Guide', path: '/lessons/anatomy' },
    { icon: Hand, label: 'Chords & Fingers', path: '/lessons/chord' },
    { icon: Music, label: 'Strumming Patterns', path: '/lessons/strumming' },
  ];

  return (
    <aside className="hidden md:flex flex-col h-[calc(100vh-4rem)] sticky top-16 w-64 bg-background border-r border-outline-variant/10 overflow-y-auto no-scrollbar">
      <div className="p-6">
        <nav className="space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-r-full transition-all duration-300 group",
                  isActive
                    ? "bg-secondary-container text-on-secondary-container font-bold shadow-sm"
                    : "text-outline hover:bg-surface-container-low"
                )}
              >
                <item.icon size={20} className={cn(isActive ? "text-on-secondary-container" : "text-outline group-hover:text-primary")} />
                <span className="font-headline text-sm">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export const BottomNav = () => {
  const location = useLocation();
  const navItems = [
    { icon: Home, label: 'Home', path: '/dashboard' },
    { icon: Ruler, label: 'Anatomy', path: '/lessons/anatomy' },
    { icon: Hand, label: 'Chords', path: '/lessons/chord', primary: true },
    { icon: Music, label: 'Strum', path: '/lessons/strumming' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full h-20 bg-background/80 backdrop-blur-2xl flex justify-around items-center px-4 pb-safe z-50 border-t border-outline-variant/10">
      {navItems.map((item) => {
        const isActive = location.pathname === item.path;
        if (item.primary) {
          return (
            <Link
              key={item.label}
              to={item.path}
              className="flex flex-col items-center justify-center bg-primary text-on-primary rounded-full w-14 h-14 mb-6 shadow-lg scale-110 active:scale-95 transition-transform"
            >
              <item.icon size={24} />
              <span className="font-headline text-[8px] font-bold tracking-widest uppercase mt-0.5">{item.label}</span>
            </Link>
          );
        }
        return (
          <Link
            key={item.label}
            to={item.path}
            className={cn(
              "flex flex-col items-center justify-center w-14 h-14 transition-transform active:scale-90",
              isActive ? "text-primary" : "text-outline"
            )}
          >
            <item.icon size={20} />
            <span className="font-headline text-[8px] font-bold tracking-widest uppercase mt-1">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export const ModuleTag = ({
  label,
  variant = 'basics'
}: {
  label: string,
  variant?: 'basics' | 'technique' | 'rhythm'
}) => {
  const themes = {
    basics: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    technique: 'bg-tertiary-fixed text-on-tertiary-fixed-variant',
    rhythm: 'bg-tertiary-fixed text-on-tertiary-fixed-variant'
  };

  return (
    <span className={cn(
      "inline-block px-3 py-1 rounded-full font-label text-[10px] font-bold tracking-[0.1em] uppercase mb-4",
      themes[variant]
    )}>
      {label}
    </span>
  );
};

export const LessonHeader = ({ 
  moduleLabel, 
  moduleVariant = 'basics', 
  title, 
  subtitle, 
  description,
  accentColor = 'text-tertiary',
  stacked = true
}: { 
  moduleLabel: string, 
  moduleVariant?: 'basics' | 'technique' | 'rhythm', 
  title: string, 
  subtitle: string, 
  description: string,
  accentColor?: string,
  stacked?: boolean
}) => (
  <header className="mb-16 max-w-2xl">
    <ModuleTag label={moduleLabel} variant={moduleVariant} />
    <h1 className="text-5xl md:text-7xl font-headline font-extrabold text-primary tracking-tight leading-[1.1] mb-6">
      {title} {stacked && <br />}
      <span className={cn("italic font-body font-medium", accentColor)}>
        {subtitle}
      </span>
    </h1>
    <p className="text-lg md:text-xl text-on-surface-variant font-body leading-relaxed">
      {description}
    </p>
  </header>
);

export const LessonFooter = ({
  backPath,
  backLabel,
  nextPath,
  nextLabel,
  nextIcon: NextIcon = ArrowLeft
}: {
  backPath: string,
  backLabel: string,
  nextPath?: string,
  nextLabel?: string,
  nextIcon?: any
}) => (
  <footer className="mt-20 flex flex-col md:flex-row justify-between items-center gap-8 py-12 border-t-2 border-surface-container-highest">
    <Link
      to={backPath}
      className="flex items-center gap-4 group hover:bg-surface-container-low px-6 py-3 rounded-2xl transition-all"
    >
      <div className="w-12 h-12 rounded-full border-2 border-outline-variant/30 flex items-center justify-center group-hover:border-primary transition-colors">
        <ArrowLeft size={20} className="text-outline group-hover:text-primary transition-colors" />
      </div>
      <div>
        <p className="font-label text-[10px] text-outline uppercase tracking-widest font-bold group-hover:text-primary/70 transition-colors">
          Previous
        </p>
        <p className="font-headline font-bold text-primary text-sm">
          {backLabel}
        </p>
      </div>
    </Link>

    {nextPath && nextLabel && (
      <Link
        to={nextPath}
        className="w-full md:w-auto px-12 py-5 bg-gradient-to-br from-primary to-primary-container text-on-primary rounded-full font-headline font-extrabold text-lg shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group"
      >
        {nextLabel}
        <NextIcon size={24} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    )}
  </footer>
);

// --- Views ---

export const Onboarding = () => (
  <div className="min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden bg-background">
    <section className="relative w-full md:w-1/2 lg:w-3/5 min-h-[400px] md:min-h-screen bg-surface-container overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
      <img
        src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFW0yqqXjs_Fm0uFQ8ZSIhA_4eGihWuPYmFR2t3-1MIJhoZVVpXyqArk557MMly_xKXQ1sARmdg5lF9JGKzdBh_TzhcCuySbxkER0NVUw637lnwcdg70MpIBaZeIKi5z9kTmLPT-Ww9bKsnoB4Tsw9OlfqKFjslxsPsbtS-AjAeZFi7d8oTkxQE89ZqlOY8RfLVOfTIqFt0uI-9sroNrv79AVX0WRA6yuO4iYa-oez7APwRMZfLTZcssObsLQ7O5dRJJG_g8Tk9kQ"
        alt="Ukulele Craftsmanship"
        className="absolute inset-0 w-full h-full object-cover grayscale-[10%] sepia-[5%] contrast-[1.05]"
        referrerPolicy="no-referrer"
      />
      <div className="absolute top-8 left-8 z-20 md:hidden bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20">
        <span className="font-headline font-black text-primary tracking-tight">Strum & Spruce</span>
      </div>
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-background rounded-full blur-3xl opacity-50 z-20" />
    </section>

    <section className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 bg-background relative z-30">
      <div className="hidden md:block mb-12">
        <span className="font-headline font-black text-3xl text-primary tracking-tighter">Strum & Spruce</span>
      </div>

      <header className="mb-10 max-w-lg">
        <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface leading-[1.1] mb-4 tracking-tight">
          Your Ukulele <span className="text-primary italic font-body font-medium">Reference Hub</span>
        </h1>
        <p className="text-on-surface-variant text-lg md:text-xl font-body leading-relaxed">
          Master the resonance of wood and string. Explore instrument anatomy, essential chords, and rhythmic patterns.
        </p>
      </header>

      <div className="space-y-8 mb-12 max-w-xl">
        {[
          { icon: Ruler, title: 'Instrument Anatomy', desc: 'Understand every part of your ukulele, from the headstock to the bridge.', color: 'bg-secondary-container text-on-secondary-container' },
          { icon: Hand, title: 'Chord Library', desc: 'Access a comprehensive visual guide for essential chords and finger placements.', color: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
          { icon: Music, title: 'Strumming Patterns', desc: 'Master the rhythmic foundations that bring your music to life.', color: 'bg-primary-container text-on-primary' },
        ].map((step, i) => (
          <div key={i} className="flex gap-6 items-start group">
            <div className={cn("flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-300", step.color)}>
              <step.icon size={24} />
            </div>
            <div className="pt-1">
              <h3 className="font-headline font-bold text-on-surface text-lg">{step.title}</h3>
              <p className="text-on-surface-variant leading-snug">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <footer className="flex flex-col sm:flex-row items-center gap-6">
        <Link
          to="/dashboard"
          className="w-full sm:w-auto px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold rounded-full editorial-shadow hover:opacity-90 active:scale-95 transition-all duration-200 text-lg text-center"
        >
          Explore Reference
        </Link>
      </footer>
    </section>
  </div>
);

export const Dashboard = () => {
  const guides = [
    {
      id: 'anatomy',
      title: 'Instrument Anatomy',
      desc: 'Explore the resonance of wood and string.',
      icon: Ruler,
      path: '/lessons/anatomy',
      color: 'bg-primary/10 text-primary',
      tag: 'Basics'
    },
    {
      id: 'chord',
      title: 'Chords & Fingers',
      desc: 'Master finger placement and basic chords.',
      icon: Hand,
      path: '/lessons/chord',
      color: 'bg-tertiary/10 text-tertiary',
      tag: 'Technique'
    },
    {
      id: 'strumming',
      title: 'Strumming Patterns',
      desc: 'Find your rhythm with essential patterns.',
      icon: Music,
      path: '/lessons/strumming',
      color: 'bg-secondary/10 text-secondary',
      tag: 'Rhythm'
    }
  ];

  return (
    <div className="flex-1 px-6 md:px-12 py-12 max-w-7xl mx-auto w-full">
      <header className="mb-16">
        <h2 className="text-5xl font-headline font-extrabold text-primary tracking-tight leading-tight mb-4">Reference <span className="text-tertiary italic font-body font-medium">Hub</span></h2>
        <p className="text-lg text-on-surface-variant max-w-2xl font-body leading-relaxed">Everything you need to master the ukulele, organized for quick access. No lessons, just pure knowledge.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
        {guides.map((guide) => (
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
  );
};

export const Strumming = () => {
  const { playStrum } = useUkuleleAudio();
  const [activePattern, setActivePattern] = useState('down');
  const [isPlaying, setIsPlaying] = useState(false);

  const patterns = [
    { id: 'down', name: 'Straight Down', desc: 'The simplest stroke. Focus on a relaxed wrist.', rhythm: 'D - D - D - D' },
    { id: 'island', name: 'Island Bounce', desc: 'The classic ukulele rhythm: Down, Down-Up, Up-Down-Up.', rhythm: 'D - D U - U D U' },
  ];

  const handlePlay = () => {
    setIsPlaying(true);
    playStrum('C', activePattern);
    const duration = activePattern === 'island' ? 2000 : 1000;
    setTimeout(() => setIsPlaying(false), duration);
  };

  return (
    <div className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <LessonHeader 
        moduleLabel="Module 03: Rhythm"
        moduleVariant="rhythm"
        title="Strumming"
        subtitle="Patterns"
        description="Rhythm is the heartbeat of the ukulele. Master these patterns to bring your chords to life."
        accentColor="text-tertiary"
        stacked={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-8 space-y-6">
          {patterns.map((p) => (
            <div
              key={p.id}
              onClick={() => setActivePattern(p.id)}
              className={cn(
                "p-8 rounded-3xl border-2 transition-all cursor-pointer group",
                activePattern === p.id ? "border-primary bg-primary/5 shadow-lg" : "border-outline-variant/20 bg-surface-container-low hover:border-outline-variant"
              )}
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-headline text-2xl font-bold mb-2">{p.name}</h3>
                  <p className="font-body text-on-surface-variant">{p.desc}</p>
                </div>
                {activePattern === p.id && (
                  <button
                    onClick={(e) => { e.stopPropagation(); handlePlay(); }}
                    disabled={isPlaying}
                    className="w-12 h-12 bg-primary text-on-primary rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform"
                  >
                    <Play size={20} fill="currentColor" />
                  </button>
                )}
              </div>
              <div className="bg-background/50 p-4 rounded-xl border border-outline-variant/10">
                <p className="font-mono text-xl tracking-[0.5em] text-primary font-bold">{p.rhythm}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="lg:col-span-4">
          <div className="bg-surface-container p-8 rounded-3xl sticky top-24">
            <h4 className="font-headline text-xl font-bold mb-6">Pro Tips</h4>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                  <Info size={16} />
                </div>
                <p className="text-sm font-body text-on-surface-variant">Use the back of your index fingernail for downstrokes and the pad for upstrokes.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-secondary-container text-secondary flex items-center justify-center shrink-0">
                  <Info size={16} />
                </div>
                <p className="text-sm font-body text-on-surface-variant">Keep your wrist loose, like you're shaking water off your hand.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <LessonFooter
        backPath="/lessons/chord"
        backLabel="Chords & Fingers"
        nextPath="/dashboard"
        nextLabel="Back to Reference Hub"
        nextIcon={LayoutDashboard}
      />
    </div>
  );
};

const UkuleleSVG = ({ isZoomed = false, selectedId = null, onClick, className }: { isZoomed?: boolean, selectedId?: string | null, onClick?: () => void, className?: string }) => {
  const id = React.useId().replace(/:/g, '');
  const woodId = `wood-${id}`;
  const grainId = `grain-${id}`;
  const glowId = `glow-${id}`;

  return (
    <motion.svg
      viewBox="0 0 200 600"
      onClick={onClick}
      className={cn(
        "z-10",
        !isZoomed ? "h-full w-auto drop-shadow-[0_25px_50px_rgba(0,0,0,0.15)]" : "w-full h-full",
        onClick && "cursor-pointer",
        className
      )}
      animate={!isZoomed ? {
        rotate: selectedId ? 0.5 : 0,
        scale: selectedId ? 1.01 : 1
      } : {}}
    >
      <defs>
        <linearGradient id={woodId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B4513" />
          <stop offset="50%" stopColor="#A0522D" />
          <stop offset="100%" stopColor="#8B4513" />
        </linearGradient>
        <pattern id={grainId} x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M0 20 Q 25 10, 50 20 T 100 20" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
          <path d="M0 50 Q 25 40, 50 50 T 100 50" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
          <path d="M0 80 Q 25 70, 50 80 T 100 80" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="0.8" />
        </pattern>
        <filter id={glowId}>
          <feGaussianBlur stdDeviation="3" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Body - Lower Bout */}
      <motion.path
        d="M100,380 C50,380 20,420 20,490 C20,560 50,600 100,600 C150,600 180,560 180,490 C180,420 150,380 100,380 Z"
        fill={`url(#${woodId})`}
        stroke="#5D4037"
        strokeWidth="2"
        initial={{ fill: '#8B4513', stroke: '#5D4037', strokeWidth: 2 }}
        animate={{
          fill: selectedId === 'body' ? '#A0522D' : '#8B4513',
          stroke: selectedId === 'body' ? '#FF9800' : '#5D4037',
          strokeWidth: selectedId === 'body' ? 3 : 2
        }}
      />
      <path d="M100,380 C50,380 20,420 20,490 C20,560 50,600 100,600 C150,600 180,560 180,490 C180,420 150,380 100,380 Z" fill={`url(#${grainId})`} pointerEvents="none" />

      {/* Body - Upper Bout */}
      <motion.path
        d="M100,300 C65,300 40,330 40,370 C40,410 65,430 100,430 C135,430 160,410 160,370 C160,330 135,300 100,300 Z"
        fill={`url(#${woodId})`}
        stroke="#5D4037"
        strokeWidth="2"
        initial={{ fill: '#8B4513', stroke: '#5D4037', strokeWidth: 2 }}
        animate={{
          fill: selectedId === 'body' ? '#A0522D' : '#8B4513',
          stroke: selectedId === 'body' ? '#FF9800' : '#5D4037',
          strokeWidth: selectedId === 'body' ? 3 : 2
        }}
      />
      <path d="M100,300 C65,300 40,330 40,370 C40,410 65,430 100,430 C135,430 160,410 160,370 C160,330 135,300 100,300 Z" fill={`url(#${grainId})`} pointerEvents="none" />

      {/* Soundhole */}
      <circle cx="100" cy="400" r="28" fill="#3E2723" stroke="#212121" strokeWidth="1" />
      <circle cx="100" cy="400" r="32" fill="none" stroke="#D2B48C" strokeWidth="1" opacity="0.5" />

      {/* Bridge */}
      <motion.rect
        x="65" y="500" width="70" height="18" rx="3"
        fill="#212121"
        stroke="transparent"
        strokeWidth={0}
        initial={{ stroke: 'transparent', strokeWidth: 0, filter: 'none' }}
        animate={{
          stroke: selectedId === 'bridge' ? '#FF9800' : 'transparent',
          strokeWidth: selectedId === 'bridge' ? 2 : 0,
          filter: selectedId === 'bridge' ? `url(#${glowId})` : 'none'
        }}
      />
      <rect x="70" y="504" width="60" height="4" rx="1" fill="#5D4037" />

      {/* Neck */}
      <motion.rect
        x="82" y="120" width="36" height="180"
        fill="#5D4037"
        stroke="transparent"
        strokeWidth={0}
        initial={{ fill: '#5D4037', stroke: 'transparent', strokeWidth: 0 }}
        animate={{
          fill: selectedId === 'neck' ? '#6D4C41' : '#5D4037',
          stroke: selectedId === 'neck' ? '#FF9800' : 'transparent',
          strokeWidth: selectedId === 'neck' ? 2 : 0
        }}
      />

      {/* Frets */}
      {[140, 165, 190, 215, 240, 265, 290].map((y, i) => (
        <React.Fragment key={i}>
          <motion.line
            x1="82" y1={y} x2="118" y2={y}
            stroke="#BDBDBD" strokeWidth="1.5"
            initial={{ stroke: '#BDBDBD', strokeWidth: 1.5 }}
            animate={{
              stroke: selectedId === 'frets' ? '#FF9800' : '#BDBDBD',
              strokeWidth: selectedId === 'frets' ? 2.5 : 1.5
            }}
          />
          {/* Fret Markers (Dots) */}
          {[190, 240, 290].includes(y) && (
            <circle cx="100" cy={y - 12.5} r="2" fill="rgba(255,255,255,0.4)" />
          )}
        </React.Fragment>
      ))}

      {/* Nut */}
      <motion.rect
        x="80" y="120" width="40" height="8" rx="1"
        fill="#F5F5F5"
        initial={{ fill: '#F5F5F5', filter: 'none' }}
        animate={{
          fill: selectedId === 'nut' ? '#FF9800' : '#F5F5F5',
          filter: selectedId === 'nut' ? `url(#${glowId})` : 'none'
        }}
      />

      {/* Headstock */}
      <motion.path
        d="M82,120 L118,120 L135,100 L135,30 C135,10 120,0 100,0 C80,0 65,10 65,30 L65,100 L82,120 Z"
        fill="#5D4037"
        stroke="#3E2723"
        strokeWidth="2"
        initial={{ fill: '#5D4037', stroke: '#3E2723', strokeWidth: 2 }}
        animate={{
          fill: selectedId === 'headstock' ? '#6D4C41' : '#5D4037',
          stroke: selectedId === 'headstock' ? '#FF9800' : '#3E2723',
          strokeWidth: selectedId === 'headstock' ? 3 : 2
        }}
      />

      {/* Tuning Pegs */}
      {[35, 75].map(y => (
        <React.Fragment key={y}>
          {/* Left Pegs */}
          <g>
            <motion.circle
              cx="50" cy={y} r="8" fill="#EEEEEE" stroke="#9E9E9E" strokeWidth="1"
              initial={{ fill: '#EEEEEE', stroke: '#9E9E9E' }}
              animate={{
                fill: selectedId === 'pegs' ? '#FF9800' : '#EEEEEE',
                stroke: selectedId === 'pegs' ? '#E65100' : '#9E9E9E'
              }}
            />
            <motion.rect
              x="48" y={y - 2} width="4" height="4" rx="1" fill="#757575"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: selectedId === 'pegs' ? 1 : 0.6 }}
            />
          </g>
          {/* Right Pegs */}
          <g>
            <motion.circle
              cx="150" cy={y} r="8" fill="#EEEEEE" stroke="#9E9E9E" strokeWidth="1"
              initial={{ fill: '#EEEEEE', stroke: '#9E9E9E' }}
              animate={{
                fill: selectedId === 'pegs' ? '#FF9800' : '#EEEEEE',
                stroke: selectedId === 'pegs' ? '#E65100' : '#9E9E9E'
              }}
            />
            <motion.rect
              x="148" y={y - 2} width="4" height="4" rx="1" fill="#757575"
              initial={{ opacity: 0.6 }}
              animate={{ opacity: selectedId === 'pegs' ? 1 : 0.6 }}
            />
          </g>
        </React.Fragment>
      ))}

      {/* Strings */}
      {[88, 96, 104, 112].map((x, i) => (
        <React.Fragment key={i}>
          {/* String on headstock to peg */}
          <motion.line
            x1={x} y1="30"
            x2={i < 2 ? 50 : 150} y2={i === 0 || i === 3 ? 35 : 75}
            stroke="#BDBDBD"
            strokeWidth="0.3"
            initial={{ opacity: 0.4 }}
            animate={{ opacity: selectedId === 'headstock' || selectedId === 'pegs' || selectedId === 'strings' ? 0.8 : 0.4 }}
          />
          {/* Main string */}
          <motion.line
            x1={x} y1="30" x2={x} y2="505"
            stroke="#FFFFFF"
            strokeWidth={i === 1 || i === 2 ? "1.5" : "1"}
            initial={{ opacity: 0.9 }}
            animate={{
              stroke: selectedId === 'strings' ? '#FF9800' : '#FFFFFF',
              strokeWidth: selectedId === 'strings' ? (i === 1 || i === 2 ? 2.5 : 2) : (i === 1 || i === 2 ? 1.5 : 1),
              opacity: selectedId === 'strings' ? 1 : 0.9
            }}
          />
        </React.Fragment>
      ))}
    </motion.svg>
  );
};

export const Anatomy = () => {
  const [selectedPart, setSelectedPart] = useState<string | null>(null);
  const { completeLesson, completedLessons } = useApp();

  const parts = [
    { id: 'headstock', title: 'Headstock', desc: 'The top piece where strings are anchored and tuned.', side: 'left', top: '8.3%', left: '50%', zoomX: 100, zoomY: 50, scale: 1.3 },
    { id: 'nut', title: 'Nut', desc: 'The grooved strip that supports the strings at the headstock.', side: 'left', top: '16.6%', left: '50%', zoomX: 100, zoomY: 100, scale: 1.3 },
    { id: 'frets', title: 'Frets', desc: 'Metal strips along the neck that define different notes.', side: 'left', top: '34%', left: '50%', zoomX: 100, zoomY: 205, scale: 1.3 },
    { id: 'strings', title: 'Strings', desc: 'Typically nylon, tuned to G-C-E-A for a standard ukulele.', side: 'left', top: '50%', left: '50%', zoomX: 100, zoomY: 300, scale: 1.3 },
    { id: 'pegs', title: 'Tuning Pegs', desc: 'Geared mechanisms used to adjust string tension and pitch.', side: 'right', top: '9.1%', left: '50%', zoomX: 100, zoomY: 55, scale: 1.3 },
    { id: 'neck', title: 'Neck & Fretboard', desc: 'The long part of the instrument where you press your fingers.', side: 'right', top: '37.5%', left: '50%', zoomX: 100, zoomY: 225, scale: 1.3 },
    { id: 'body', title: 'Body', desc: 'The hollow chamber that amplifies the vibrating strings.', side: 'right', top: '77.5%', left: '50%', zoomX: 100, zoomY: 465, scale: 1.3 },
    { id: 'bridge', title: 'Bridge', desc: 'Transfers string vibration to the top of the body\'s wood.', side: 'right', top: '85%', left: '50%', zoomX: 100, zoomY: 510, scale: 1.3 },
  ];

  const handleComplete = () => {
    completeLesson('anatomy');
  };

  return (
    <div className="flex-1 px-4 md:px-12 py-12 max-w-7xl mx-auto w-full">
      <LessonHeader 
        moduleLabel="Module 01: The Basics"
        moduleVariant="basics"
        title="Instrument"
        subtitle="Anatomy"
        description="Before we strum our first chord, let's understand the resonance of each part. Click the labels below to explore how wood and string create the ukulele's signature warmth."
        accentColor="text-tertiary"
      />

      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
        {/* Left Column: All 8 Parts */}
        <div className="lg:col-span-3 flex flex-col gap-6 text-right order-2 lg:order-1">
          {parts.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPart(prev => prev === item.id ? null : item.id)}
              className={cn(
                "group cursor-pointer transition-all duration-300",
                selectedPart === item.id ? "scale-105" : "hover:translate-x-[-4px]"
              )}
            >
              <h4 className={cn(
                "font-headline font-bold text-lg transition-colors",
                selectedPart === item.id ? "text-tertiary" : "text-primary group-hover:text-tertiary"
              )}>{item.title}</h4>
              <p className="text-sm font-body text-outline mt-1 opacity-80 leading-snug">{item.desc}</p>
              <div className={cn(
                "h-0.5 ml-auto mt-3 transition-all duration-500",
                selectedPart === item.id ? "w-full bg-tertiary" : "w-8 bg-surface-container-highest group-hover:w-full group-hover:bg-tertiary"
              )} />
            </div>
          ))}
        </div>

        {/* Center Column: Ukulele SVG */}
        <div className="lg:col-span-4 relative order-1 lg:order-2 flex justify-center min-h-[600px] w-full max-w-[320px] mx-auto pt-12">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent rounded-full blur-3xl -z-10 scale-75" />
          <UkuleleSVG selectedId={selectedPart} onClick={() => setSelectedPart(null)} />
        </div>

        {/* Right Column: Magnified Preview */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center order-3 min-h-[500px] bg-surface-container-low rounded-[40px] p-12 border border-outline-variant/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-tertiary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -ml-32 -mb-32" />

          <AnimatePresence mode="wait">
            {selectedPart ? (
              <motion.div
                key={selectedPart}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col items-center text-center w-full z-10"
              >
                <div className="relative mb-12">
                  <div className="absolute inset-0 bg-tertiary/20 rounded-full blur-2xl scale-110" />
                  <div className="w-64 h-64 rounded-full border-8 border-surface bg-surface shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden relative">
                    <div
                      className="absolute"
                      style={{
                        width: `${200 * (parts.find(p => p.id === selectedPart)?.scale || 4) * 1.5}px`,
                        height: `${600 * (parts.find(p => p.id === selectedPart)?.scale || 4) * 1.5}px`,
                        top: `-${((parts.find(p => p.id === selectedPart)?.zoomY || 0) * (parts.find(p => p.id === selectedPart)?.scale || 4) * 1.5) - 128}px`,
                        left: `-${((parts.find(p => p.id === selectedPart)?.zoomX || 0) * (parts.find(p => p.id === selectedPart)?.scale || 4) * 1.5) - 128}px`,
                      }}
                    >
                      <UkuleleSVG isZoomed selectedId={selectedPart} />
                    </div>
                    {/* Glass Effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/20 pointer-events-none shadow-[inset_0_0_60px_rgba(0,0,0,0.1)]" />
                  </div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h3 className="text-3xl font-headline font-extrabold text-primary mb-4">{parts.find(p => p.id === selectedPart)?.title}</h3>
                  <p className="text-lg text-on-surface-variant font-body leading-relaxed max-w-sm">
                    {parts.find(p => p.id === selectedPart)?.desc}
                  </p>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center text-center text-outline/40"
              >
                <div className="w-32 h-32 rounded-full border-4 border-dashed border-outline/20 flex items-center justify-center mb-6">
                  <Search className="w-12 h-12" />
                </div>
                <p className="font-headline font-bold text-xl uppercase tracking-widest">Select a part</p>
                <p className="text-sm font-body mt-2">to see a magnified view</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <div className="bg-surface-container p-8 md:p-12 rounded-3xl relative overflow-hidden mb-24">
        <div className="absolute top-0 right-0 w-64 h-64 bg-secondary-container/20 rounded-full -mr-20 -mt-20 blur-3xl" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
          <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center shrink-0 text-on-primary">
            <Info size={32} />
          </div>
          <div>
            <h3 className="font-headline font-extrabold text-2xl text-on-surface mb-2">Pro Tip: Resonance Matters</h3>
            <p className="font-body text-lg text-on-surface-variant leading-relaxed">Most entry-level ukuleles are made of laminate wood, but professional instruments use solid Koa or Mahogany. This choice of wood—the "tonewood"—defines whether your uke sounds bright or warm.</p>
          </div>
        </div>
      </div>

      <LessonFooter
        backPath="/dashboard"
        backLabel="Reference Hub"
        nextPath="/lessons/chord"
        nextLabel="Explore Chords & Fingers"
        nextIcon={Hand}
      />
    </div>
  );
};

export const ChordsAndFingers = () => {
  const { playChord } = useUkuleleAudio();
  const [currentChord, setCurrentChord] = useState('C');
  const [isPlaying, setIsPlaying] = useState(false);

  const chordsList = [
    { name: 'C', label: 'C Major', desc: 'The brightest and most versatile chord in your arsenal.' },
    { name: 'G', label: 'G Major', desc: 'A warm, resonant chord that pairs perfectly with C.' },
    { name: 'F', label: 'F Major', desc: 'A fundamental chord for thousands of popular songs.' },
    { name: 'Am', label: 'A Minor', desc: 'Adds a touch of melancholy and depth to your playing.' },
    { name: 'Dm', label: 'D Minor', desc: 'A soulful chord that creates a beautiful contrast.' },
    { name: 'G7', label: 'G7 Dominant', desc: 'The perfect tension-builder for transitions.' },
  ];

  const handlePlay = () => {
    setIsPlaying(true);
    playChord(currentChord);
    setTimeout(() => setIsPlaying(false), 1500);
  };

  const selectedChordData = chordsList.find(c => c.name === currentChord) || chordsList[0];

  return (
    <div className="pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <LessonHeader 
        moduleLabel="Module 02: Technique"
        moduleVariant="technique"
        title="Chord"
        subtitle="Technique"
        description="Master the fundamental finger placements and transitions that form the backbone of every great ukulele performance."
        accentColor="text-tertiary"
        stacked={true}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24">
        <div className="lg:col-span-4 space-y-8">
          <section className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/30 editorial-shadow">
            <h3 className="font-headline text-2xl font-bold mb-6 flex items-center gap-3 text-primary">
              <Hash size={24} />
              String Names
            </h3>
            <div className="space-y-4">
              {[
                { name: 'G', desc: '4th String (Top)', color: 'bg-primary/10 text-primary' },
                { name: 'C', desc: '3rd String', color: 'bg-secondary/10 text-secondary' },
                { name: 'E', desc: '2nd String', color: 'bg-tertiary/10 text-tertiary' },
                { name: 'A', desc: '1st String (Bottom)', color: 'bg-error/10 text-error' },
              ].map((s) => (
                <div key={s.name} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-surface-container transition-colors">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-headline font-black", s.color)}>{s.name}</div>
                  <span className="font-body font-medium text-on-surface-variant">{s.desc}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-surface-container-low p-8 rounded-[32px] border border-outline-variant/30 editorial-shadow">
            <h3 className="font-headline text-2xl font-bold mb-6 flex items-center gap-3 text-secondary">
              <UserCircle size={24} />
              Finger Numbers
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: '1', name: 'Index' },
                { n: '2', name: 'Middle' },
                { n: '3', name: 'Ring' },
                { n: '4', name: 'Pinky' },
              ].map((f) => (
                <div key={f.n} className="flex flex-col items-center p-4 bg-surface-container rounded-2xl">
                  <span className="text-3xl font-headline font-black text-secondary mb-1">{f.n}</span>
                  <span className="text-xs font-label uppercase tracking-widest text-outline font-bold">{f.name}</span>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-8">
          <div className="flex flex-wrap gap-3 mb-8">
            {chordsList.map((chord) => (
              <button
                key={chord.name}
                onClick={() => setCurrentChord(chord.name)}
                className={cn(
                  "px-6 py-3 rounded-2xl font-headline font-bold text-sm transition-all border-2",
                  currentChord === chord.name
                    ? "border-primary bg-primary/5 text-primary scale-105 shadow-md"
                    : "border-transparent bg-surface-container-highest text-outline hover:border-outline-variant"
                )}
              >
                {chord.name}
              </button>
            ))}
          </div>
          <div className="bg-surface-container rounded-3xl p-8 md:p-12 relative overflow-hidden group editorial-shadow">
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-secondary-container opacity-20 rounded-full blur-3xl transition-transform group-hover:scale-110 duration-700" />
            <div className="mb-10">
              <h2 className="text-4xl font-headline font-bold text-primary mb-2 line-clamp-1">{selectedChordData.label}</h2>
              <p className="text-on-surface-variant font-body line-clamp-1 opacity-80">{selectedChordData.desc}</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12 relative z-10">
              <div className="w-full max-w-[320px] aspect-[3/4] bg-surface-container-low rounded-2xl p-8 flex flex-col justify-between shadow-sm border border-outline-variant/10">
                <div className="flex justify-between px-4">
                  {['G', 'C', 'E', 'A'].map(s => <span key={s} className="font-label text-xs text-outline font-bold">{s}</span>)}
                </div>
                <div className="relative flex-1 mt-4 mx-4 flex justify-between border-t-4 border-primary/20">
                  <div className="absolute inset-0 flex justify-between px-[1px]">
                    {[1, 2, 3, 4].map(i => <div key={i} className="w-[1px] h-full bg-outline/40" />)}
                  </div>
                  <div className="absolute inset-0 flex flex-col justify-between">
                    {[1, 2, 3, 4, 5].map(i => <div key={i} className="h-[1px] w-full bg-outline/20" />)}
                  </div>

                  {/* Finger positions for current chord */}
                  {currentChord === 'C' && (
                    <motion.div
                      animate={{ scale: isPlaying ? [1, 1.2, 1] : 1 }}
                      className="absolute bottom-[12.5%] right-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg transform -translate-y-1/2 cursor-pointer z-20"
                      onClick={handlePlay}
                    >3</motion.div>
                  )}
                  {currentChord === 'G' && (
                    <>
                      <div className="absolute top-[37.5%] left-[25%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">1</div>
                      <div className="absolute top-[37.5%] right-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">2</div>
                      <div className="absolute top-[62.5%] left-[75%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">3</div>
                    </>
                  )}
                  {currentChord === 'F' && (
                    <>
                      <div className="absolute top-[12.5%] left-[75%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">1</div>
                      <div className="absolute top-[37.5%] left-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">2</div>
                    </>
                  )}
                  {currentChord === 'Am' && (
                    <div className="absolute top-[37.5%] left-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">2</div>
                  )}
                  {currentChord === 'Dm' && (
                    <>
                      <div className="absolute top-[37.5%] left-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">2</div>
                      <div className="absolute top-[37.5%] left-[25%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">3</div>
                      <div className="absolute top-[12.5%] left-[75%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">1</div>
                    </>
                  )}
                  {currentChord === 'G7' && (
                    <>
                      <div className="absolute top-[12.5%] left-[75%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">1</div>
                      <div className="absolute top-[37.5%] left-[25%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">2</div>
                      <div className="absolute top-[37.5%] right-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">3</div>
                    </>
                  )}
                  {currentChord === 'D' && (
                    <>
                      <div className="absolute top-[37.5%] left-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">1</div>
                      <div className="absolute top-[37.5%] left-[25%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">2</div>
                      <div className="absolute top-[37.5%] left-[75%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">3</div>
                    </>
                  )}
                  {currentChord === 'Em' && (
                    <>
                      <div className="absolute top-[37.5%] right-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">1</div>
                      <div className="absolute top-[62.5%] left-[75%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">2</div>
                      <div className="absolute top-[87.5%] left-[25%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">3</div>
                    </>
                  )}
                  {currentChord === 'A' && (
                    <>
                      <div className="absolute top-[12.5%] left-[25%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">1</div>
                      <div className="absolute top-[37.5%] left-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">2</div>
                    </>
                  )}
                  {currentChord === 'E7' && (
                    <>
                      <div className="absolute top-[12.5%] left-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">1</div>
                      <div className="absolute top-[37.5%] left-[25%] -translate-x-1/2 w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">2</div>
                      <div className="absolute top-[37.5%] right-[-14px] w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-on-primary font-headline font-bold shadow-lg z-20">3</div>
                    </>
                  )}
                </div>
                <div className="text-center pt-6">
                  <span className="font-headline font-extrabold text-3xl text-primary">{currentChord}</span>
                </div>
              </div>

              <div className="flex flex-col gap-6 w-full md:w-auto">
                <div className="space-y-2">
                  <span className="font-label text-xs uppercase tracking-widest text-outline block font-bold">Tuning</span>
                  <div className="flex gap-2">
                    <div className="px-3 py-1 bg-surface-container-highest rounded-full text-sm font-bold text-primary">G-C-E-A</div>
                  </div>
                </div>
                <button
                  onClick={handlePlay}
                  disabled={isPlaying}
                  className={cn(
                    "bg-gradient-to-br from-primary to-primary-container text-on-primary px-8 py-4 rounded-full font-headline font-bold flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all active:scale-95",
                    isPlaying && "opacity-50 cursor-not-allowed"
                  )}
                >
                  <PlayCircle size={24} className={cn(isPlaying && "animate-spin")} />
                  {isPlaying ? 'Playing...' : 'Play Sample'}
                </button>
                <div className="flex items-center gap-4 p-4 bg-surface-container-low rounded-2xl border border-outline-variant/10">
                  <div className="w-10 h-10 rounded-full bg-tertiary-fixed text-tertiary flex items-center justify-center">
                    <PlayCircle size={20} />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-on-surface">Practice Mode</div>
                    <div className="text-xs text-outline">Listen for the clean ring</div>
                  </div>
                </div>
                <button
                  onClick={() => {
                    const currentIndex = chordsList.findIndex(c => c.name === currentChord);
                    const nextIndex = (currentIndex + 1) % chordsList.length;
                    setCurrentChord(chordsList[nextIndex].name);
                  }}
                  className="w-full px-6 py-3 rounded-xl font-label text-xs font-bold border border-outline-variant/30 text-outline hover:bg-surface-container transition-all flex items-center justify-center gap-2 hover:border-primary hover:text-primary"
                >
                  <Music size={14} />
                  Switch to Next Chord
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <LessonFooter
        backPath="/lessons/anatomy"
        backLabel="Anatomy Guide"
        nextPath="/lessons/strumming"
        nextLabel="Master Strumming Patterns"
        nextIcon={Music}
      />
    </div>
  );
};
