// web/src/app/router.tsx
import HomePage from '@/pages/Home';
import { createBrowserRouter, Navigate } from 'react-router';
import { RootLayout } from './root.layout';
import {
  loginAction,
  logoutAction,
  signupAction,
} from '@/features/auth/auth.actions';
import { aboutLoader, rootLoader } from './root.loader';
import AuthLayout from '@/layouts/AuthLayout';
import LoginPage from '@/features/auth/pages/Login';
import SignupPage from '@/features/auth/pages/Signup';
import { ErrorPage } from '@/pages/Error';
import ProfilePage from '@/pages/Profile';
import { requireAuth } from '@/features/auth/auth.loaders';
import { postRoute } from '@/features/post/route';

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    Component: RootLayout,
    loader: rootLoader,
    // errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { index: true, Component: HomePage },
          {
            path: 'auth',
            Component: AuthLayout,
            children: [
              { index: true, element: <Navigate to="login" replace /> },
              { path: 'login', Component: LoginPage, action: loginAction },
              { path: 'signup', Component: SignupPage, action: signupAction },
              { path: 'logout', action: logoutAction },
            ],
          },
          { path: 'profile', Component: ProfilePage, loader: requireAuth },
          { path: 'about', loader: aboutLoader },
          postRoute,
          { path: '*', element: <ErrorPage /> },
        ],
      },
    ],
  },
]);
