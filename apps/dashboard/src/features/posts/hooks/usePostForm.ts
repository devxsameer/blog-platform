import { useEffect, useState } from 'react';
import { useFetcher } from 'react-router';
import type { createPostAction } from '../post.actions';

type Mode = 'create' | 'edit';

export function usePostForm(mode: Mode, slug?: string) {
  const fetcher = useFetcher<Awaited<ReturnType<typeof createPostAction>>>();
  const [showSuccess, setShowSuccess] = useState(false);

  const isSubmitting = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.state === 'idle' && fetcher.data?.success) {
      setShowSuccess(true);
    }
  }, [fetcher.state, fetcher.data]);

  function submit(data: FormData | Record<string, any>) {
    fetcher.submit(data, {
      method: 'POST',
      action:
        mode === 'create'
          ? '/dashboard/posts'
          : `/dashboard/posts/${slug}/edit`,
    });
  }

  return {
    submit,
    fetcher,
    isSubmitting,
    showSuccess,
    closeSuccess: () => setShowSuccess(false),
  };
}
