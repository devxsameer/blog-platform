import type { PostContent } from '@blog/types';
import StatusBadge from './StatusBadge';
import { Link, useFetcher } from 'react-router';

function PostRow({ post }: { post: PostContent }) {
  const fetcher = useFetcher();

  const isDeleting = fetcher.state === 'submitting';
  return (
    <tr key={post.id}>
      <td className="font-medium capitalize">{post.title}</td>
      <td className="font-medium capitalize">{post.likeCount}</td>
      <td className="font-medium capitalize">{post.viewCount}</td>
      <td>
        <StatusBadge status={post.status} />
      </td>
      <td className="text-base-content/70 text-sm">
        {new Date(post.updatedAt).toLocaleDateString()}
      </td>
      <td className="text-right">
        <Link
          to={`/dashboard/posts/${post.slug}/edit`}
          className="btn btn-sm btn-ghost"
        >
          Edit
        </Link>
        <button
          type="button"
          onClick={() => {
            fetcher.submit(null, {
              action: `${post.slug}/delete`,
              method: 'POST',
            });
          }}
          className="btn btn-sm btn-ghost btn-error"
          disabled={isDeleting}
        >
          {isDeleting ? 'Deleting…' : 'Delete'}
        </button>
      </td>
    </tr>
  );
}

export default PostRow;
