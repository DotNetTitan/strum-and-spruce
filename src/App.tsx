import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
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
  Technique,
  ChordsAndFingers,
  Strumming
} from './pages';
import { AppProvider } from './context/AppContext';

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

function AppContent() {
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
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/lessons" element={<Dashboard />} />
                <Route path="/lessons/anatomy" element={<Anatomy />} />
                <Route path="/lessons/technique" element={<Technique />} />
                <Route path="/lessons/chord" element={<ChordsAndFingers />} />
                <Route path="/lessons/strumming" element={<Strumming />} />
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

export default function App() {
  return (
    <AppProvider>
      <Router>
        <AppContent />
      </Router>
      <Analytics />
    </AppProvider>
  );
}
