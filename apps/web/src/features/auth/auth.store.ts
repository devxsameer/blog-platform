// web/src/features/auth/auth.store.ts
import type { User } from '@blog/schemas';

let user: User | null = null;

export const authStore = {
  getUser: () => user,
  setUser: (u: User | null) => (user = u),
  isAuthed: () => !!user,
  clear() {
    user = null;
  },
};
