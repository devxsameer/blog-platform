const MAX_BASE_LENGTH = 60;
export const generateSlug = (title: string): string => {
  const slugifiedTitle = title
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');

  const base = slugifiedTitle.slice(0, MAX_BASE_LENGTH);

  const id = 'xxxx';

  return base.length > 0 ? `${base}-${id}` : `post-${id}`;
};
