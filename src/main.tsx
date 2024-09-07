import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom';
import './index.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import AppRoutes from './routes';
import Header from './components/Header';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <StrictMode>
        <Header/>
        <AppRoutes />
      </StrictMode>,
    </BrowserRouter>
  </QueryClientProvider>
)
