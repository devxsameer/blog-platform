// dashboard/src/layouts/components/Sidebar.tsx
import { Link, useMatchRoute, useRouteContext } from '@tanstack/react-router';
import { useEffect } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FaUser, FaUsers } from 'react-icons/fa';
import { IoMdCreate } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';

function Sidebar() {
  const matchRoute = useMatchRoute();
  const { user } = useRouteContext({ from: '__root__' });

  useEffect(() => {
    const drawerCheckbox = document.getElementById(
      'my-drawer-3',
    ) as HTMLInputElement | null;
    if (drawerCheckbox) {
      drawerCheckbox.checked = false;
    }
  }, [matchRoute]);

  const navLinks = [
    { to: '/dashboard', label: 'Home', icon: <AiFillHome />, exact: true },
    {
      to: '/dashboard/posts',
      label: 'Posts',
      icon: <MdSpaceDashboard />,
      exact: true,
    },
    ...(user
      ? [
          {
            to: '/dashboard/users',
            label: 'Users',
            icon: <FaUsers />,
            exact: true,
          },
        ]
      : []),
    {
      to: '/dashboard/profile',
      label: 'Profile',
      icon: <FaUser />,
      exact: true,
    },
  ];
  return (
    <>
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side border-base-300 z-[100] border-r-2">
        <label
          htmlFor="my-drawer-3"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="bg-base-100 flex min-h-full w-65 flex-col gap-4 p-4">
          <div className="p-2">
            <a className="flex cursor-pointer items-center gap-2 px-2 text-xl font-semibold">
              <MdSpaceDashboard /> Dashboard
            </a>
          </div>
          <div className="p-2">
            <Link
              to={'/dashboard/posts/create'}
              className="btn btn-block btn-neutral"
              activeProps={{ className: 'btn-disabled' }}
            >
              Create post <IoMdCreate />
            </Link>
          </div>
          <div className="menu flex w-full gap-2 p-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                activeOptions={{ exact: link.exact }}
                className="btn btn-block justify-start"
                activeProps={{ className: 'bg-base-200' }}
                inactiveProps={{ className: 'btn-ghost' }}
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-secondary' : ''}>
                      {link.icon}
                    </span>
                    {link.label}
                  </>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
