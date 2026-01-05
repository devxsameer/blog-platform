export type Comment = {
  id: string;
  authorId: string;
  author: {
    id: string;
    username: string;
  };
  postId: string;
  parentId: string | null;
  content: string;
  createdAt: string;
};

export type CommentNode = Comment & {
  replies: CommentNode[];
};
