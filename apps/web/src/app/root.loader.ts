// web/src/app/root.loader.ts
import { tokenStore } from '@blog/token-store';
import { authStore } from '@/features/auth/auth.store';
import { authApi } from '@/lib/api';

export type RootLoaderData = {
  user: {
    id: string;
    username: string;
    role: 'author' | 'admin' | 'user';
    email: string;
  } | null;
};

export async function rootLoader(): Promise<RootLoaderData> {
  if (authStore.isAuthed()) {
    return { user: authStore.getUser() };
  }
  try {
    const { user } = await authApi.me();
    authStore.setUser(user);

    return { user };
  } catch {
    authStore.clear();
    tokenStore.clear();
    return { user: null };
  }
}
