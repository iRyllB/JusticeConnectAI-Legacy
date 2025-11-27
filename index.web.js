import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { registerRootComponent } from 'expo';

// registerRootComponent ensures the Expo environment is set up correctly for web
registerRootComponent(App);

// Additionally, ensure React DOM mounting in case expo's default doesn't run
const container = document.getElementById('root') || document.getElementById('main');
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
