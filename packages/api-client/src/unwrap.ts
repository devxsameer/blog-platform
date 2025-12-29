import { ApiClientError } from './errors/base';
import { ValidationError } from './errors/validation';
import { AuthError } from './errors/auth';

export function unwrap<T>(status: number, body: any): T {
  if (!body) {
    throw new ApiClientError('INVALID_RESPONSE', status, 'Empty response body');
  }

  if (body.success === true) {
    return body.data as T;
  }

  const { code, message, issues } = body.error ?? {};

  if (status === 401) {
    throw new AuthError();
  }

  if (code === 'VALIDATION_ERROR') {
    throw new ValidationError(message, issues ?? []);
  }

  throw new ApiClientError(code ?? 'UNKNOWN_ERROR', status, message);
}

export function unwrapWithMeta<T>(
  status: number,
  body: any,
): { data: T; meta?: any } {
  if (!body) {
    throw new ApiClientError('INVALID_RESPONSE', status, 'Empty body');
  }

  if (body.success === true) {
    return {
      data: body.data as T,
      meta: body.meta,
    };
  }

  const { code, message, issues } = body.error ?? {};

  if (status === 401) throw new AuthError();
  if (code === 'VALIDATION_ERROR') {
    throw new ValidationError(message, issues ?? []);
  }

  throw new ApiClientError(code ?? 'UNKNOWN_ERROR', status, message);
}
