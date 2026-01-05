// web/src/app/router.tsx
import HomePage from '@/pages/Home';
import { createBrowserRouter } from 'react-router';
import { RootLayout } from './root.layout';
import { portfolioLoader, rootLoader } from './root.loader';
import { ErrorPage } from '@/pages/Error';
import ProfilePage from '@/pages/Profile';
import { requireAuth } from '@/features/auth/auth.loaders';
import { postRoute } from '@/features/post/post.route';
import { authRoute } from '@/features/auth/auth.route';

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
          authRoute,
          { path: 'profile', Component: ProfilePage, loader: requireAuth },
          { path: 'portfolio', loader: portfolioLoader },
          postRoute,
          { path: '*', element: <ErrorPage /> },
        ],
      },
    ],
  },
]);
