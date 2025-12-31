// src/shared/components/Breadcrumbs.jsx
import { ChevronRight } from 'lucide-react';
import { House } from 'lucide-react';
import { Link, useLocation } from 'react-router';

function Breadcrumbs() {
  const location = useLocation();
  const pathname = location.pathname; // e.g., /games/123/details
  const pathParts = pathname.split('/').filter(Boolean); // ["games", "123", "details"]
  console.error(pathParts);
  const ignoredSegments = ['post'];

  return (
    <nav className="breadcrumbs pb-6 text-sm">
      <ol className="flex flex-wrap space-x-1 gap-y-1 text-neutral-700">
        <li>
          <Link to="/" className="group flex items-center space-x-1">
            <House className="mr-2 h-4 w-4 transition-colors group-hover:text-neutral-400" />
            <span className="transition-colors group-hover:text-neutral-400">
              Home
            </span>
            <ChevronRight className="h-4 w-4 text-neutral-700 transition-colors" />
          </Link>
        </li>
        {pathParts.map((part, index) => {
          if (ignoredSegments.includes(part)) return null;
          // Build the path up to this breadcrumb
          const routeTo = `/${pathParts.slice(0, index + 1).join('/')}`;
          // Make it readable (capitalize and replace dashes)
          const name = part
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (l) => l.toUpperCase());

          // Last part shouldn't be a link
          const isLast = index === pathParts.length - 1;

          return (
            <li key={routeTo} className="min-w-max">
              {!isLast ? (
                <Link
                  to={routeTo}
                  className="group flex items-center space-x-1"
                >
                  <span className="group-hover:text-neutral-400">{name}</span>
                  <ChevronRight className="h-4 w-4 text-neutral-700" />
                </Link>
              ) : (
                <span className="text-neutral-400">{name}</span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export default Breadcrumbs;
