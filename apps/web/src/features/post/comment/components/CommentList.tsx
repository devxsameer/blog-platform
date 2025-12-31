import type { CommentNode } from '../types';
import CommentItem from './CommentItem';

export default function CommentList({ tree }: { tree: CommentNode[] }) {
  return (
    <div className="mt-6 space-y-6">
      {tree.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
