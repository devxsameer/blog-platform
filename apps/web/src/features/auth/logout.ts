import { tokenStore } from '@blog/token-store';
import { authStore } from './auth.store';
import { redirect } from 'react-router';

export async function logoutAction() {
  try {
    await fetch('/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } finally {
    tokenStore.clear();
    authStore.clear();
    throw redirect('/login');
  }
}
