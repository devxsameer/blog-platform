import { AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { IoMdCreate } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';
import { NavLink } from 'react-router';

function Sidebar() {
  const navLinks = [
    { to: '/dashboard', label: 'Home', icon: <AiFillHome />, end: true },
    {
      to: '/dashboard/posts',
      label: 'Posts',
      icon: <MdSpaceDashboard />,
      end: false,
    },
    {
      to: '/dashboard/profile',
      label: 'Profile',
      icon: <FaUser />,
      end: false,
    },
  ];
  return (
    <>
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side border-base-300 border-r-2">
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
            <NavLink
              to={'/dashboard/posts/create'}
              className={({ isActive }) =>
                `btn btn-block btn-neutral ${isActive ? 'btn-disabled' : ''}`
              }
            >
              Create post <IoMdCreate />
            </NavLink>
          </div>
          <div className="menu flex w-full gap-2 p-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.end}
                className={({ isActive }) =>
                  `btn btn-block ${isActive ? 'bg-base-200' : 'btn-ghost'} justify-start`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className={isActive ? 'text-secondary' : ''}>
                      {link.icon}
                    </span>
                    {link.label}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
