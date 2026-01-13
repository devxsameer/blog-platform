// dashboard/src/layouts/components/Header.tsx
import { logout } from '@/features/auth/auth.api';
import type { User } from '@blog/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from '@tanstack/react-router';

type Props = {
  user: User | null;
};

function Header({ user }: Props) {
  const queryClient = useQueryClient();
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: async () => {
      await queryClient.setQueryData(['me'], null);
    },
  });

  return (
    <div className="navbar bg-base-100 border-base-300 text-base-content border-b-2">
      <div className="flex-1"></div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="m-1 flex items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-100"
          >
            {user?.avatarUrl ? (
              <div className="avatar">
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-8 rounded-full"
                />
              </div>
            ) : (
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-8 rounded-full">
                  <span className="text-sm font-medium">
                    {user?.username[0]}
                  </span>
                </div>
              </div>
            )}
            <div className="flex flex-col items-start">
              <span className="text-base-content text-sm/snug font-medium">
                {user?.username}
              </span>
              <span className="text-xs capitalize">{user?.role}</span>
            </div>
          </button>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link
                to={'/dashboard/profile'}
                className="btn btn-sm btn-ghost btn-block justify-start"
              >
                Profile
              </Link>
            </li>
            <li>
              <button
                type="button"
                onClick={() => logoutMutation.mutate()}
                disabled={logoutMutation.isPending}
                className="btn btn-sm btn-ghost btn-block justify-start"
              >
                {logoutMutation.isPending ? (
                  <>
                    <span className="loading loading-spinner loading-xs"></span>
                    Logging Out...
                  </>
                ) : (
                  'Logout'
                )}
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
