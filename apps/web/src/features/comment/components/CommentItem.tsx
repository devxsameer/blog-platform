import { useState } from 'react';
import { useRouteContext } from '@tanstack/react-router';
import { useDeleteComment } from '../mutations/delete-comment.mutation';
import CommentForm from './CommentForm';
import type { CommentNode } from '../types';
import { Avatar } from '@/shared/components/Avatar';

export default function CommentItem({
  postSlug,
  comment,
}: {
  postSlug: string;
  comment: CommentNode;
}) {
  const { user } = useRouteContext({ from: '__root__' });
  const deleteMutation = useDeleteComment(postSlug);
  const [isReplying, setIsReplying] = useState(false);

  const canDelete = user && user.id === comment.author.id;

  return (
    <div className="flex items-stretch">
      {/* avatar */}
      <div className="flex min-h-full flex-col items-center gap-2">
        <Avatar
          src={comment.author.avatarUrl}
          name={comment.author.username}
          size={32}
        />
        <span className="bg-base-content/15 w-0.5 grow" />
      </div>

      <div className="grow space-y-2 pl-3">
        <div className="text-sm">
          <span className="font-semibold">{comment.author.username}</span>

          <p className="text-base-content/60 my-1">{comment.content}</p>

          <div className="flex gap-1 text-xs text-neutral-500">
            <button
              className="btn btn-link btn-sm"
              onClick={() => setIsReplying((p) => !p)}
              disabled={!user}
            >
              Reply
            </button>

            {canDelete && (
              <button
                className="btn btn-link btn-sm text-red-600"
                disabled={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(comment.id)}
              >
                {deleteMutation.isPending ? 'Deleting…' : 'Delete'}
              </button>
            )}
          </div>
        </div>

        {user && isReplying && (
          <CommentForm
            postSlug={postSlug}
            parentId={comment.id}
            onSuccess={() => setIsReplying(false)}
          />
        )}

        {comment.replies.length > 0 && (
          <div className="mt-4 space-y-4">
            {comment.replies.map((reply) => (
              <CommentItem key={reply.id} postSlug={postSlug} comment={reply} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
