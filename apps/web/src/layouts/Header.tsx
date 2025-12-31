import type { RootLoaderData } from '@/app/root.loader';
import { useState } from 'react';
import { Form, Link, NavLink as RouterNavLink, useFetcher } from 'react-router';
import { useRouteLoaderData } from 'react-router';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const { user } = useRouteLoaderData('root') as RootLoaderData;
  const fetcher = useFetcher();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between border-b border-neutral-200 px-4 py-2">
        {/* Logo - Changed to Link */}
        <Link to="/" className="flex flex-col leading-none">
          <span className="text-xl/tight font-bold tracking-tight">
            Blog<span className="text-neutral-400">.</span>
          </span>
          <span className="text-sm/tight text-neutral-500">
            writing with <span className="font-medium">devXsameer</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/posts">Posts</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>

        {/* Auth Actions (Desktop) */}
        <div className="hidden items-center gap-4 md:flex">
          {!user ? (
            <>
              <NavLink to="/auth/login">Login</NavLink>
              <Link
                to="/auth/signup"
                className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Sign up
              </Link>
            </>
          ) : (
            <div className="relative">
              <div className="dropdown dropdown-end">
                <button
                  tabIndex={0}
                  role="button"
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="m-1 flex items-center gap-2 rounded-md px-2 py-1 hover:bg-neutral-100"
                >
                  <div className="avatar avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-8 rounded-full">
                      <span className="text-sm font-medium">
                        {user.username[0].toUpperCase()}
                      </span>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-neutral-700">
                    {user.username}
                  </span>
                </button>
                <ul
                  tabIndex={-1}
                  className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
                >
                  <li>
                    <DropdownLink to="/profile">Profile</DropdownLink>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() =>
                        fetcher.submit(null, {
                          method: 'POST',
                          action: '/auth/logout',
                        })
                      }
                      className="w-full px-4 py-2 text-left text-sm text-neutral-700 hover:bg-neutral-100"
                    >
                      {fetcher.state === 'submitting'
                        ? 'Logging out...'
                        : 'Logout'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Button remains same */}
        <button
          onClick={() => setOpen(!open)}
          className="rounded-md p-2 text-neutral-700 hover:bg-neutral-100 md:hidden"
          aria-label="Toggle menu"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            {open ? (
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

      {/* Mobile Nav */}
      {open && (
        <div className="border-t border-neutral-200 bg-white md:hidden">
          <nav className="flex flex-col gap-2 px-4 py-4">
            <MobileNavLink to="/" onClick={() => setOpen(false)}>
              Home
            </MobileNavLink>
            <MobileNavLink to="/posts" onClick={() => setOpen(false)}>
              Posts
            </MobileNavLink>
            <MobileNavLink to="/about" onClick={() => setOpen(false)}>
              About
            </MobileNavLink>
            <div className="my-2 border-t border-neutral-200" />
            {!user ? (
              <>
                <MobileNavLink to="/auth/login" onClick={() => setOpen(false)}>
                  Login
                </MobileNavLink>
                <MobileNavLink to="/auth/signup" onClick={() => setOpen(false)}>
                  Sign up
                </MobileNavLink>
              </>
            ) : (
              <>
                <MobileNavLink to="/profile" onClick={() => setOpen(false)}>
                  Profile
                </MobileNavLink>
                <MobileNavLink to="/dashboard" onClick={() => setOpen(false)}>
                  Dashboard
                </MobileNavLink>
                <Form
                  method="post"
                  action="/auth/logout"
                  onSubmit={() => setProfileOpen(false)}
                >
                  <button
                    type="submit"
                    className="rounded-md px-2 py-2 text-left text-sm font-medium text-neutral-700 hover:bg-neutral-100"
                  >
                    Logout
                  </button>
                </Form>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

/* ---------- Updated Helpers ---------- */

function NavLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        `text-sm font-medium transition-colors hover:text-neutral-900 ${
          isActive
            ? 'text-neutral-900 underline underline-offset-4'
            : 'text-neutral-500'
        }`
      }
    >
      {children}
    </RouterNavLink>
  );
}

function MobileNavLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="rounded-md px-2 py-2 text-sm font-medium text-neutral-700 hover:bg-neutral-100"
    >
      {children}
    </Link>
  );
}

function DropdownLink({
  to,
  children,
}: {
  to: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      to={to}
      className="block px-4 py-2 text-sm text-neutral-700 hover:bg-neutral-100"
    >
      {children}
    </Link>
  );
}
