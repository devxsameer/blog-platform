import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';

export default function CommentForm({
  parentId,
  onSuccess,
}: {
  parentId?: string;
  onSuccess?: () => void;
}) {
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === 'submitting';
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (
      fetcher.state === 'idle' &&
      fetcher.data !== undefined &&
      textareaRef.current
    ) {
      textareaRef.current.value = '';
      onSuccess?.();
    }
  }, [fetcher.state, fetcher.data]);

  return (
    <fetcher.Form method="post" action="comments" className="mt-4">
      <input type="hidden" name="parentId" value={parentId} />

      <textarea
        name="content"
        ref={textareaRef}
        disabled={isSubmitting}
        required
        className="textarea w-full"
        placeholder={parentId ? 'Write a reply…' : 'Write a comment…'}
      />

      <button disabled={isSubmitting} className="btn btn-sm mt-3">
        {isSubmitting ? 'Posting…' : 'Post'}
      </button>
    </fetcher.Form>
  );
}
