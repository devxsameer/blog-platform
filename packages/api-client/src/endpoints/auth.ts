import { authHttp } from '../http/auth-http';
import { tokenStore } from '@blog/token-store';

export const authApi = {
  me() {
    return authHttp<{ user: any }>('/api/auth/me');
  },

  login(input: any) {
    return authHttp<{ user: any; accessToken: string }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },
  signup(input: any) {
    return authHttp<{ user: any; accessToken: string }>('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify(input),
    });
  },

  async logout() {
    try {
      await authHttp('/api/auth/logout', { method: 'POST' });
    } finally {
      tokenStore.clear();
    }
  },
};
