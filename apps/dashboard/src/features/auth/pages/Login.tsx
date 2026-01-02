import { Form } from 'react-router';

function LoginPage() {
  return (
    <div className="bg-base-200 font-outfit flex h-screen w-screen items-center justify-center">
      <div className="card bg-base-100 max-w-sm shadow-sm">
        <div className="card-body">
          <div>
            <h1 className="text-2xl font-semibold">
              <span className="block text-3xl">🔒</span>Welcome to Blog
              Dashboard
            </h1>
            <p>Log in to verify your identity.</p>
          </div>
          <div className="mt-4">
            <Form method="POST" action={'/login'}>
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
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
