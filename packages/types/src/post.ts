import type { Tag } from './tag';

export type PostStatus = 'draft' | 'published' | 'archived';

export type PostOrder = 'asc' | 'desc';

export type PostSort = 'createdAt' | 'updatedAt' | 'publishedAt';

export type Post = {
  id: string;
  authorId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  viewCount: number;
  likeCount: number;
  status?: PostStatus;
  publishedAt: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  likedbyMe?: boolean;
};

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
  status: PostStatus;
  publishedAt: string | null;
  createdAt?: string;
  updatedAt?: string | null;
  tags?: Tag[];
  author: {
    username: string;
    avatarUrl?: string | null;
    bio?: string | null;
  };
  likedByMe: boolean;
};

export type PostInput = {
  title: string;
  excerpt?: string | null;
  contentMarkdown: string;
  status: PostStatus;
  tags?: string[];
};

export type PostsQuery = {
  cursor?: string;
  limit?: number;
  authorId?: string;
  order?: PostOrder;
  sort?: PostSort;
  status?: PostStatus;
};
