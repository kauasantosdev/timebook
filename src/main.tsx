import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { ReactLenis, useLenis } from 'lenis/react'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ReactLenis root options={{duration: 0.7}}>
      <App />
    </ReactLenis>
  </StrictMode>,
);
