import { authHttp } from '../http/auth-http';

export const postsApi = {
  list() {
    return authHttp<any[]>('/api/posts');
  },

  get(slug: string) {
    return authHttp<any>(`/api/posts/${slug}`);
  },

  create(input: any) {
    return authHttp<any>('/api/posts', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
};
