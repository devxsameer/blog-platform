import type { Post } from '@blog/types';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';

export default function PostMeta({ post }: { post: Post }) {
  const [likeCount, setLikesCount] = useState(post.likeCount);
  const [likedByMe, setLikedByMe] = useState(post.likedByMe);
  const likeFetcher = useFetcher();
  const isPending = likeFetcher.state !== 'idle';

  const toggleLike = () => {
    if (isPending) return;

    // optimistic update
    setLikedByMe((prev) => !prev);
    setLikesCount((c) => c + (likedByMe ? -1 : 1));

    likeFetcher.submit(null, {
      method: likedByMe ? 'delete' : 'post',
      action: `like`,
    });
  };

  useEffect(() => {
    if (likeFetcher.state === 'idle' && likeFetcher.data instanceof Error) {
      setLikedByMe(post.likedByMe);
      setLikesCount(post.likeCount);
    }
  }, [likeFetcher.state]);

  return (
    <div className="text-sm text-gray-500">
      <span>{post.author.username}</span>
      {' · '}
      <time>{new Date(post.createdAt).toLocaleDateString()}</time>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={toggleLike}
          disabled={isPending}
          className={`btn btn-sm btn-circle text-base ${
            likedByMe ? 'btn-error' : 'text-gray-500'
          }`}
        >
          <HeartIcon className="size-4" />
        </button>
        <span className={`flex items-center gap-2 text-base text-gray-500`}>
          Views: {likeCount}
          {post.viewCount}
        </span>
      </div>
    </div>
  );
}
