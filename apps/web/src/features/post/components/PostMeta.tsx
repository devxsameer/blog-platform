import type { PostContent } from '@blog/types';
import { format } from 'date-fns';
import { useToggleLike } from '../mutations/like-post.mutation';
import { useAuth } from '@/features/auth/auth.query';
import { IoHeart } from 'react-icons/io5';

export default function PostMeta({ post }: { post: PostContent }) {
  const { data: user } = useAuth();
  const toggleLikeMutation = useToggleLike(post.slug);

  const isPending = toggleLikeMutation.isPending;
  const likedByMe = post.likedByMe;
  const likeCount = post.likeCount;

  const toggleLike = () => {
    if (!user || isPending) return;
    toggleLikeMutation.mutate(!likedByMe);
  };
  return (
    <div className="my-2 space-y-4 text-sm text-neutral-600">
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <div key={tag.id} className="badge badge-sm badge-neutral">
              {tag.name}
            </div>
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
          Published on {format(new Date(post.createdAt!), 'MMM d, yyyy')}
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
            <IoHeart />
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
