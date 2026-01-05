// src/modules/dashboard/Dashboard.tsx
import { useLoaderData } from 'react-router';
import { dashboardLoader } from '../dashboard.loaders';
import StatCard from '../components/StatCard';
import { TbWriting } from 'react-icons/tb';
import { LiaCommentsSolid, LiaUsersSolid } from 'react-icons/lia';
import { AiOutlineLike } from 'react-icons/ai';
import { HiOutlineEye } from 'react-icons/hi';

export default function Dashboard() {
  const data = useLoaderData<Awaited<ReturnType<typeof dashboardLoader>>>();

  return (
    <div className="mx-auto max-w-7xl space-y-10">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-base-content/70">
          {data.role === 'admin' ? 'Platform-wide' : 'Your personal'} activity
          overview.
        </p>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {data.role === 'admin' ? (
          <>
            <StatCard
              icon={<TbWriting />}
              label="Total Posts"
              value={data.overview.totals.posts}
              colorClass="bg-blue-500/10 text-blue-600"
            />
            <StatCard
              icon={<AiOutlineLike />}
              label="Total Likes"
              value={data.overview.totals.likes}
              colorClass="bg-rose-500/10 text-rose-600"
            />
            <StatCard
              icon={<LiaCommentsSolid />}
              label="Comments"
              value={data.overview.totals.comments}
              colorClass="bg-purple-500/10 text-purple-600"
            />
            <StatCard
              icon={<LiaUsersSolid />}
              label="Total Users"
              value={data.overview.totals.users}
              colorClass="bg-emerald-500/10 text-emerald-600"
            />
          </>
        ) : (
          <>
            <StatCard
              icon={<TbWriting />}
              label="Your Posts"
              value={data.overview.posts}
              colorClass="bg-blue-500/10 text-blue-600"
            />
            <StatCard
              icon={<AiOutlineLike />}
              label="Total Likes"
              value={data.overview.likes}
              colorClass="bg-rose-500/10 text-rose-600"
            />
            <StatCard
              icon={<HiOutlineEye />}
              label="Total Views"
              value={data.overview.views}
              colorClass="bg-amber-500/10 text-amber-600"
            />
          </>
        )}
      </div>

      {/* Admin Activity Section */}
      {data.role === 'admin' && (
        <section className="space-y-6">
          <div className="border-base-200 flex items-center justify-between border-b pb-4">
            <h2 className="text-xl font-semibold">Weekly Growth</h2>
            <span className="badge badge-outline text-base-content/50">
              Last 7 Days
            </span>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard
              icon={<TbWriting />}
              label="Posts Created"
              value={data.overview.activity.postsLast7Days}
              colorClass="bg-blue-500/10 text-blue-600"
            />
            <StatCard
              icon={<AiOutlineLike />}
              label="Recent Likes"
              value={data.overview.activity.likesLast7Days}
              colorClass="bg-rose-500/10 text-rose-600"
            />
            <StatCard
              icon={<HiOutlineEye />}
              label="Weekly Views"
              value={data.overview.activity.viewsLast7Days}
              colorClass="bg-amber-500/10 text-amber-600"
            />
          </div>
        </section>
      )}
    </div>
  );
}
