import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeSanitize from 'rehype-sanitize';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css';
import PostMeta from './PostMeta';
import type { Post } from '@blog/types';
import { useEffect } from 'react';
import { createHeadingRenderer } from './MarkdownHeading';
import { useTableOfContents } from '../useTableOfContents';
import TableOfContents from './TableOfContents';

export default function PostContent({ post }: { post: Post }) {
  const { toc, register, reset } = useTableOfContents();

  useEffect(() => {
    reset();
  }, [post.id, reset]);

  return (
    <main className="flex w-full gap-10">
      <article className="prose prose-neutral">
        <h1>{post.title}</h1>

        <PostMeta post={post} />

        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeSanitize, rehypeHighlight]}
          components={{
            h2: createHeadingRenderer(2, register),
            h3: createHeadingRenderer(3, register),
            h4: createHeadingRenderer(4, register),
          }}
        >
          {post.contentMarkdown}
        </ReactMarkdown>
      </article>
      <aside className="hidden w-64 shrink-0 grow justify-center xl:block">
        <TableOfContents items={toc} />
      </aside>
    </main>
  );
}
