import { postsApi, ValidationError } from '@blog/api-client';
import type { PostInput, PostStatus } from '@blog/types';
import type { ActionFunctionArgs } from 'react-router';

export async function createPostAction({ request }: ActionFunctionArgs) {
  const formData = await request.formData();

  const postInput = {
    title: formData.get('title')?.toString() ?? '',
    contentMarkdown: formData.get('contentMarkdown')?.toString() ?? '',
    excerpt: formData.get('excerpt')?.toString() ?? null,
    status: formData.get('status')?.toString() as PostStatus,
    tags: formData.getAll('tags').map((t) => t.toString()),
  } as PostInput;

  try {
    const post = await postsApi.create(postInput);

    return { success: true, post };
  } catch (error) {
    if (error instanceof ValidationError) {
      return { success: false, error: error };
    }
    throw error;
  }
}
