// dashboard/src/app/router.tsx
import { loginAction } from '@/features/auth/auth.actions';
import { loginLoader } from '@/features/auth/auth.loaders';
import LoginPage from '@/features/auth/pages/Login';
import { postRoute } from '@/features/posts/post.route';
import { DashBoardLayout } from '@/layouts/dashboard-layout';
import Dashboard from '@/pages/Dashboard';
import ProfilePage from '@/pages/Profile';
import { createBrowserRouter, redirect } from 'react-router';
import RootErrorPage from '@/pages/RootError';
import ErrorPage from '@/pages/Error';
import { rootLoader } from './root.loader';

export const router = createBrowserRouter([
  {
    id: 'root',
    path: '/',
    loader: rootLoader,
    ErrorBoundary: RootErrorPage,
    children: [
      {
        index: true,
        loader: () => redirect('/dashboard'),
      },
      {
        path: 'dashboard',
        Component: DashBoardLayout,
        children: [
          { index: true, Component: Dashboard, ErrorBoundary: ErrorPage },
          { path: 'profile', Component: ProfilePage, ErrorBoundary: ErrorPage },
          postRoute,
        ],
      },
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
