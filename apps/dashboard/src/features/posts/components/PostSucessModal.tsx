import { useEffect, useRef } from 'react';
import { Link } from 'react-router';

type Props = {
  open: boolean;
  slug?: string;
  mode: 'create' | 'edit';
  onClose: () => void;
};

export default function PostSuccessModal({ open, slug, mode, onClose }: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  return (
    <dialog ref={ref} className="modal">
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
            onClick={onClose}
          >
            ✕
          </button>
        </form>

        <h3 className="text-lg font-bold">
          {mode === 'create' ? 'Post created' : 'Post updated'}
        </h3>

        <p className="text-base-content/70 py-4">
          Your changes have been saved.
        </p>

        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Continue editing
          </button>

          {slug && (
            <Link className="btn btn-neutral" to={'/dashboard/posts'}>
              View posts
            </Link>
          )}
        </div>
      </div>
    </dialog>
  );
}
