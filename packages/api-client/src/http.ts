// api-client/src/http.ts
import { z } from 'zod';
import { ApiErrorSchema } from '@blog/schemas';
import { tokenStore } from '@blog/token-store';
import { restoreSession } from './session';
import type { ApiClient } from './client';

let refreshPromise: Promise<string | null> | null = null;
let refreshGeneration = 0;

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

    return schema ? schema.parse(json) : (json as T);
  };

  try {
    return await doRequest();
  } catch (err: any) {
    if (err.code !== 'UNAUTHORIZED') throw err;

    const method = options.method ?? 'GET';
    const isIdempotent = ['GET', 'HEAD', 'OPTIONS'].includes(method);

    if (!isIdempotent) throw err;

    if (!refreshPromise) {
      const myGen = ++refreshGeneration;

      refreshPromise = restoreSession(client).then((token) => {
        if (myGen !== refreshGeneration) return null;
        return token;
      });
    }

    const token = await refreshPromise;
    refreshPromise = null;

    if (!token) throw err;

    return doRequest();
  }
}
