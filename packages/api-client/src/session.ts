// api-client/src/session.ts
import { RefreshResponseSchema } from '@blog/schemas';
import { tokenStore } from '@blog/token-store';
import type { ApiClient } from './client';
import { emitLogout } from './auth.events';

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

export async function restoreSession(
  client: ApiClient,
): Promise<string | null> {
  try {
    const token = await refreshRaw(client);
    tokenStore.set(token);
    return token;
  } catch {
    tokenStore.clear();
    emitLogout();
    return null;
  }
}
