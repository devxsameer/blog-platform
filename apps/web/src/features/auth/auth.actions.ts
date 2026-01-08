// web/src/features/auth/auth.actions.ts
import { redirect } from 'react-router';
import type { ActionFunctionArgs } from 'react-router';
import { tokenStore } from '@blog/token-store';
import { authStore } from './auth.store';
import { ApiClientError, authApi, ValidationError } from '@blog/api-client';

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
    if (err instanceof ValidationError || err instanceof ApiClientError) {
      return err;
    }
    console.error('Unexpected login error:', err);
    throw err;
  }
}

export async function signupAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const username = formData.get('username')?.toString() ?? '';
  const email = formData.get('email')?.toString() ?? '';
  const password = formData.get('password')?.toString() ?? '';

  try {
    const res = await authApi.signup({ username, email, password });
    tokenStore.set(res.accessToken);
    authStore.setUser(res.user);

    throw redirect('/');
  } catch (err) {
    if (err instanceof ValidationError || err instanceof ApiClientError) {
      return err;
    }
    console.error('Unexpected signup error:', err);
    throw err;
  }
}

export async function logoutAction() {
  authStore.clear();
  tokenStore.clear();

  try {
    await authApi.logout();
  } catch (err: unknown) {
    console.error(err);
  }
  return redirect('/');
}
