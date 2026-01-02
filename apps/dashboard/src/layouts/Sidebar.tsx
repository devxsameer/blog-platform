import { AiFillHome } from 'react-icons/ai';
import { FaUser } from 'react-icons/fa';
import { IoMdCreate } from 'react-icons/io';
import { MdSpaceDashboard } from 'react-icons/md';
import { NavLink } from 'react-router';

function Sidebar() {
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
            <button type="button" className="btn btn-block btn-neutral">
              Create post <IoMdCreate />
            </button>
          </div>
          <div className="menu flex w-full gap-2 p-2">
            <NavLink
              className={({ isActive }) =>
                `btn btn-block ${isActive ? '' : 'btn-ghost'} justify-start`
              }
              to={'/'}
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-secondary' : ''}>
                    <AiFillHome />
                  </span>
                  Home
                </>
              )}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `btn btn-block ${isActive ? '' : 'btn-ghost'} justify-start`
              }
              to={'/profile'}
            >
              {({ isActive }) => (
                <>
                  <span className={isActive ? 'text-secondary' : ''}>
                    <FaUser />
                  </span>
                  Profile
                </>
              )}
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
