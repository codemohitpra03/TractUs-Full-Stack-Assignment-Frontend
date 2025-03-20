import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import AppProvider from './context/AppContext.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import { ThemeProvider } from './context/theme-provider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      
      <AppProvider>

        <BrowserRouter>
          <App />
          <Toaster />
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  </StrictMode>,
)
