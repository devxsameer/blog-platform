import { useFetcher } from 'react-router';
import { loginAction } from '../auth.actions';
import type { ValidationError } from '@blog/api-client';

function LoginPage() {
  const loginFetcher = useFetcher<Awaited<ReturnType<typeof loginAction>>>();
  const isSubmitting = loginFetcher.state === 'submitting';

  const errorMessage = loginFetcher.data?.message;
  const issues = (loginFetcher.data as ValidationError)?.issues;

  return (
    <div className="bg-base-200 font-outfit flex h-screen w-screen items-center justify-center">
      <div className="card bg-base-100 max-w-sm shadow-sm">
        <div className="card-body">
          <div>
            <h1 className="text-2xl font-semibold">
              <span className="block text-3xl">🔒</span>Blog Dashboard
            </h1>
            <p>Log in to verify your identity.</p>
          </div>
          <div className="mt-4">
            {issues && issues.length > 0 && (
              <div className="mb-2">
                {issues?.map((issue) => (
                  <p key={issue.path} className="text-red-500">
                    {issue.message}
                  </p>
                ))}
              </div>
            )}
            {errorMessage && (
              <div className="alert alert-error mb-4 shadow-sm" role="alert">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 shrink-0 stroke-current"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <span>{errorMessage}</span>
              </div>
            )}
            {/* Demo Credentials Info */}
            <div className="alert mb-4 text-sm">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>

              <div>
                <p className="font-medium">Demo access (read-only)</p>
                <p>
                  Email: <code className="px-1">admin@devxsameer.me</code>
                  <br />
                  Password: <code className="px-1">admin123</code>
                </p>
              </div>
            </div>

            <loginFetcher.Form method="POST" action={'/login'}>
              <label className="label mb-0.5">Email</label>
              <input
                name="email"
                type="email"
                placeholder="email@example.com"
                autoComplete="username"
                disabled={isSubmitting}
                className="input mb-4 w-full"
              />

              <label className="label mb-0.5">Password</label>
              <input
                name="password"
                type="password"
                placeholder="••••••••"
                autoComplete="current-password"
                required
                disabled={isSubmitting}
                className="input mb-4 w-full"
              />

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="btn btn-neutral btn-block shadow-md"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="loading loading-spinner loading-xs"></span>
                      Authenticating...
                    </>
                  ) : (
                    'Sign In'
                  )}
                </button>
              </div>
            </loginFetcher.Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
