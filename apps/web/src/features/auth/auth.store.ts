// web/src/features/auth/auth.store.ts
let user: any | null = null;

export const authStore = {
  getUser: () => user,
  setUser: (u: any | null) => (user = u),
  isAuthed: () => !!user,
  clear() {
    user = null;
  },
};
