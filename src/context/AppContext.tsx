import React, { createContext, useContext, useState, useEffect } from 'react';

interface AppState {
  progress: number;
  completedLessons: string[];
  completeLesson: (id: string) => void;
  isLeftHanded: boolean;
  toggleLeftHanded: () => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

const STORAGE_KEY = 'strum-spruce-left-handed';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLeftHanded, setIsLeftHanded] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored !== null) return stored === 'true';
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, String(isLeftHanded));
  }, [isLeftHanded]);

  const toggleLeftHanded = () => setIsLeftHanded(prev => !prev);

  return (
    <AppContext.Provider value={{ progress: 0, completedLessons: [], completeLesson: () => { }, isLeftHanded, toggleLeftHanded }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};