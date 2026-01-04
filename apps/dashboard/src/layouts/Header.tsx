import type { rootLoader } from '@/features/auth/auth.loaders';
import { Link, useRouteLoaderData } from 'react-router';

function Header() {
  const { user } = useRouteLoaderData('root') as Awaited<
    ReturnType<typeof rootLoader>
  >;

  return (
    <div className="navbar bg-base-100 border-base-300 text-base-content border-b-2">
      <div className="flex-1">
        <a className="btn btn-ghost btn-lg">Search</a>
      </div>
      <div className="flex-none">
        <div className="dropdown dropdown-end">
          <button
            tabIndex={0}
            role="button"
            className="m-1 flex items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-100"
          >
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-8 rounded-full">
                <span className="text-sm font-medium">{user?.username[0]}</span>
              </div>
            </div>
            <div className="flex flex-col items-start">
              <span className="text-base-content text-sm/snug font-medium">
                {user?.username}
              </span>
              <span className="text-xs capitalize">{user?.role}</span>
            </div>
          </button>
          <ul
            tabIndex={-1}
            className="menu dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={'/dashboard/profile'} className="justify-between">
                Profile
              </Link>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
