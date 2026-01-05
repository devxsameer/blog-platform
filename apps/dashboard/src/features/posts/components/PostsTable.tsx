import type { PostContent } from '@blog/types';
import PostRow from './PostRow';

function PostsTable({ posts }: { posts: PostContent[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Title</th>
          <th>Like Count</th>
          <th>Views Count</th>
          <th>Status</th>
          <th>Updated</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        {posts.length === 0 && (
          <tr>
            <td colSpan={4} className="py-10 text-center">
              No posts found
            </td>
          </tr>
        )}

        {posts.map((post) => (
          <PostRow post={post} />
        ))}
      </tbody>
    </table>
  );
}

export default PostsTable;
