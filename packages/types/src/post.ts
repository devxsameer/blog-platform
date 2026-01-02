import type { Tag } from './tag';

export type PostContent = {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  contentMarkdown: string;
  contentHtml: string | null;
  viewCount: number;
  likeCount: number;
  status: 'published' | 'draft' | 'archived';
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
  tags?: Tag[];
  author: {
    username: string;
    avatarUrl?: string | null;
    bio?: string | null;
  };
  likedByMe: boolean;
};
