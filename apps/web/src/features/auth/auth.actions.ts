// web/src/features/auth/actions.ts
import { redirect } from 'react-router';
import { authStore } from './auth.store';
import type { ActionFunctionArgs } from 'react-router';
import { tokenStore } from '@blog/token-store';
import { authApi } from '@/lib/api';

export async function loginAction({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  const res = await authApi.login(data);

  tokenStore.set(res.accessToken);
  authStore.setUser(res.user);

  throw redirect('/');
}

export async function signupAction({ request }: ActionFunctionArgs) {
  const data = Object.fromEntries(await request.formData());

  const res = await authApi.signup(data);

  tokenStore.set(res.accessToken);
  authStore.setUser(res.user);

  throw redirect('/');
}
