// dashboard/src/features/auth/auth.store.ts
import type { User } from '@blog/types';
let user: User | null = null;

export const authStore = {
  getUser: () => user,
  setUser: (u: User | null) => (user = u),

  isAuthed: () => {
    return !!user;
  },
  hasRole: (role: User['role']) => {
    return user?.role === role;
  },
  isAdmin: () => user?.role === 'admin',

  isAuthor: () => user?.role === 'author',
  clear() {
    user = null;
  },
};
