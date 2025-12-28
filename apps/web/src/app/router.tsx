// web/src/app/router.tsx
import HomePage from '@/pages/Home';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from './root-layout';
import AuthPage from '@/pages/Auth';
import { loginAction, signupAction } from '@/features/auth/auth.actions';
import { requireAuth } from '@/features/auth/auth.loaders';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, loader: requireAuth, Component: HomePage },
      {
        path: 'auth',
        Component: AuthPage,
        children: [
          { path: 'login', action: loginAction },
          { path: 'signup', action: signupAction },
        ],
      },
    ],
  },
]);
