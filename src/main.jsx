import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { DatabaseProvider } from './contexts/DatabaseContext'
import { LanguageProvider } from './contexts/LanguageContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <DatabaseProvider>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </DatabaseProvider>
    </ThemeProvider>
  </StrictMode>,
)
