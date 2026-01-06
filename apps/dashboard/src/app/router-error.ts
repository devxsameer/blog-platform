import { ApiClientError } from '@blog/api-client';

export function throwRouteError(
  err: unknown,
  fallback = 'Something went wrong',
) {
  if (err instanceof ApiClientError) {
    throw new Response(err.status === 404 ? 'Not found' : fallback, {
      status: err.status ?? 500,
    });
  }

  throw new Response(fallback, { status: 500 });
}
