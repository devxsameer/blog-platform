import { logout } from '@/features/auth/auth.api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Link, useRouteContext } from '@tanstack/react-router';
import { useState } from 'react';

export default function Header() {
  const { user } = useRouteContext({ from: '__root__' });
  const queryClient = useQueryClient();
  const [mobileOpen, setMobileOpen] = useState(false);

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.setQueryData(['me'], null);
    },
  });

  return (
    <header className="bg-base-100/80 border-base-300 sticky top-0 z-50 border-b backdrop-blur">
      <div className="navbar mx-auto max-w-6xl px-4">
        {/* Left */}
        <div className="navbar-start">
          <Link to="/" className="flex flex-col leading-none">
            <span className="text-xl font-bold tracking-tight">
              Blog<span className="text-neutral-400">.</span>
            </span>
            <span className="text-sm text-neutral-500">
              writing with{' '}
              <span className="text-base-content font-medium">devXsameer</span>
            </span>
          </Link>
        </div>

        {/* Center (Desktop nav) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/posts">Posts</NavItem>
            <NavItem to="/portfolio">Portfolio</NavItem>
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-2">
          {!user ? (
            <>
              <Link to="/auth/login" className="btn btn-ghost btn-sm">
                Login
              </Link>
              <Link to="/auth/signup" className="btn btn-neutral btn-sm">
                Sign up
              </Link>
            </>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost gap-2">
                <div className="avatar avatar-placeholder">
                  <div className="bg-neutral text-neutral-content w-8 rounded-full">
                    <span className="text-sm font-medium">
                      {user.username[0].toUpperCase()}
                    </span>
                  </div>
                </div>
                <span className="hidden text-sm font-medium sm:inline">
                  {user.username}
                </span>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow"
              >
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <a
                    href="https://dashboard.blog.devxsameer.me"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                  >
                    {logoutMutation.isPending ? 'Logging out…' : 'Logout'}
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className="btn btn-ghost md:hidden"
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-base-300 bg-base-100 border-t md:hidden">
          <ul className="menu gap-1 p-4">
            <NavItem to="/" onClick={() => setMobileOpen(false)}>
              Home
            </NavItem>
            <NavItem to="/posts" onClick={() => setMobileOpen(false)}>
              Posts
            </NavItem>
            <NavItem to="/portfolio" onClick={() => setMobileOpen(false)}>
              Portfolio
            </NavItem>

            <div className="divider my-2" />

            {!user ? (
              <>
                <NavItem to="/auth/login" onClick={() => setMobileOpen(false)}>
                  Login
                </NavItem>
                <NavItem to="/auth/signup" onClick={() => setMobileOpen(false)}>
                  Sign up
                </NavItem>
              </>
            ) : (
              <>
                <NavItem to="/profile" onClick={() => setMobileOpen(false)}>
                  Profile
                </NavItem>
                <li>
                  <a
                    href="https://dashboard.blog.devxsameer.me"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => {
                      logoutMutation.mutate();
                      setMobileOpen(false);
                    }}
                    disabled={logoutMutation.isPending}
                  >
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </header>
  );
}

/* ---------------- helpers ---------------- */

function NavItem({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        activeProps={{
          className: 'font-medium underline underline-offset-4',
        }}
      >
        {children}
      </Link>
    </li>
  );
}
