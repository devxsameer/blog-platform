import { postsApi } from '@blog/api-client';
import type { ActionFunctionArgs } from 'react-router';

export async function likePostAction({ request, params }: ActionFunctionArgs) {
  if (!params.postSlug) {
    throw new Response('Bad Request', { status: 400 });
  }

  if (request.method === 'POST') {
    await postsApi.like(params.postSlug);
  } else if (request.method === 'DELETE') {
    await postsApi.unlike(params.postSlug);
  }

  return null;
}
