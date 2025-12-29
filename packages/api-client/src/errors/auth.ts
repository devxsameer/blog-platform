import { ApiClientError } from './base';

export class AuthError extends ApiClientError {
  constructor() {
    super('UNAUTHORIZED', 401, 'Authentication required');
    this.name = 'AuthError';
  }
}
