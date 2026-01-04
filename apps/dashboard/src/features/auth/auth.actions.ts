// dashboard/src/features/auth/auth.actions.ts
import { redirect } from 'react-router';
import type { ActionFunctionArgs } from 'react-router';
import { tokenStore } from '@blog/token-store';
import { authStore } from './auth.store';
import { authApi, ValidationError } from '@blog/api-client';

export async function loginAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  try {
    const res = await authApi.login({ email, password });
    tokenStore.set(res.accessToken);
    authStore.setUser(res.user);
    throw redirect('/');
  } catch (err) {
    if (err instanceof ValidationError) {
      return err;
    }
    throw err;
  }
}

export async function logoutAction() {
  authStore.clear();
  tokenStore.clear();

  try {
    await authApi.logout();
    throw redirect('/');
  } catch (err: unknown) {
    console.error(err);
    throw redirect('/');
  }
}
