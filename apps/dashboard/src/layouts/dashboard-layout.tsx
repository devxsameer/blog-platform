import { Outlet, useNavigation } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { RiMenu4Fill } from 'react-icons/ri';
import SkeletonLoader from '@/shared/components/SkeletonLoader';

export function DashBoardLayout() {
  const navigation = useNavigation();

  const isPageLoading = navigation.state === 'loading';

  return (
    <div className="font-outfit">
      <div className="drawer lg:drawer-open">
        <div className="drawer-content bg-base-200 flex flex-col">
          <Header />
          {isPageLoading && (
            <div className="bg-neutral z-50 h-1 w-full animate-pulse" />
          )}
          <div className="min-h-screen p-6 max-md:p-4">
            {isPageLoading ? <SkeletonLoader /> : <Outlet />}
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
