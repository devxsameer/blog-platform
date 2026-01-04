import {
  Link,
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from 'react-router';
import type { postsLoader } from '../post.loader';
import type { rootLoader } from '@/features/auth/auth.loaders';
import { useEffect, useState } from 'react';

function StatusBadge({ status }: { status: string }) {
  const map: Record<string, string> = {
    draft: 'badge-ghost',
    published: 'badge-success',
    archived: 'badge-neutral',
  };

  return <span className={`badge ${map[status]}`}>{status}</span>;
}

export default function PostsPage() {
  const { user } = useRouteLoaderData('root') as Awaited<
    ReturnType<typeof rootLoader>
  >;

  const { posts: postsData } = useLoaderData() as Awaited<
    ReturnType<typeof postsLoader>
  >;
  const fetcher = useFetcher<Awaited<ReturnType<typeof postsLoader>>>();

  const [posts, setPosts] = useState(postsData.data);
  const [nextCursor, setNextCursor] = useState(postsData.meta?.nextCursor);
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    console.log(nextCursor);
    if (!fetcher.data) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosts((prev) => [...prev, ...(fetcher.data?.posts.data ?? [])]);
    setNextCursor(fetcher.data?.posts.meta?.nextCursor);
  }, [fetcher.data, nextCursor]);

  const loadMore = () => {
    if (fetcher.state !== 'idle') return;

    const next = new URLSearchParams(params);
    next.set('cursor', nextCursor ?? '');
    console.log(next.toString());
    fetcher.load(`/dashboard/posts?${next.toString()}`);
  };

  function updateQuery(key: string, value?: string) {
    const next = new URLSearchParams(params);

    if (value) next.set(key, value);
    else next.delete(key);

    next.delete('cursor');

    setParams(next);
    fetcher.load(`/dashboard/posts?${next.toString()}`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Posts</h1>
        <Link to="/posts/create" className="btn btn-primary">
          Create Post
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {/* Status */}
        <select
          className="select select-bordered"
          value={params.get('status') ?? ''}
          onChange={(e) => updateQuery('status', e.target.value || undefined)}
        >
          <option value="">All statuses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
          <option value="archived">Archived</option>
        </select>

        {/* Sort */}
        <select
          className="select select-bordered"
          value={params.get('sort') ?? ''}
          onChange={(e) => updateQuery('sort', e.target.value || undefined)}
        >
          <option value="">Sort by</option>
          <option value="createdAt">Created</option>
          <option value="updatedAt">Updated</option>
        </select>

        {/* Order */}
        <select
          className="select select-bordered"
          value={params.get('order') ?? ''}
          onChange={(e) => updateQuery('order', e.target.value || undefined)}
        >
          <option value="">Order</option>
          <option value="desc">Newest</option>
          <option value="asc">Oldest</option>
        </select>

        {/* Admin-only author filter */}
        {user?.role === 'admin' && (
          <input
            type="text"
            placeholder="Filter by authorId"
            className="input input-bordered"
            value={params.get('authorId') ?? ''}
            onChange={(e) =>
              updateQuery('authorId', e.target.value || undefined)
            }
          />
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border">
        <table className="table">
          <thead>
            <tr>
              <th>Title</th>
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
              <tr key={post.id}>
                <td className="font-medium">{post.title}</td>
                <td>
                  <StatusBadge status={post.status} />
                </td>
                <td className="text-base-content/70 text-sm">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
                <td className="text-right">
                  <Link
                    to={`/posts/${post.slug}/edit`}
                    className="btn btn-sm btn-ghost"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {nextCursor && (
        <div className="flex justify-center">
          <button
            className={`btn btn-outline ${
              fetcher.state === 'loading' ? 'btn-disabled' : ''
            }`}
            onClick={loadMore}
          >
            {fetcher.state === 'loading' ? 'Loading...' : 'Load more'}
          </button>
        </div>
      )}
    </div>
  );
}
