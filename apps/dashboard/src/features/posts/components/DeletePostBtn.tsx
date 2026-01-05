import { useFetcher } from 'react-router';
import { useEffect, useState } from 'react';
import ConfirmDialog from '@/shared/components/ConfirmDialog';

export default function DeletePostButton({ slug }: { slug: string }) {
  const fetcher = useFetcher();
  const [open, setOpen] = useState(false);

  const isDeleting = fetcher.state === 'submitting';

  useEffect(() => {
    if (fetcher.state === 'idle' && open) {
      setOpen(false);
    }
  }, [fetcher.state]);

  return (
    <>
      <button
        className="btn btn-ghost btn-sm text-error"
        onClick={() => setOpen(true)}
      >
        Delete
      </button>

      <ConfirmDialog
        open={open}
        title="Delete post?"
        description="This action cannot be undone."
        confirmText="Delete"
        loading={isDeleting}
        onClose={() => setOpen(false)}
        onConfirm={() =>
          fetcher.submit(null, {
            method: 'POST',
            action: `/dashboard/posts/${slug}/delete`,
          })
        }
      />
    </>
  );
}
