import type { Comment } from '@blog/types';

export type CommentNode = Comment & {
  replies: CommentNode[];
};
