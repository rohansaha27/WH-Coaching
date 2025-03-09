import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Analytics } from '@vercel/analytics/react'; // Import the Analytics component 


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Analytics />  {/* Add this component to enable Vercel Analytics */}
  </StrictMode>,
)
