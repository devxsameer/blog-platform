import type { ValidationError } from '@blog/api-client';
import { Form, useActionData } from 'react-router';

export default function LoginPage() {
  const actionData = useActionData() as ValidationError | undefined;
  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-semibold">Welcome back</h1>

      {actionData?.issues?.map((issue) => (
        <p key={issue.path} className="text-red-500">
          {issue.message}
        </p>
      ))}

      <Form method="post" action={'/auth/login'} className="space-y-4">
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
