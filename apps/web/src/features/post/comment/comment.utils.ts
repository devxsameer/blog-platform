import type { Comment, CommentNode } from './comment.types';

export function buildTree(comments: Comment[]): CommentNode[] {
  const map = new Map<string, CommentNode>();
  const roots: CommentNode[] = [];

  for (const c of comments) {
    map.set(c.id, { ...c, replies: [] });
  }

  for (const comment of map.values()) {
    if (comment.parentId) {
      map.get(comment.parentId)?.replies.push(comment);
    } else {
      roots.push(comment);
    }
  }

  return roots;
}
