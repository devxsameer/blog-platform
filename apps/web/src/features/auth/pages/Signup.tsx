import type { ValidationError } from '@blog/api-client';
import { Form, useActionData } from 'react-router';

export default function SignupPage() {
  const actionData = useActionData() as ValidationError | undefined;
  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-semibold">
        Create Account
      </h1>

      {actionData?.issues?.map((issue) => (
        <p key={issue.path} className="text-red-500">
          {issue.message}
        </p>
      ))}

      <Form method="post" action={'/auth/signup'} className="space-y-4">
        <input
          name="username"
          type="text"
          placeholder="Full Name"
          className="w-full rounded border p-2"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full rounded border p-2"
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          required
          className="w-full rounded border p-2"
        />

        <button
          type="submit"
          className="w-full rounded bg-black py-2 text-white"
        >
          Continue
        </button>
      </Form>
    </div>
  );
}
