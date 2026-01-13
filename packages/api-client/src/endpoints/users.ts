import type { User, Pagination } from '@blog/types';
import { authHttp } from '../http/auth-http';
import { unwrap, unwrapWithMeta } from '../unwrap';

export const usersApi = {
  async list(params?: {
    role?: 'admin' | 'author' | 'user';
    isActive?: boolean;
    cursor?: string;
    limit?: number;
  }) {
    const search = new URLSearchParams();

    if (params?.role) search.set('role', params.role);
    if (typeof params?.isActive === 'boolean') {
      search.set('isActive', String(params.isActive));
    }
    if (params?.cursor) search.set('cursor', params.cursor);
    if (params?.limit) search.set('limit', String(params.limit));

    const url = `/api/users${search.toString() ? `?${search}` : ''}`;

    const { status, body } = await authHttp(url);

    return unwrapWithMeta<{ data: User[]; meta: Pagination }>(status, body);
  },

  async update(userId: string, input: Partial<User>) {
    const { status, body } = await authHttp(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });

    return unwrap<User>(status, body);
  },

  async updateMe(input: Partial<User>) {
    const { status, body } = await authHttp(`/api/users/me`, {
      method: 'PUT',
      body: JSON.stringify(input),
    });

    return unwrap<User>(status, body);
  },
};
