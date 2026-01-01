// web/src/features/post/loaders.ts
import { commentsApi, postsApi } from '@blog/api-client';
import type { LoaderFunctionArgs } from 'react-router';

export async function postLoader({ params }: LoaderFunctionArgs) {
  if (!params.postSlug) {
    throw new Response('Not Found', { status: 404 });
  }

  try {
    const post = await postsApi.get(params.postSlug);
    const comments = commentsApi.listByPost(params.postSlug);

    return { post, comments };
  } catch (err: any) {
    if (err.status === 404) {
      throw new Response('Post not found', { status: 404 });
    }

    throw new Response('Failed to load post', { status: 500 });
  }
}

export async function postsLoader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);

  const cursor = url.searchParams.get('cursor') ?? undefined;

  try {
    const result = await postsApi.list({
      cursor,
      limit: 10,
    });

    return result;
  } catch (err: any) {
    throw new Response('Failed to load posts', { status: 500 });
  }
}
