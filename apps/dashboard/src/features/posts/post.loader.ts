import { ApiClientError, postsApi } from '@blog/api-client';
import type { PostOrder, PostSort, PostsQuery, PostStatus } from '@blog/types';
import type { LoaderFunctionArgs } from 'react-router';

export async function postsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const searchQuery: PostsQuery = {
    cursor: url.searchParams.get('cursor') ?? undefined,
    authorId: url.searchParams.get('authorId') ?? undefined,
    sort: (url.searchParams.get('sort') as PostSort) ?? undefined,
    order: (url.searchParams.get('order') as PostOrder) ?? undefined,
    status: (url.searchParams.get('status') as PostStatus) ?? undefined,
  };
  try {
    const posts = await postsApi.listDashboard(searchQuery);

    return { posts };
  } catch (err) {
    if (err instanceof ApiClientError) {
      throw new Response('Failed to load posts', { status: 500 });
    }
    throw new Response('Failed to load posts', { status: 500 });
  }
}
