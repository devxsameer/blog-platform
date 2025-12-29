import { useRouteError, isRouteErrorResponse, Link } from 'react-router';

export function ErrorPage({ status = 404 }) {
  const error = useRouteError();

  // Handle specific HTTP-like errors (404, 401, etc.)
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return (
        <div className="p-8 text-center">
          <h1>404: Not Found</h1>
          <p>The page or resource you're looking for doesn't exist.</p>
          <Link to="/" className="text-blue-500 underline">
            Go Home
          </Link>
        </div>
      );
    }

    if (error.status === 401) {
      return <div>You aren't authorized to see this.</div>;
    }
  }

  // Handle generic code crashes or unexpected errors
  return (
    <div className="p-8 text-center text-red-600">
      <h1>${status}: Not Found</h1>
      <h1>Oops! Something went wrong.</h1>
      <p>{error instanceof Error ? error.message : 'Unknown Error'}</p>
    </div>
  );
}
