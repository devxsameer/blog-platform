// web/src/app/root-layout.tsx
import Header from '@/layouts/Header';
import { Outlet } from 'react-router';

export function RootLayout() {
  return (
    <div className="font-outfit flex min-h-screen flex-col text-black hover:col-auto">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
