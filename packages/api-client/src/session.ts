import { RefreshResponseSchema } from '@blog/schemas';
import { tokenStore } from '@blog/token-store';
import type { ApiClient } from './client';

export async function refreshRaw(client: ApiClient): Promise<string> {
  const res = await fetch(`${client.baseUrl}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  });

  const json = await res.json();
  const parsed = RefreshResponseSchema.parse(json);

  if (!parsed.success) throw parsed.error;
  return parsed.data.accessToken;
}

export async function restoreSession(client: ApiClient): Promise<boolean> {
  try {
    const token = await refreshRaw(client);
    tokenStore.set(token);
    return true;
  } catch {
    tokenStore.clear();
    return false;
  }
}
