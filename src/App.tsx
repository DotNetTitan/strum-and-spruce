import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, StaticRouter } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Analytics } from '@vercel/analytics/react';
import { cn } from './lib/utils';
import { 
  GrainOverlay, 
  TopBar, 
  Sidebar, 
  BottomNav
} from './components/ui';
import { 
  Onboarding, 
  Dashboard, 
  Anatomy, 
  ChordsAndFingers,
  Strumming,
  SongLibrary,
  SongDetail
} from './pages';
import { AppProvider } from './context/AppContext';

const isServer = typeof window === 'undefined';

function AppRouter({ children, location }: { children: React.ReactNode; location?: string }) {
  if (isServer) {
    return <StaticRouter location={location || '/'}>{children}</StaticRouter>;
  }
  return <Router>{children}</Router>;
}

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    const mainElement = document.querySelector('main');
    if (mainElement) {
      mainElement.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

function AppContent({ serverLocation }: { serverLocation?: string }) {
  const location = useLocation();
  const isOnboarding = location.pathname === '/';

  return (
    <div className="relative min-h-screen flex flex-col">
      {!isOnboarding && <TopBar showBack={location.pathname.includes('/lessons/')} />}

      <div
        className={cn(
          isOnboarding ? "flex-1" : "flex flex-1 min-h-0 min-w-0 pt-[calc(4rem+env(safe-area-inset-top,0px))]"
        )}
      >
        {!isOnboarding && <Sidebar />}

        <main
          className={cn(
            "relative flex-1 min-w-0",
            !isOnboarding &&
              "overflow-x-hidden pb-[max(6.5rem,calc(5rem+env(safe-area-inset-bottom,0px)))] md:pb-0"
          )}
        >
          <ScrollToTop />
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="h-full w-full"
            >
              <Routes location={location}>
                <Route path="/" element={<Onboarding />} />
                <Route path="/reference-hub" element={<Dashboard />} />
                <Route path="/lessons" element={<Dashboard />} />
                <Route path="/lessons/anatomy" element={<Anatomy />} />
                <Route path="/lessons/chords" element={<ChordsAndFingers />} />
                <Route path="/lessons/strumming" element={<Strumming />} />
                <Route path="/lessons/songs" element={<SongLibrary />} />
                <Route path="/lessons/songs/:id" element={<SongDetail />} />
                <Route path="*" element={<Dashboard />} />
              </Routes>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {!isOnboarding && <BottomNav />}
      <GrainOverlay />
    </div>
  );
}

export default function App({ serverLocation }: { serverLocation?: string }) {
  return (
    <AppProvider>
      <AppRouter location={serverLocation}>
        <AppContent serverLocation={serverLocation} />
      </AppRouter>
      <Analytics />
    </AppProvider>
  );
}
