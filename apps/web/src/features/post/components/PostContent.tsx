import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import PostMeta from './PostMeta';
import type { Post } from '@blog/types';

export default function PostContent({ post }: { post: Post }) {
  return (
    <article className="prose prose-neutral">
      <h1>{post.title}</h1>

      <PostMeta post={post} />

      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeSanitize, rehypeHighlight]}
      >
        {post.contentMarkdown}
      </ReactMarkdown>
    </article>
  );
}
