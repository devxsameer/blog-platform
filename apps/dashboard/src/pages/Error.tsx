import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';
import { HiArrowLeft, HiHome } from 'react-icons/hi';
import { ApiClientError } from '@blog/api-client';

function ErrorPage() {
  const error = useRouteError();
  const navigate = useNavigate();

  let statusCode = 500;
  let title = 'Unexpected Error';
  let message =
    'An error occurred while loading this page. Please try again later.';

  if (isRouteErrorResponse(error)) {
    statusCode = error.status;
    message = error.statusText || error.data?.message || message;
  } else if (error instanceof ApiClientError) {
    title = error.code;
    statusCode = error.status;
    message = error.message;
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div className="mt-18 flex flex-col items-center justify-center text-center">
      {/* Visual Indicator */}
      <div className="mb-3">
        <h1 className="text-error/20 text-9xl font-bold select-none">
          {statusCode}
        </h1>
      </div>

      <h2 className="text-base-content mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
        {title}
      </h2>
      <p className="text-base-content/70 text-md mt-4 max-w-md leading-7">
        {message}
      </p>

      {/* Action Buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
        <button onClick={() => navigate(-1)} className="btn btn-outline gap-2">
          <HiArrowLeft className="text-lg" /> Go Back
        </button>

        <button
          onClick={() => navigate('/dashboard')}
          className="btn btn-neutral gap-2"
        >
          <HiHome className="text-lg" /> Dashboard Home
        </button>
      </div>

      {/* Technical Details (Only in development) */}
      {import.meta.env.DEV && (
        <div className="mt-12 w-full max-w-2xl text-left">
          <div className="collapse-arrow bg-base-200 border-base-300 collapse border">
            <input type="checkbox" />
            <div className="collapse-title font-mono text-sm">
              Technical Stack Trace (Dev Only)
            </div>
            <div className="collapse-content overflow-x-auto">
              <pre className="bg-base-300 rounded-lg p-4 font-mono text-xs">
                {error instanceof Error
                  ? error.stack
                  : JSON.stringify(error, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ErrorPage;
