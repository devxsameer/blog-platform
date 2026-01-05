import type { LoaderFunctionArgs } from 'react-router';
import { dashboardApi } from '@blog/api-client';
import { authStore } from '@/features/auth/auth.store';
import { initAuthOnce } from '@/features/auth/init-auth-once';
import type { AdminOverview, AuthorOverview } from '@blog/types';

export type LoaderData =
  | { role: 'admin'; overview: AdminOverview }
  | { role: 'author'; overview: AuthorOverview };

export async function dashboardLoader(_: LoaderFunctionArgs) {
  await initAuthOnce();

  if (authStore.isAdmin()) {
    const overview = await dashboardApi.adminOverview();
    return { role: 'admin' as const, overview };
  }

  if (authStore.isAuthor()) {
    const overview = await dashboardApi.authorOverview();
    return { role: 'author' as const, overview };
  }

  throw new Response('Unauthorized', { status: 401 });
}
