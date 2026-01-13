import UsersPage from '@/features/users/pages/UsersPage';
import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/dashboard/users/')({
  beforeLoad: ({ context }) => {
    if (context.user?.role !== 'admin') {
      throw redirect({ to: '/dashboard' });
    }
  },
  component: UsersPage,
});
