import {
  Link,
  useFetcher,
  useLoaderData,
  useRouteLoaderData,
  useSearchParams,
} from 'react-router';
import type { postsLoader } from '../post.loaders';
import { useEffect, useState } from 'react';
import type { rootLoader } from '@/app/root.loader';
import PostsTable from '../components/PostsTable';

export default function PostsPage() {
  const { user } = useRouteLoaderData('root') as Awaited<
    ReturnType<typeof rootLoader>
  >;

  const initialData = useLoaderData() as Awaited<
    ReturnType<typeof postsLoader>
  >;
  const fetcher = useFetcher<Awaited<ReturnType<typeof postsLoader>>>();

  const [posts, setPosts] = useState(initialData?.posts.data ?? []);
  const [nextCursor, setNextCursor] = useState(
    initialData?.posts.meta?.nextCursor,
  );
  const [params, setParams] = useSearchParams();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosts(initialData?.posts.data ?? []);
    setNextCursor(initialData?.posts.meta?.nextCursor);
  }, [initialData]);

  useEffect(() => {
    if (fetcher.data && fetcher.data.posts) {
      const newPosts = fetcher.data.posts.data;
      const newCursor = fetcher.data.posts.meta?.nextCursor;

      // eslint-disable-next-line react-hooks/set-state-in-effect
      setPosts((prev) => [...prev, ...newPosts]);
      setNextCursor(newCursor);
    }
  }, [fetcher.data]);

  const loadMore = () => {
    if (fetcher.state !== 'idle' || !nextCursor) return;

    const nextParams = new URLSearchParams(params);
    nextParams.set('cursor', nextCursor);

    fetcher.submit(nextParams, { method: 'GET' });
  };

  function updateQuery(key: string, value?: string) {
    const next = new URLSearchParams(params);

    if (value) next.set(key, value);
    else next.delete(key);

    next.delete('cursor');

    setParams(next);
    fetcher.load(`/dashboard/posts/?${next.toString()}`);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">Posts</h1>
          <p className="text-base-content/70">
            {user?.role === 'admin'
              ? 'You are admin and can edit/delete any post'
              : 'You are author and can edit/delete your posts'}
          </p>
        </div>
        <Link to="/dashboard/posts/create" className="btn btn-neutral">
          Create Post
        </Link>
      </header>

      {/* Filters */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body flex-row flex-wrap gap-4">
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
        </div>
      </div>

      {/* Table */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body overflow-x-auto">
          <PostsTable posts={posts} />

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
      </div>
    </div>
  );
}
