import type { HTMLAttributes } from 'react';
import type { TocItem } from '../types';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function createHeadingRenderer(
  level: 2 | 3 | 4,
  register: (item: TocItem) => void,
) {
  return function Heading(props: HTMLAttributes<HTMLHeadingElement>) {
    const { children, ...rest } = props;

    const text = String(children);
    const id = slugify(text);

    register({ id, text, level });

    const Tag = `h${level}` as const;

    return (
      <Tag id={id} {...rest}>
        {children}
      </Tag>
    );
  };
}
