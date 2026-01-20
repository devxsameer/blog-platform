// src/main.tsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProviders } from '@/app/providers';
import '@/styles/index.css';
import { applyTheme, getStoredTheme } from '@/shared/utils/theme';

applyTheme(getStoredTheme());

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProviders />
  </StrictMode>,
);
