import { Link, useLocation } from 'react-router';
import { House, ChevronRight } from 'lucide-react';

const LABELS: Record<string, string> = {
  posts: 'Posts',
  about: 'About',
  profile: 'Profile',
};

export default function Breadcrumbs({
  dynamicLabel,
}: {
  dynamicLabel?: string;
}) {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  // Hide on home
  if (segments.length === 0) return null;

  let path = '';

  return (
    <nav className="pb-6 text-sm">
      <ol className="flex flex-wrap items-center gap-1 text-neutral-700">
        <li>
          <Link to="/" className="flex items-center gap-1">
            <House className="h-4 w-4" />
            <span>Home</span>
          </Link>
        </li>

        {segments.map((segment, index) => {
          path += `/${segment}`;
          const isLast = index === segments.length - 1;

          const label =
            isLast && dynamicLabel
              ? dynamicLabel
              : (LABELS[segment] ??
                segment
                  .replace(/-/g, ' ')
                  .replace(/\b\w/g, (l) => l.toUpperCase()));

          return (
            <li key={path} className="flex items-center gap-1">
              <ChevronRight className="h-4 w-4 text-neutral-400" />

              {isLast ? (
                <span className="text-neutral-400">{label}</span>
              ) : (
                <Link to={path} className="hover:text-neutral-400">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
