import PostList from '@/features/post/components/PostList';
import type { postsLoader } from '@/features/post/post.loaders';
import { Suspense, useEffect, useState } from 'react';
import { useLoaderData, useFetcher, Await } from 'react-router';
import TagsSection from '../components/TagsSection';

export default function PostsPage() {
  const { postsData, tags } = useLoaderData() as Awaited<
    ReturnType<typeof postsLoader>
  >;

  const fetcher = useFetcher<Awaited<ReturnType<typeof postsLoader>>>();

  const [posts, setPosts] = useState(postsData.data);
  const [nextCursor, setNextCursor] = useState(postsData.meta?.nextCursor);

  useEffect(() => {
    if (!fetcher.data) return;

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPosts((prev) => [...prev, ...(fetcher.data?.postsData.data ?? [])]);
    setNextCursor(fetcher.data?.postsData.meta?.nextCursor);
  }, [fetcher.data]);
  const loadMore = () => {
    if (!nextCursor || fetcher.state !== 'idle') return;

    fetcher.submit({ cursor: nextCursor }, { method: 'get', action: '.' });
  };

  return (
    <div className="flex gap-16">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold">Writing</h1>

        <PostList posts={posts} />

        {nextCursor && (
          <div className="mt-10 flex justify-center">
            <button
              disabled={fetcher.state !== 'idle'}
              onClick={loadMore}
              className="btn btn-block max-w-sm"
            >
              {fetcher.state === 'loading' ? 'Loading…' : 'Show more'}
            </button>
          </div>
        )}
      </div>

      <div>
        <Suspense fallback={<div>Loading tags...</div>}>
          <Await resolve={tags}>
            {(resolvedTags) => <TagsSection tags={resolvedTags} />}
          </Await>
        </Suspense>
      </div>
    </div>
  );
}
