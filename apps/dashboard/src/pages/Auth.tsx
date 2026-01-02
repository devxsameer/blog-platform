import { Link } from 'react-router';

function ErrorPage() {
  return (
    <div className="bg-base-200 flex h-screen w-screen items-center justify-center">
      <div className="card bg-base-100 max-w-sm shadow-sm">
        <div className="card-body">
          <div>
            <h1 className="text-2xl font-semibold">
              <span className="block text-3xl">🔒</span>Welcome Back
            </h1>
            <p>Log in to continue interacting with the blog.</p>
          </div>
          <div className="mt-4">
            <form method="POST" action={'/auth/login'}>
              <label className="label mb-0.5">Email</label>
              <input
                name="email"
                type="email"
                placeholder="Registered email..."
                className="input mb-4 w-full"
              />

              <label className="label mb-0.5">Password</label>
              <input
                name="password"
                type="password"
                placeholder="Password..."
                required
                className="input mb-4 w-full"
              />

              <button type="submit" className="btn btn-neutral btn-block">
                Log In
              </button>
            </form>
          </div>
          <p className="mt-4 text-center text-sm">
            First time here?{' '}
            <Link to="/auth/signup" className="link link-hover font-semibold">
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
