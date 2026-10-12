import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './styles/index.css'
import App from './App'
import { startAnalytics } from './lib/analytics'

createRoot(document.getElementById('root')!).render(
  <StrictMode><BrowserRouter><App /></BrowserRouter></StrictMode>,
)

void startAnalytics({ key: import.meta.env.VITE_POSTHOG_KEY, enabled: import.meta.env.PROD })
