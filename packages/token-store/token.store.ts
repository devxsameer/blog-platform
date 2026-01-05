// Access token stored in-memory to avoid XSS risks.
// Session restored via refresh cookie on reload.
let accessToken: string | null = null;

export const tokenStore = {
  get() {
    return accessToken;
  },
  set(token: string) {
    accessToken = token;
  },
  clear() {
    accessToken = null;
  },
};
