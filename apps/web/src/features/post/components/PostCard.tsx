import { Link } from 'react-router';

export default function PostCard({ post }: any) {
 
  return (
    <article className="group max-w-prose pb-4">
      <h2 className="text-xl font-bold">
        <Link to={`/posts/${post.slug}`} className="hover:underline">
          {post.title}
        </Link>
      </h2>

      {post.excerpt && <p className="text-base-content my-3">{post.excerpt}</p>}
      <Link
        to={`/posts/${post.slug}`}
        className="cursor-pointer py-2 font-bold"
      >
        Read more
      </Link>
    </article>
  );
}
