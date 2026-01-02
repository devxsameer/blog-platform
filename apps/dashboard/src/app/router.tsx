// web/src/app/router.tsx
import { DashBoardLayout } from '@/layouts/dashboard-layout';
import Dashboard from '@/pages/Dashboard';
import ProfilePage from '@/pages/Profile';
import { createBrowserRouter } from 'react-router';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: DashBoardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: '/profile', Component: ProfilePage },
    ],
  },
]);
