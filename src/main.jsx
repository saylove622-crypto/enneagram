import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './ux-design/styles/index.css'
import App from './system/core/App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
