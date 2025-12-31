import type { TocItem } from '../types';

export default function TableOfContents({ items }: { items: TocItem[] }) {
  if (items.length === 0) return null;

  return (
    <div className="sticky top-24 flex justify-center">
      <nav className="text-sm">
        <p className="mb-2 font-medium">TABLE OF CONTENTS</p>
        <ul className="space-y-1">
          {items.map((item) => (
            <li
              key={item.id}
              className={
                item.level === 3 ? 'ml-4' : item.level === 4 ? 'ml-8' : ''
              }
            >
              <a
                href={`#${item.id}`}
                className="text-neutral-600 hover:text-black"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
