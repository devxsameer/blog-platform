import { ApiClientError, ValidationError } from '@blog/api-client';
import { Link } from '@tanstack/react-router';
import { useState } from 'react';
import { useSignup } from '../mutations/signup.mutation';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [issues, setIssues] = useState<ValidationError['issues'] | null>(null);

  const signupMutation = useSignup();

  return (
    <div className="card bg-base-100 border-base-content/20 max-w-sm border shadow-sm">
      <div className="card-body">
        <div>
          <h1 className="text-2xl font-semibold">
            <span className="block text-3xl">👋</span>Create Account
          </h1>
          <p className="text-base-content/80">
            Create an account to start exploring and commenting on posts.
          </p>
        </div>

        <div className="mt-4">
          {issues && (
            <div className="mb-2">
              {issues.map((issue) => (
                <p
                  key={`${issue.path}-${issue.message}`}
                  className="text-red-500"
                >
                  {issue.message}
                </p>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setError(null);
              setIssues(null);

              signupMutation.mutate(
                { username, email, password },
                {
                  onError: (err) => {
                    if (err instanceof ValidationError) {
                      setIssues(err.issues);
                    } else if (err instanceof ApiClientError) {
                      setError(err.message);
                    } else {
                      setError('Unexpected error occurred');
                      console.error(err);
                    }
                  },
                },
              );
            }}
          >
            {error && (
              <div className="alert alert-error mb-4 shadow-sm">
                <span>{error}</span>
              </div>
            )}

            <label className="label mb-0.5">Full Name</label>
            <input
              name="username"
              type="text"
              placeholder="Erwin Smith..."
              value={username}
              disabled={signupMutation.isPending}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input mb-4 w-full"
            />

            <label className="label mb-0.5">Email</label>
            <input
              name="email"
              type="email"
              placeholder="devxsameer@gmail.com"
              value={email}
              disabled={signupMutation.isPending}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input mb-4 w-full"
            />

            <label className="label mb-0.5">Password</label>
            <input
              name="password"
              type="password"
              placeholder="password@123"
              value={password}
              disabled={signupMutation.isPending}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input mb-4 w-full"
            />

            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="btn btn-neutral btn-block"
            >
              {signupMutation.isPending ? 'Creating account…' : 'Sign Up'}
            </button>
          </form>
        </div>

        <p className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link to="/auth/login" className="link link-hover font-semibold">
            Login instead
          </Link>
        </p>
      </div>
    </div>
  );
}
