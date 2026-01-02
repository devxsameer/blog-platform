// dashboard/src/features/auth/auth.store.ts
import type { User } from '@blog/types';
let user: User | null = null;

export const authStore = {
  getUser: () => user,
  setUser: (u: User | null) => (user = u),
  isAuthed: () => {
    if (user?.role) {
      if (user.role === 'admin' || user.role === 'author') {
        return true;
      }
    }
    return false;
  },
  clear() {
    user = null;
  },
};
