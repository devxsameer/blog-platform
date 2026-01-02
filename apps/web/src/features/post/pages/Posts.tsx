import PostList from '@/features/post/components/PostList';
import type { postsLoader } from '@/features/post/loaders';
import { useEffect, useState } from 'react';
import { useLoaderData, useFetcher } from 'react-router';

export default function PostsPage() {
  const { postsData, tags } = useLoaderData() as Awaited<
    ReturnType<typeof postsLoader>
  >;
  const fetcher = useFetcher<Awaited<ReturnType<typeof postsLoader>>>({
    key: 'posts-pagination',
  });

  const [posts, setPosts] = useState(postsData.data);
  const [cursor, setCursor] = useState(postsData.meta?.nextCursor);

  useEffect(() => {
    if (!fetcher.data) return;

    setPosts((prev) => [...prev, ...(fetcher?.data?.postsData.data ?? [])]);
    setCursor(fetcher.data.postsData.meta?.nextCursor);
  }, [fetcher.data]);

  const loadMore = () => {
    if (!cursor || fetcher.state !== 'idle') return;

    fetcher.submit(
      { cursor },
      {
        method: 'get',
        action: '.',
      },
    );
  };

  return (
    <div className="flex gap-8">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Writing</h1>

        <PostList posts={posts} />

        {cursor && (
          <div className="mt-10 flex justify-center">
            <button
              disabled={fetcher.state !== 'idle'}
              onClick={loadMore}
              type="button"
              className="btn btn-block max-w-sm"
            >
              {fetcher.state === 'loading' ? 'Loading…' : 'Show more'}
            </button>
          </div>
        )}
      </div>
      <div>
        
      </div>
    </div>
  );
}
