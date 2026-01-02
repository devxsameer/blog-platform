import { Link } from 'react-router';
import type { PostContent } from '@blog/types';

export default function PostCard({ post }: { post: PostContent }) {
  return (
    <article className="group max-w-prose pb-4">
      <h2 className="text-xl font-bold">
        <Link to={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>

      {post.excerpt && <p className="text-base-content my-3">{post.excerpt}</p>}

      {post.tags && post.tags.length > 0 && (
        <div className="my-3 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Link
              key={tag.id}
              to={`/posts?tag=${encodeURIComponent(tag.name)}`}
              className="badge badge-outline badge-sm hover:badge-primary transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              #{tag.name}
            </Link>
          ))}
        </div>
      )}

      <Link
        to={`/posts/${post.slug}`}
        className="cursor-pointer py-2 font-bold"
      >
        Read more
      </Link>
    </article>
  );
}
