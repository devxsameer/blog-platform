// dashboard/src/features/profile/pages/ProfilePage.tsx
import { Route } from '@/routes/dashboard/profile';
import AvatarUploader from '../components/AvatarUploader';

export default function ProfilePage() {
  const { user } = Route.useRouteContext();

  return (
    <div className="max-w-3xl space-y-8">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-base-content/70">Your account information</p>
      </header>

      {/* Profile card */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body space-y-6">
          {/* Identity */}
          <div className="flex items-center gap-6">
            {user?.avatarUrl ? (
              <div className="avatar">
                <img
                  src={user.avatarUrl}
                  alt={user.username}
                  className="w-16 rounded-full"
                />
              </div>
            ) : (
              <div className="avatar avatar-placeholder">
                <div className="bg-neutral text-neutral-content w-16 rounded-full text-xl font-semibold">
                  {user?.username.charAt(0).toUpperCase()}
                </div>
              </div>
            )}
            <AvatarUploader />

            <div>
              <h2 className="text-xl font-semibold">{user?.username}</h2>
              <p className="text-base-content/70">{user?.email}</p>

              <span
                className={`badge mt-2 capitalize ${
                  user?.role === 'admin'
                    ? 'badge-error'
                    : user?.role === 'author'
                      ? 'badge-primary'
                      : 'badge-ghost'
                }`}
              >
                {user?.role}
              </span>
            </div>
          </div>

          <div className="divider" />

          {/* Bio */}
          <div>
            <h3 className="mb-1 font-semibold">Bio</h3>

            {user?.bio ? (
              <p className="text-base-content/80 leading-relaxed">{user.bio}</p>
            ) : (
              <p className="text-base-content/50 italic">No bio provided</p>
            )}
          </div>

          <div className="divider" />

          {/* Meta */}
          <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
            <div>
              <span className="text-base-content/60 block">User ID</span>
              <span className="font-mono text-xs">{user?.id}</span>
            </div>

            {user?.createdAt && (
              <div>
                <span className="text-base-content/60 block">Joined</span>
                <span>{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            )}
          </div>

          <div className="card-actions justify-end">
            <button className="btn btn-outline btn-sm" disabled>
              Edit profile (coming soon)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
