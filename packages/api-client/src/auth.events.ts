// api-client/src/auth.events.ts
export const authEvents = new EventTarget();

export function emitLogout() {
  authEvents.dispatchEvent(new Event('logout'));
}
