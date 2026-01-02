import type { PostContent } from '@blog/types';
import { HeartIcon } from '@heroicons/react/24/solid';
import { useEffect, useState } from 'react';
import { useFetcher, useRouteLoaderData, Link } from 'react-router';
import { format } from 'date-fns';
import type { RootLoaderData } from '@/app/root.loader';

export default function PostMeta({ post }: { post: PostContent }) {
  const { user } = useRouteLoaderData('root') as RootLoaderData;
  const [likeCount, setLikeCount] = useState(post.likeCount);
  const [likedByMe, setLikedByMe] = useState(post.likedByMe);

  const likeFetcher = useFetcher();
  const isPending = likeFetcher.state !== 'idle';

  const toggleLike = () => {
    if (isPending) return;

    const nextLiked = !likedByMe;

    setLikedByMe(nextLiked);
    setLikeCount((c) => c + (nextLiked ? 1 : -1));

    likeFetcher.submit(null, {
      method: nextLiked ? 'POST' : 'DELETE',
      action: 'like',
    });
  };

  useEffect(() => {
    setLikedByMe(post.likedByMe);
    setLikeCount(post.likeCount);
  }, [post.likedByMe, post.likeCount]);

  return (
    <div className="my-2 space-y-4 text-sm text-neutral-600">
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/posts?tag=${encodeURIComponent(tag.name)}`}
            >
              <div className="badge badge-sm badge-neutral">{tag.name}</div>
            </Link>
          ))}
        </div>
      )}
      {/* Author + date */}
      <div>
        <span className="font-medium text-neutral-800">
          {post.author.username}
        </span>
        {' · '}
        <time dateTime={post.createdAt}>
          Published on {format(new Date(post.createdAt), 'MMM d, yyyy')}
        </time>
      </div>

      {/* Meta actions */}
      <div className="flex items-center gap-2">
        {/* Like Btn */}
        <div
          className={!isPending ? 'lg:tooltip lg:tooltip-bottom' : ''}
          data-tip={
            !user ? 'Login to like this post' : likedByMe ? 'Unlike' : 'Like'
          }
        >
          <button
            type="button"
            onClick={toggleLike}
            disabled={isPending || !user}
            aria-pressed={likedByMe}
            className={`btn btn-sm btn-circle text-base ${
              likedByMe ? 'btn-error' : 'text-gray-500'
            }`}
          >
            <HeartIcon className="size-4" />
          </button>
        </div>
        {/* Likes */}
        <div className="text-neutral-500">
          <span className="font-bold">{likeCount}</span> likes
        </div>
        {/* Views */}
        <div className="text-neutral-500">
          <span className="font-bold">{post.viewCount.toLocaleString()}</span>{' '}
          views
        </div>
      </div>
    </div>
  );
}
