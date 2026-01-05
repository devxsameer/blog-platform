import { redirect } from 'react-router';
import { tokenStore } from '@blog/token-store';
import { authApi } from '@blog/api-client';
import { authStore } from '@/features/auth/auth.store';
import { initAuthOnce } from '@/features/auth/init-auth-once';

export async function rootLoader() {
  try {
    await initAuthOnce();

    const { user } = await authApi.me();
    authStore.setUser(user);

    if (!authStore.isAdmin() && !authStore.isAuthor()) {
      throw redirect('/login');
    }

    authStore.setUser(user);

    return { user };
  } catch {
    authStore.clear();
    tokenStore.clear();
    throw redirect('/login');
  }
}
