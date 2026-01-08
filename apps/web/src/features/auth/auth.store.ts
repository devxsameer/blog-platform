import type { User } from '@blog/types';

// web/src/features/auth/auth.store.ts
let user: User | null = null;

export const authStore = {
  getUser: () => user,
  setUser: (u: any | null) => (user = u),
  isAuthed: () => !!user,
  clear() {
    user = null;
  },
};
