import { Await, Outlet, useRouteLoaderData } from 'react-router';
import type { postLoader } from '@/features/post/post.loaders';
import PostContent from '@/features/post/components/PostContent';
import CommentsSection from '../comment/components/CommentSection';
import Breadcrumbs from '@/shared/components/Breadcrumbs';
import { Suspense } from 'react';

export default function PostPage() {
  const { post, comments } = useRouteLoaderData('post') as Awaited<
    ReturnType<typeof postLoader>
  >;

  return (
    <>
      <Breadcrumbs dynamicLabel={post.title} />
      <div>
        <PostContent post={post} />
        <Suspense fallback={<div>Loading comments...</div>}>
          <Await resolve={comments}>
            {(resolvedComments) => (
              <CommentsSection comments={resolvedComments} />
            )}
          </Await>
        </Suspense>
        <Outlet />
      </div>
    </>
  );
}
