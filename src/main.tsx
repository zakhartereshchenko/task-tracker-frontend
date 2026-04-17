import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './providers/ReactQueryProvider.tsx'
import { Toaster } from 'sonner'
import { HeaderProvider } from './hooks/useHeader.tsx'
import { TooltipProvider } from './components/ui/tooltip.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HeaderProvider>
          <TooltipProvider>
            <Toaster position="bottom-left" richColors/>
            <App />
          </TooltipProvider>
        </HeaderProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
