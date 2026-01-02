import { BiSolidError } from 'react-icons/bi';
import { Link } from 'react-router';

export default function ErrorPage() {
  return (
    <div className="bg-base-200 font-outfit flex min-h-screen items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body items-center gap-4 text-center">
          {/* Icon / Visual */}
          <div className="flex items-center gap-4">
            <span className="text-7xl">
              <BiSolidError />
            </span>
            {/* Text */}
            <h1 className="text-5xl font-bold tracking-tight">404</h1>
          </div>

          <h2 className="text-2xl font-semibold">Page not found</h2>

          <p className="text-base-content/60 max-w-sm">
            The page you're looking for doesn't exist or was moved. Maybe the
            link took a coffee break ☕
          </p>

          {/* Actions */}
          <div className="card-actions w-full pt-2">
            <Link to="/" className="btn btn-neutral btn-block">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
