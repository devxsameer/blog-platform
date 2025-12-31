// web/src/app/root-layout.tsx
import Header from '@/layouts/Header';
import Breadcrumbs from '@/shared/components/Breadcrumbs';
import { Outlet } from 'react-router';

export function RootLayout() {
  return (
    <div className="font-outfit flex min-h-screen flex-col hover:col-auto">
      <Header />
      <div className="mx-auto w-full max-w-6xl p-4 py-6">
        <Breadcrumbs />
        <Outlet />
      </div>
    </div>
  );
}
