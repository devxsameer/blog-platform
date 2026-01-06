import { postsApi } from '@blog/api-client';
import type { PostOrder, PostSort, PostsQuery, PostStatus } from '@blog/types';
import type { LoaderFunctionArgs } from 'react-router';
import { initAuthOnce } from '../auth/init-auth-once';
import { throwRouteError } from '@/app/router-error';

export async function postsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  await initAuthOnce();

  const sort = url.searchParams.get('sort');
  const order = url.searchParams.get('order');

  const searchQuery: PostsQuery = {
    cursor: url.searchParams.get('cursor') ?? undefined,
    authorId: url.searchParams.get('authorId') ?? undefined,
    sort: ['createdAt', 'updatedAt', 'publishedAt'].includes(sort ?? '')
      ? (sort as PostSort)
      : undefined,
    order: ['asc', 'desc'].includes(order ?? '')
      ? (order as PostOrder)
      : undefined,
    status: ['draft', 'published', 'archived'].includes(
      url.searchParams.get('status') ?? '',
    )
      ? (url.searchParams.get('status') as PostStatus)
      : undefined,
  };
  try {
    const posts = await postsApi.listDashboard(searchQuery);

    return { posts };
  } catch (err) {
    throwRouteError(err, 'Failed to load posts');
  }
}
export async function postLoader({ params }: LoaderFunctionArgs) {
  if (!params.postSlug) {
    throw new Response('Not Found', { status: 404 });
  }

  await initAuthOnce();

  try {
    const post = await postsApi.get(params.postSlug);

    return { post };
  } catch (err) {
    throwRouteError(err, 'Failed to load post');
  }
}
