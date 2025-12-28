// web/src/auth/auth.loaders.ts
import { redirect } from 'react-router';
import { authStore } from './auth.store';
import { restoreSession } from '@blog/api-client';
import { tokenStore } from '@blog/token-store';
import { apiClient, authApi } from '@/lib/api';

export async function requireAuth() {
  if (authStore.isAuthed()) {
    return null;
  }

  if (!tokenStore.get()) {
    const restored = await restoreSession(apiClient);
    if (!restored) {
      authStore.clear();
      throw redirect('/auth/login');
    }
  }

  try {
    const { user } = await authApi.me();
    authStore.setUser(user);
    return null;
  } catch {
    tokenStore.clear();
    authStore.clear();
    throw redirect('/auth/login');
  }
}
