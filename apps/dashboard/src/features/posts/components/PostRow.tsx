import type { Post } from '@blog/types';
import StatusBadge from './StatusBadge';
import { Link } from 'react-router';
import DeletePostButton from './DeletePostBtn';

function PostRow({ post }: { post: Post }) {
  return (
    <tr key={post.id}>
      <td className="font-medium capitalize">{post.title}</td>
      <td className="font-medium capitalize">{post.likeCount}</td>
      <td className="font-medium capitalize">{post.viewCount}</td>
      <td>
        <StatusBadge status={post.status} />
      </td>
      <td className="text-base-content/70 text-sm">
        {new Date(post?.updatedAt ?? '').toLocaleDateString()}
      </td>
      <td className="text-right">
        <Link
          to={`/dashboard/posts/${post.slug}/edit`}
          className="btn btn-sm btn-ghost"
        >
          Edit
        </Link>
        <DeletePostButton slug={post.slug} />
      </td>
    </tr>
  );
}

export default PostRow;
