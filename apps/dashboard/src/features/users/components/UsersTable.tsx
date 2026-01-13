import type { User } from '@blog/types';
import UserRow from './UsersRow';

export default function UsersTable({ users }: { users: User[] }) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>User</th>
          <th>Email</th>
          <th>Role</th>
          <th>Verified</th>
          <th>Status</th>
          <th>Joined</th>
        </tr>
      </thead>

      <tbody>
        {users.length === 0 && (
          <tr>
            <td colSpan={6} className="py-10 text-center opacity-60">
              No users found
            </td>
          </tr>
        )}

        {users.map((user) => (
          <UserRow key={user.id} user={user} />
        ))}
      </tbody>
    </table>
  );
}
