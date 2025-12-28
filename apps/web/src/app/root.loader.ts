// web/src/app/root.loader.ts
import { tokenStore } from '@blog/token-store';
import { authStore } from '@/features/auth/auth.store';
import { apiClient, authApi } from '@/lib/api';
import type { User } from '@blog/schemas';
import { restoreSession } from '@blog/api-client';

export type RootLoaderData = {
  user: User | null;
};

export async function rootLoader(): Promise<RootLoaderData> {
  if (authStore.isAuthed()) {
    return { user: authStore.getUser() };
  }
  try {
    if (!tokenStore.get()) {
      const refreshed = await restoreSession(apiClient);
      if (!refreshed) {
        return { user: null };
      }
    }

    const { user } = await authApi.me();
    authStore.setUser(user);

    return { user };
  } catch {
    authStore.clear();
    tokenStore.clear();
    return { user: null };
  }
}
