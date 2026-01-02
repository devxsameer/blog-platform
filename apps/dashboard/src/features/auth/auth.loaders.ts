import { redirect } from 'react-router';
import { authStore } from './auth.store';
import { authApi } from '@blog/api-client';
import { tokenStore } from '@blog/token-store';

export async function rootLoader() {
  try {
    if (authStore.isAuthed()) {
      return { user: authStore.getUser() };
    }

    const { user } = await authApi.me();

    authStore.setUser(user);

    if (!authStore.isAuthed()) {
      throw redirect('/login');
    }

    return { user };
  } catch {
    authStore.clear();
    tokenStore.clear();
    throw redirect('/login');
  }
}

export async function loginLoader() {
  if (authStore.isAuthed()) {
    throw redirect('/');
  }
  return null;
}
