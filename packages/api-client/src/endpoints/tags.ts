import type { Tag } from '@blog/types';
import { http } from '../http/http';
import { unwrap } from '../unwrap';

export const tagsApi = {
  async getPopular() {
    const { status, body } = await http(`/api/tags`);
    return unwrap<Tag[]>(status, body);
  },
};
