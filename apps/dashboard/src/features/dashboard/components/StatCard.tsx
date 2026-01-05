// src/components/StatCard.tsx
import type { ReactNode } from 'react';

type StatCardProps = {
  icon: ReactNode;
  label: string;
  value: number;
  colorClass: string;
};

export default function StatCard({
  icon,
  label,
  value,
  colorClass,
}: StatCardProps) {
  return (
    <div className="card bg-base-100 border-base-200 hover:border-base-300 border shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="card-body flex-row items-center gap-5 p-6">
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${colorClass}`}
        >
          {icon}
        </div>
        <div className="space-y-0.5">
          <span className="block text-2xl font-bold tracking-tight">
            {value.toLocaleString()}
          </span>
          <span className="text-base-content/60 block text-sm font-medium tracking-wide uppercase">
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
