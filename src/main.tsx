import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@/i18n';
import './index.css';
import App from './App.tsx';
import { ToastProvider } from '@/components/ui/Toast';
import { useAuthStore } from '@/stores/authStore';

// Initialize auth on app load
useAuthStore.getState().initialize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>,
);
