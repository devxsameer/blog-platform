import { Link, useRouteContext } from '@tanstack/react-router';
import { buildTree } from '../utils/buildTree';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import type { Comment } from '@blog/types';

export default function CommentsSection({
  postSlug,
  comments,
}: {
  postSlug: string;
  comments: Comment[];
}) {
  const { user } = useRouteContext({ from: '__root__' });
  const tree = buildTree(comments);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold">Comments</h2>

      {user ? (
        <CommentForm postSlug={postSlug} />
      ) : (
        <p className="text-sm text-neutral-600">
          <Link to="/auth/login" className="underline underline-offset-4">
            Log in
          </Link>{' '}
          to write a comment.
        </p>
      )}

      {tree.length === 0 && (
        <p className="mt-4 text-sm text-neutral-500">
          No comments yet. Be the first to start the discussion.
        </p>
      )}

      <CommentList postSlug={postSlug} tree={tree} />
    </section>
  );
}
