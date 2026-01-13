import type { User } from '@blog/types';

export default function UserRow({ user }: { user: User }) {
  return (
    <tr>
      <td className="font-medium">{user.username}</td>
      <td className="text-sm">{user.email}</td>

      <td>
        <span className="badge capitalize">{user.role}</span>
      </td>

      <td>
        {user.emailVerifiedAt ? (
          <span className="badge badge-success">Verified</span>
        ) : (
          <span className="badge badge-warning">Unverified</span>
        )}
      </td>

      <td>
        {user.isActive ? (
          <span className="badge badge-outline">Active</span>
        ) : (
          <span className="badge badge-error">Disabled</span>
        )}
      </td>

      <td className="text-sm opacity-70">
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
      </td>
    </tr>
  );
}
