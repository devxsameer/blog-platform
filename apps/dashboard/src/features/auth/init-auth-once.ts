// auth/init-auth-once.ts
import { authApi } from '@blog/api-client';

let initPromise: Promise<boolean> | null = null;

export function initAuthOnce() {
  if (!initPromise) {
    initPromise = authApi.initAuth();
  }
  return initPromise;
}
