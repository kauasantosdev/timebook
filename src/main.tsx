import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'
import { ReactLenis, useLenis } from 'lenis/react'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ReactLenis root options={{duration: 0.7}}>
        <App />
     </ReactLenis>
    </BrowserRouter>
  </StrictMode>
)