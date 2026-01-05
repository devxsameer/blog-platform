import type { ActionFunctionArgs } from 'react-router';
import { commentsApi } from '@blog/api-client';

export async function createCommentAction({
  request,
  params,
}: ActionFunctionArgs) {
  const formData = await request.formData();

  const content = formData.get('content');
  const parentIdRaw = formData.get('parentId');

  if (!params.postSlug || typeof content !== 'string') {
    throw new Response('Bad Request', { status: 400 });
  }
  const parentId =
    typeof parentIdRaw === 'string' && parentIdRaw.length > 0
      ? parentIdRaw
      : undefined;

  await commentsApi.create(params.postSlug, {
    content,
    parentId,
  });

  return null;
}

export async function deleteCommentAction({ params }: ActionFunctionArgs) {
  if (!params.commentId) {
    throw new Response('Bad Request', { status: 400 });
  }

  await commentsApi.delete(params.commentId);

  return null;
}
