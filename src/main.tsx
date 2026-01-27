import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import { QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/providers/ThemeProvider'
import { CurrencyProvider } from '@/context/CurrencyContext'
import { queryClient } from '@/lib/query-client'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <CurrencyProvider>
          <QueryClientProvider client={queryClient}>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </QueryClientProvider>
        </CurrencyProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>,
)
