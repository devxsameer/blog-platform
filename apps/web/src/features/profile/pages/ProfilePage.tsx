import { useRouteContext } from '@tanstack/react-router';

export default function ProfilePage() {
  const { user } = useRouteContext({ from: '__root__' });

  if (!user) {
    return (
      <div className="alert alert-warning">
        Please log in to view your profile.
      </div>
    );
  }

  return (
    <div className="max-w-3xl space-y-8 py-10">
      {/* Header */}
      <header>
        <h1 className="text-2xl font-semibold">Your profile</h1>
        <p className="text-base-content/70">
          Account details associated with your activity.
        </p>
      </header>

      {/* Identity */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body flex gap-6 sm:flex-row">
          {user?.avatarUrl ? (
            <div className="avatar">
              <img
                src={user.avatarUrl}
                alt={user.username}
                className="h-16 w-16 rounded-full"
              />
            </div>
          ) : (
            <div className="avatar avatar-placeholder">
              <div className="bg-neutral text-neutral-content w-16 rounded-full text-xl font-semibold">
                {user?.username.charAt(0).toUpperCase()}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <h2 className="text-xl font-semibold">{user.username}</h2>
            <p className="text-sm text-neutral-600">{user.email}</p>

            <div className="flex gap-2 pt-1">
              <span className="badge badge-outline capitalize">
                {user.role}
              </span>

              {user.emailVerifiedAt ? (
                <span className="badge badge-success">Verified</span>
              ) : (
                <span className="badge badge-warning">Email not verified</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bio */}
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <h3 className="font-semibold">Bio</h3>

          {user.bio ? (
            <p className="leading-relaxed text-neutral-700">{user.bio}</p>
          ) : (
            <p className="text-neutral-500 italic">
              You haven't added a bio yet.
            </p>
          )}
        </div>
      </div>

      {/* Meta */}
      <div className="text-sm text-neutral-500">
        Member since{' '}
        {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '—'}
      </div>
    </div>
  );
}
