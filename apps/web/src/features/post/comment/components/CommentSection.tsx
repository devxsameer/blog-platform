import { Link, useFetcher, useParams, useRouteLoaderData } from 'react-router';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import type { RootLoaderData } from '@/app/root.loader';
import { useEffect, useState } from 'react';
import { buildTree } from '../utils';
import type { Comment } from '../types';

export default function CommentsSection() {
  const { user } = useRouteLoaderData('root') as RootLoaderData;
  const [comments, setComments] = useState<Comment[]>([]);
  const { postSlug } = useParams();
  const fetcher = useFetcher<{ comments: Comment[] }>();

  useEffect(() => {
    fetcher.load(`/posts/${postSlug}/comments`);
  }, [postSlug]);

  useEffect(() => {
    if (!fetcher.data) return;

    if (fetcher.data.comments) {
      setComments((prev) => [...prev, ...(fetcher.data?.comments ?? [])]);
    }
  }, [fetcher.data]);

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
