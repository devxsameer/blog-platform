import type { AdminOverview, AuthorOverview } from '@blog/types';
import { authHttp } from '../http/auth-http';
import { unwrap } from '../unwrap';

export const dashboardApi = {
  async adminOverview() {
    const { status, body } = await authHttp('/api/dashboard/admin/overview');
    return unwrap<AdminOverview>(status, body);
  },
  async authorOverview() {
    const { status, body } = await authHttp('/api/dashboard/author/overview');
    return unwrap<AuthorOverview>(status, body);
  },
};
