import { createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen';

export const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: { user: null! },
  defaultErrorComponent: ({ error }) => (
    <div className="p-6">
      <h2 className="text-xl font-bold">Something went wrong</h2>
      <pre className="text-sm opacity-70">{error.message}</pre>
    </div>
  ),
  defaultPendingComponent: () => (
    <div className="fixed inset-0 flex items-center justify-center">
      <span className="loading loading-spinner loading-lg" />
    </div>
  ),
});

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}
