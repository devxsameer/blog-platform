import { http } from './http';
import type { ApiClient } from './client';
import {
  LoginInputSchema,
  LoginResponseSchema,
  SignupInputSchema,
  SignupResponseSchema,
  MeResponseSchema,
} from '@blog/schemas';

export function createAuthApi(client: ApiClient) {
  return {
    async login(input: unknown) {
      const payload = LoginInputSchema.parse(input);
      const res = await http(
        client,
        '/api/auth/login',
        { method: 'POST', body: JSON.stringify(payload) },
        LoginResponseSchema,
      );
      if (!res.success) throw res.error;
      return res.data;
    },

    async signup(input: unknown) {
      const payload = SignupInputSchema.parse(input);
      const res = await http(
        client,
        '/api/auth/signup',
        { method: 'POST', body: JSON.stringify(payload) },
        SignupResponseSchema,
      );
      if (!res.success) throw res.error;
      return res.data;
    },

    async me() {
      const res = await http(
        client,
        '/api/auth/me',
        { method: 'GET' },
        MeResponseSchema,
      );
      if (!res.success) throw res.error;
      return res.data;
    },
  };
}
