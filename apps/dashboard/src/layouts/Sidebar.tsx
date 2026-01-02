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
        <div className="bg-base-100 flex min-h-full w-65 flex-col p-4">
          <div className="p-2">
            <a className="flex cursor-pointer items-center gap-2 px-2 text-xl font-semibold">
              <MdSpaceDashboard /> Dashboard
            </a>
          </div>
          <ul className="menu flex-1 p-4">
            <li>
              <NavLink to={'/'}>Home</NavLink>
            </li>
            <li>
              <NavLink to={'/profile'}>Profile</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
