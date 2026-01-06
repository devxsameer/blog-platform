import { Outlet, useNavigation, useRouteLoaderData } from 'react-router';
import Sidebar from './Sidebar';
import Header from './Header';
import { RiMenu4Fill } from 'react-icons/ri';
import SkeletonLoader from '@/shared/components/SkeletonLoader';
import { rootLoader } from '@/app/root.loader';

export function DashBoardLayout() {
  const { user } = useRouteLoaderData('root') as Awaited<
    ReturnType<typeof rootLoader>
  >;
  const navigation = useNavigation();

  const isPageLoading = navigation.state === 'loading';

  return (
    <div className="font-outfit">
      <div className="drawer lg:drawer-open">
        <div className="drawer-content bg-base-200 flex flex-col">
          <Header />
          <main className="min-h-screen p-6 max-md:p-4">
            <div
              className={`transition-opacity duration-300 ${isPageLoading ? 'pointer-events-none opacity-50' : 'opacity-100'}`}
            >
              {isPageLoading ? (
                <SkeletonLoader />
              ) : (
                <>
                  {user.isReadOnly && (
                    <div className="alert alert-warning mb-4 text-sm">
                      You're logged in as a demo admin. Editing and writing are
                      disabled.
                    </div>
                  )}
                  <Outlet />
                </>
              )}
            </div>
          </main>
          <div className="fixed right-6 bottom-6 z-50 lg:hidden">
            <label
              htmlFor="my-drawer-3"
              className="btn btn-lg btn-circle drawer-button btn-neutral text-2xl"
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
