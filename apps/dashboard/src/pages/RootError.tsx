import { BiSolidError } from 'react-icons/bi';
import { Link, useRouteError, isRouteErrorResponse } from 'react-router';

export default function RootErrorPage() {
  const error = useRouteError();

  let statusCode = 'Error';
  let title = 'Something went wrong';

  if (isRouteErrorResponse(error)) {
    statusCode = error.status.toString();
    title = error.status === 404 ? 'Page not found' : 'Server Error';
  }

  return (
    <div className="bg-base-200 font-outfit flex min-h-screen items-center justify-center px-4">
      <div className="card bg-base-100 w-full max-w-md shadow-xl">
        <div className="card-body items-center gap-4 text-center">
          {/* Icon / Visual */}
          <div className="text-error flex items-center gap-4">
            <span className="text-7xl">
              <BiSolidError />
            </span>
            <h1 className="text-5xl font-bold tracking-tight">{statusCode}</h1>
          </div>

          <h2 className="text-2xl font-semibold">{title}</h2>

          <p className="text-base-content/60 max-w-sm">
            {isRouteErrorResponse(error) && error.status === 404
              ? "The page you're looking for doesn't exist or was moved. Maybe the link took a coffee break ☕"
              : "A critical system error occurred. We've been notified and are looking into it."}
          </p>

          {/* Technical Details (Visible only in Dev mode) */}
          {import.meta.env.DEV && (
            <div className="bg-base-200 mt-2 w-full rounded-lg p-3 text-left">
              <p className="text-error wrap-break-words font-mono text-xs">
                {error instanceof Error ? error.message : 'Unknown Error'}
              </p>
            </div>
          )}

          {/* Actions */}
          <div className="card-actions w-full flex-col gap-2 pt-2">
            <Link to="/" className="btn btn-neutral btn-block">
              Back to Home
            </Link>

            <button
              onClick={() => window.location.reload()}
              className="btn btn-ghost btn-block btn-sm"
            >
              Try Refreshing
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
