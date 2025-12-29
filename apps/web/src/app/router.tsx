// web/src/app/router.tsx
import HomePage from '@/pages/Home';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from './root.layout';
import AuthPage from '@/pages/Auth';
import {
  loginAction,
  logoutAction,
  signupAction,
} from '@/features/auth/auth.actions';
import { rootLoader } from './root.loader';

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: RootLayout,
    loader: rootLoader,
    children: [
      { index: true, Component: HomePage },
      {
        path: 'auth',
        Component: AuthPage,
        children: [
          { path: 'login', action: loginAction },
          { path: 'signup', action: signupAction },
          { path: 'logout', action: logoutAction },
        ],
      },
    ],
  },
]);
