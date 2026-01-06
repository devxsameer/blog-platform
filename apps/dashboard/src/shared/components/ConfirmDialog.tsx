import { useEffect, useRef } from 'react';

type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  onConfirm: () => void;
  onClose: () => void;
  loading?: boolean;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmText = 'Confirm',
  onConfirm,
  onClose,
  loading,
}: Props) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (open) ref.current?.showModal();
    else ref.current?.close();
  }, [open]);

  return (
    <dialog ref={ref} className="modal" aria-modal="true" onCancel={onClose}>
      <div className="modal-box text-start">
        <h3 className="text-lg font-semibold">{title}</h3>

        {description && (
          <p className="text-base-content/70 py-3">{description}</p>
        )}

        <div className="modal-action">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="button"
            className="btn btn-error"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Deleting…' : confirmText}
          </button>
        </div>
      </div>
    </dialog>
  );
}
