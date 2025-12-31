export type Post = {
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
  author: {
    username: string;
    avatarUrl?: string | null;
    bio?: string | null;
  };
  likedByMe: boolean;
};
