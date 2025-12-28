import { z } from 'zod';
import { ApiErrorSchema } from '@blog/schemas';
import { tokenStore } from '@blog/token-store';
import { refreshRaw } from './session';
import type { ApiClient } from './client';

let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

export async function http<T>(
  client: ApiClient,
  path: string,
  options: RequestInit = {},
  schema: z.ZodType<T> | null = null,
): Promise<T> {
  const doRequest = async (): Promise<T> => {
    const token = tokenStore.get();

    const res = await fetch(`${client.baseUrl}${path}`, {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    });

    const json = await res.json();

    if (!res.ok) {
      const parsed = ApiErrorSchema.safeParse(json);
      if (parsed.success) throw parsed.data.error;
      throw { code: 'UNKNOWN_ERROR', message: 'Unexpected error' };
    }

    if (!schema) return json as T;

    return schema.parse(json);
  };

  try {
    return await doRequest();
  } catch (err: any) {
    if (err.code !== 'UNAUTHORIZED') throw err;

    if (!isRefreshing) {
      isRefreshing = true;
      refreshPromise = refreshRaw(client)
        .then((token) => {
          tokenStore.set(token);
          return token;
        })
        .finally(() => {
          isRefreshing = false;
          refreshPromise = null;
        });
    }

    await refreshPromise;
    return doRequest();
  }
}
