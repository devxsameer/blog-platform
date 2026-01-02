import { Outlet } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { RiMenu4Fill } from 'react-icons/ri';

export function DashBoardLayout() {
  return (
    <div className="font-outfit">
      <div className="drawer lg:drawer-open">
        <div className="drawer-content bg-base-200 flex flex-col">
          <Header />
          <div className="p-6 max-md:p-4">
            <Outlet />
          </div>
          <div className="fab">
            <label
              htmlFor="my-drawer-3"
              className="btn btn-lg btn-circle drawer-button btn-neutral text-2xl lg:hidden"
            >
              <RiMenu4Fill />
            </label>
          </div>
        </div>
        <Sidebar />
      </div>
    </div>
  );
}
