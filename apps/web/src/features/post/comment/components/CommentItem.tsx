import { useFetcher, useRouteLoaderData } from 'react-router';
import type { CommentNode } from '../types';
import CommentForm from './CommentForm';
import type { RootLoaderData } from '@/app/root.loader';
import { useState } from 'react';

export default function CommentItem({ comment }: { comment: CommentNode }) {
  const { user } = useRouteLoaderData('root') as RootLoaderData;
  const fetcher = useFetcher();
  const [isReplying, setIsReplying] = useState(false);
  const isDeleting = fetcher.state === 'submitting';

  const canDelete = user && user.id === comment.author.id;

  return (
    <div className="flex items-stretch">
      <div className="flex min-h-full flex-col items-center gap-2">
        <div className="avatar avatar-placeholder">
          <div className="bg-neutral text-neutral-content w-8 rounded-full">
            <span className="text-sm font-medium">
              {comment.author.username[0].toUpperCase()}
            </span>
          </div>
        </div>
        <span className="bg-neutral-content w-0.5 grow"></span>
      </div>
      <div className="grow space-y-2 pl-3">
        <div className="text-sm">
          <span className="font-semibold">{comment.author.username}</span>
          <p className="my-1 text-neutral-600">{comment.content}</p>
          <div className="flex gap-1 text-xs text-neutral-500">
            <button
              type="button"
              className="btn btn-link btn-neutral btn-sm"
              disabled={!user}
              onClick={() => setIsReplying((p) => !p)}
            >
              Reply
            </button>

            {canDelete && (
              <button
                type="button"
                onClick={() =>
                  fetcher.submit(null, {
                    action: `comments/${comment.id}/delete`,
                    method: 'POST',
                  })
                }
                className="btn btn-sm btn-link cursor-pointer text-red-600"
                disabled={isDeleting}
              >
                {isDeleting ? 'Deleting…' : 'Delete'}
              </button>
            )}
          </div>
        </div>

        {user && isReplying && (
          <CommentForm
            parentId={comment.id}
            onSuccess={() => setIsReplying(false)}
          />
        )}

        {comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
