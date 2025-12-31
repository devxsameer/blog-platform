import type { Post } from '@blog/types';

export default function PostMeta({ post }: { post: Post }) {
  return (
    <div className="text-sm text-gray-500">
      <span>{post.author.username}</span>
      {' · '}
      <time>{new Date(post.createdAt).toLocaleDateString()}</time>
    </div>
  );
}
