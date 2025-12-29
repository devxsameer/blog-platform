import { NavLink, Outlet } from 'react-router';

export default function AuthLayout() {
  return (
    <div className="mx-auto mt-16 w-full max-w-md">
      <Outlet />
      <div className="mb-4 flex justify-center gap-4">
        <NavLink
          to="/auth/login"
          className={({ isActive }) =>
            isActive ? 'font-medium underline' : 'text-gray-500'
          }
        >
          Login
        </NavLink>
        <NavLink
          to="/auth/signup"
          className={({ isActive }) =>
            isActive ? 'font-medium underline' : 'text-gray-500'
          }
        >
          Sign up
        </NavLink>
      </div>
    </div>
  );
}
