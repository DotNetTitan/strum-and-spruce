import { Link } from 'react-router-dom';
import { Ruler, Hand, Music, Library } from 'lucide-react';
import { cn } from '../lib/utils';
import logoUrl from '/logo.png?url';

export const Onboarding = () => (
  <div className="min-h-screen flex flex-col md:flex-row items-stretch overflow-hidden bg-background">
    <section className="relative w-full md:w-1/2 lg:w-3/5 min-h-[400px] md:min-h-screen bg-surface-container overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent z-10" />
      <img
        src="/hero.png"
        alt="Ukulele Craftsmanship"
        className="absolute inset-0 w-full h-full object-cover grayscale-[10%] sepia-[5%] contrast-[1.05]"
      />
      <div className="absolute top-8 left-8 z-20 md:hidden bg-background/80 backdrop-blur-md px-4 py-2 rounded-full border border-outline-variant/20 flex items-center gap-2">
        <img src={logoUrl} alt="Strum & Spruce" className="h-16 w-16" />
        <span className="font-headline font-black text-primary tracking-tight">Strum & Spruce</span>
      </div>
      <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-background rounded-full blur-3xl opacity-50 z-20" />
    </section>

    <section className="flex-1 flex flex-col justify-center px-6 py-12 md:px-16 lg:px-24 bg-background relative z-30">
      <div className="hidden md:flex items-center gap-3 mb-12">
        <img src={logoUrl} alt="Strum & Spruce" className="h-30 w-30" />
        <span className="font-headline font-black text-5xl text-primary tracking-tighter">Strum & Spruce</span>
      </div>

      <header className="mb-10 max-w-lg">
        <h1 className="font-headline font-extrabold text-4xl md:text-5xl text-on-surface leading-[1.1] mb-4 tracking-tight">
          Your Ukulele <span className="text-primary italic font-body font-medium">Reference Hub</span>
        </h1>
        <p className="text-on-surface-variant text-lg md:text-xl font-body leading-relaxed">
          Learn Ukulele the easy way. Explore instrument anatomy, essential chords, strumming patterns, and a song library, all in one place.
        </p>
      </header>

      <div className="space-y-8 mb-12 max-w-xl">
        {[
          { icon: Ruler, title: 'Instrument Anatomy', desc: 'Understand every part of your ukulele, from the headstock to the bridge.', color: 'bg-secondary-container text-on-secondary-container' },
          { icon: Hand, title: 'Chord Library', desc: 'Access a comprehensive visual guide for essential chords and finger placements.', color: 'bg-tertiary-fixed text-on-tertiary-fixed-variant' },
          { icon: Music, title: 'Strumming Patterns', desc: 'Master the rhythmic foundations that bring your music to life.', color: 'bg-primary-container text-on-primary' },
          { icon: Library, title: 'Song Library', desc: 'Play along with real songs using chord sheets and video tutorials.', color: 'bg-[#fef3e2] text-[#b45309]' },
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
          to="/reference-hub"
          className="w-full sm:w-auto px-10 py-4 bg-gradient-to-br from-primary to-primary-container text-on-primary font-headline font-bold rounded-full editorial-shadow hover:opacity-90 active:scale-95 transition-all duration-200 text-lg text-center"
        >
          Continue to Hub
        </Link>
      </footer>
    </section>
  </div>
);