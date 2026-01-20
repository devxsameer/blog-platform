import { useAuth } from '@/features/auth/auth.query';
import { useLogout } from '@/features/auth/mutations/logout.mutation';
import { Avatar } from '@/shared/components/Avatar';
import { ThemeToggle } from '@/shared/components/ThemeToggle';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { MdLogout, MdSpaceDashboard } from 'react-icons/md';

export default function Header() {
  const { data: user, isLoading } = useAuth();
  const logoutMutation = useLogout();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-base-content/20 sticky top-0 z-50 border-b backdrop-blur">
      <div className="navbar mx-auto min-h-12 max-w-6xl px-4 py-1.5">
        <div className="navbar-start">
          <Link to="/" className="flex flex-col">
            <span className="text-xl leading-tight font-bold">
              Blog<span className="text-neutral-400">.</span>
            </span>
            <span className="text-sm text-neutral-500">
              writing with{' '}
              <span className="text-base-content font-medium">devXsameer</span>
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-2 py-0">
            <li>
              <Link
                to="/"
                activeProps={{
                  className: 'font-medium underline underline-offset-4',
                }}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/posts"
                activeProps={{
                  className: 'font-medium underline underline-offset-4',
                }}
              >
                Posts
              </Link>
            </li>

            <li>
              <a href="https://devxsameer.me" target="_blank" rel="noreferrer">
                Portfolio
              </a>
            </li>
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end gap-2">
          <ThemeToggle />
          {isLoading ? (
            <AuthSkeleton />
          ) : !user ? (
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
              <label tabIndex={0} className="btn btn-ghost btn-sm gap-2">
                <Avatar src={user.avatarUrl} name={user.username} size={32} />
                <span className="hidden text-sm font-medium sm:inline">
                  {user.username}
                </span>
              </label>

              <ul
                tabIndex={0}
                className="menu dropdown-content border-base-content/20 rounded-box bg-base-100 mt-2 w-52 border p-2 shadow"
              >
                <li>
                  <Link to="/profile" className="flex items-center gap-2">
                    <FaUser /> Profile
                  </Link>
                </li>
                <li>
                  <a
                    href="https://dashboard.blog.devxsameer.me"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2"
                  >
                    <MdSpaceDashboard />
                    Dashboard
                  </a>
                </li>
                <li>
                  <button
                    onClick={() => logoutMutation.mutate()}
                    disabled={logoutMutation.isPending}
                    className="flex items-center gap-2"
                  >
                    {logoutMutation.isPending ? (
                      'Logging out…'
                    ) : (
                      <>
                        <MdLogout /> Logout
                      </>
                    )}
                  </button>
                </li>
              </ul>
            </div>
          )}

          {/* Mobile toggle */}
          <button
            className="btn btn-sm btn-ghost text-base md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="bg-base-100 border-base-content/20 border-t md:hidden">
          <ul className="menu p-4">
            <li>
              <Link to="/" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/posts" onClick={() => setMobileOpen(false)}>
                Posts
              </Link>
            </li>
            <li>
              <a href="https://devxsameer.me" target="_blank" rel="noreferrer">
                Portfolio
              </a>
            </li>

            <div className="divider" />

            {!user ? (
              <>
                <li>
                  <Link to="/auth/login">Login</Link>
                </li>
                <li>
                  <Link to="/auth/signup">Sign up</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/profile">Profile</Link>
                </li>
                <li>
                  <button onClick={() => logoutMutation.mutate()}>
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

/* -------- skeleton -------- */

function AuthSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <div className="skeleton h-10 w-10 rounded-full" />
      <div className="skeleton h-4 w-18" />
    </div>
  );
}
