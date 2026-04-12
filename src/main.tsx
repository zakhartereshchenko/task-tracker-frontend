import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import "./index.css"
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './providers/ReactQueryProvider.tsx'
import { Toaster } from 'sonner'
import { HeaderProvider } from './hooks/useHeader.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <HeaderProvider>
          <Toaster position="bottom-left" richColors/>
          <App />
        </HeaderProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </StrictMode>,
)
