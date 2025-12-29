import { httpRaw } from './http-raw';
import { NetworkError, TimeoutError } from './transport-errors';

const IDEMPOTENT = new Set(['GET', 'HEAD']);

export async function http(
  input: RequestInfo,
  init: RequestInit = {},
  retries = 1,
): Promise<{ status: number; body: any }> {
  try {
    return await httpRaw(input, init);
  } catch (err) {
    const method = (init.method ?? 'GET').toUpperCase();

    const canRetry =
      retries > 0 &&
      IDEMPOTENT.has(method) &&
      (err instanceof NetworkError || err instanceof TimeoutError);

    if (!canRetry) {
      throw err;
    }

    return http(input, init, retries - 1);
  }
}
