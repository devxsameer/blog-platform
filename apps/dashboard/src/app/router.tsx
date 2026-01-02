// dashboard/src/app/router.tsx
import { loginAction } from '@/features/auth/auth.actions';
import { loginLoader, rootLoader } from '@/features/auth/auth.loaders';
import LoginPage from '@/features/auth/pages/Login';
import { DashBoardLayout } from '@/layouts/dashboard-layout';
import Dashboard from '@/pages/Dashboard';
import ProfilePage from '@/pages/Profile';
import { createBrowserRouter, redirect } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DashBoardLayout,
    loader: rootLoader,
    children: [
      { index: true, Component: Dashboard },
      { path: '/profile', Component: ProfilePage },
    ],
  },
  {
    path: '/login',
    Component: LoginPage,
    action: loginAction,
    loader: loginLoader,
  },
  { path: '*', loader: () => redirect('/') },
]);
