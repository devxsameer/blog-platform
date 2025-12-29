import { tokenStore } from '@blog/token-store';
import { NetworkError, TimeoutError } from './transport-errors';

const DEFAULT_TIMEOUT = 10_000;

export async function httpRaw(
  input: RequestInfo,
  init: RequestInit = {},
  timeout = DEFAULT_TIMEOUT,
): Promise<{ status: number; body: any }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeout);

  const token = tokenStore.get();

  let res: Response;

  try {
    res = await fetch(input, {
      ...init,
      signal: controller.signal,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...init.headers,
      },
    });
  } catch (err: any) {
    clearTimeout(timer);

    if (err.name === 'AbortError') {
      throw new TimeoutError('Request timed out');
    }

    throw new NetworkError('Network failure');
  }

  clearTimeout(timer);

  const contentType = res.headers.get('content-type');
  const hasJson = contentType?.includes('application/json');

  let body = null;
  if (hasJson) {
    try {
      body = await res.json();
    } catch {
      body = null;
    }
  }

  return { status: res.status, body };
}
