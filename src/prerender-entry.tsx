import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export function createSSRApp(path: string) {
  return (
    <HelmetProvider>
      <App serverLocation={path} />
    </HelmetProvider>
  );
}