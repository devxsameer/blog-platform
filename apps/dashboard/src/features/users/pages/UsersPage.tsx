import { useInfiniteQuery } from '@tanstack/react-query';
import { usersApi } from '@blog/api-client';
import UsersTable from '../components/UsersTable';
import { useSearch } from '@tanstack/react-router';

export default function UsersPage() {
  const search = useSearch({ from: '/dashboard/users/' });

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ['admin-users', search],
      queryFn: ({ pageParam }) =>
        usersApi.list({
          cursor: pageParam,
          role: search.role,
          isActive: search.isActive,
        }),
      initialPageParam: undefined as string | undefined,
      getNextPageParam: (lastPage) => lastPage.meta?.nextCursor,
    });

  const users = data?.pages.flatMap((p) => p.data) ?? [];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Users</h1>
        <p className="text-base-content/70">
          Admin-only view of platform users.
        </p>
      </header>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body overflow-x-auto">
          <UsersTable users={users} />

          {hasNextPage && (
            <div className="flex justify-center">
              <button
                className="btn btn-outline"
                onClick={() => fetchNextPage()}
              >
                {isFetchingNextPage ? 'Loading…' : 'Load more'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
