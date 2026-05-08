import React, { createContext, useContext } from 'react';

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