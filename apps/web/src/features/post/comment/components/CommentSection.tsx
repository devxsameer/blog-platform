import { Link, useRouteLoaderData } from 'react-router';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import type { RootLoaderData } from '@/app/root.loader';
import { buildTree } from '../comment.utils';
import type { Comment } from '../comment.types';

export default function CommentsSection({ comments }: { comments: Comment[] }) {
  const { user } = useRouteLoaderData('root') as RootLoaderData;

  const tree = buildTree(comments);

  return (
    <section className="mt-12">
      <h2 className="text-xl font-bold">Comments</h2>
      {user ? (
        <CommentForm />
      ) : (
        <p className="text-sm text-neutral-600">
          <Link to="/auth/login" className="underline underline-offset-4">
            Log in
          </Link>{' '}
          to write a comment.
        </p>
      )}
      <CommentList tree={tree} />
    </section>
  );
}
