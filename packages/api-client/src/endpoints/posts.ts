import type {
  Pagination,
  PostContent,
  PostInput,
  PostsQuery,
} from '@blog/types';
import { authHttp } from '../http/auth-http';
import { unwrap, unwrapWithMeta } from '../unwrap';

export const postsApi = {
  async list(params?: { cursor?: string; limit?: number }) {
    const search = new URLSearchParams();

    if (params?.cursor) search.set('cursor', params.cursor);
    if (params?.limit) search.set('limit', String(params.limit));

    const url = `/api/posts${search.toString() ? `?${search}` : ''}`;

    const { status, body } = await authHttp(url);
    return unwrapWithMeta<{ data: PostContent[]; meta: Pagination }>(
      status,
      body,
    );
  },
  async listDashboard(params?: PostsQuery) {
    const search = new URLSearchParams();

    if (params?.cursor) search.set('cursor', params.cursor);
    if (params?.authorId) search.set('authorId', params.authorId);
    if (params?.order) search.set('order', params.order);
    if (params?.sort) search.set('sort', params.sort);
    if (params?.limit) search.set('limit', String(params.limit));

    const url = `/api/posts/dashboard${search.toString() ? `?${search}` : ''}`;

    const { status, body } = await authHttp(url);

    return unwrapWithMeta<{ data: PostContent[]; meta: Pagination }>(
      status,
      body,
    );
  },

  async get(slug: string) {
    const { status, body } = await authHttp(`/api/posts/${slug}`);
    return unwrap<PostContent>(status, body);
  },

  async create(input: PostInput) {
    const { status, body } = await authHttp(`/api/posts`, {
      method: 'POST',
      body: JSON.stringify(input),
    });
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
