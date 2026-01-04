import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DatabaseProvider } from './contexts/DatabaseContext'
import { LanguageProvider } from './contexts/LanguageContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DatabaseProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </DatabaseProvider>
  </StrictMode>,
)
