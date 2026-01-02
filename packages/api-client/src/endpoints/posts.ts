import type { PostContent } from '@blog/types';
import { authHttp } from '../http/auth-http';
import { unwrap, unwrapWithMeta } from '../unwrap';

export const postsApi = {
  async list<T = any>(params?: { cursor?: string; limit?: number }) {
    const search = new URLSearchParams();

    if (params?.cursor) search.set('cursor', params.cursor);
    if (params?.limit) search.set('limit', String(params.limit));

    const url = `/api/posts${search.toString() ? `?${search}` : ''}`;

    const { status, body } = await authHttp(url);
    return unwrapWithMeta<T[]>(status, body);
  },

  async get(slug: string) {
    const { status, body } = await authHttp(`/api/posts/${slug}`);
    return unwrap<PostContent>(status, body);
  },

  async like(slug: string) {
    const { status, body } = await authHttp(`/api/posts/${slug}/like`, {
      method: 'POST',
    });
    return unwrap(status, body);
  },
  async unlike(slug: string) {
    const { status, body } = await authHttp(`/api/posts/${slug}/like`, {
      method: 'DELETE',
    });
    return unwrap(status, body);
  },
};
