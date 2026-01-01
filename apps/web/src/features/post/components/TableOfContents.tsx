import type { TocItem } from '../types';

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="sticky top-32 flex justify-end pr-8">
      <nav className="text-sm">
        <p className="mb-3 text-base font-medium tracking-wider uppercase">
          Table of Contents
        </p>
        <ul className="space-y-2">
          {items.map((item) => {
            const size =
              item.level === 2
                ? 'text-sm font-medium'
                : item.level === 3
                  ? 'text-sm'
                  : 'text-xs';

            const indent =
              item.level === 3 ? 'ml-4' : item.level === 4 ? 'ml-8' : '';
            return (
              <li key={item.id} className={indent}>
                <a
                  href={`#${item.id}`}
                  className={`text-neutral-600 hover:text-black ${size}`}
                >
                  {item.text}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
