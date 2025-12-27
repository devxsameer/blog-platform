// web/src/app/providers.tsx
import { RouterProvider } from 'react-router';
import { router } from './router';

export function AppProviders() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
