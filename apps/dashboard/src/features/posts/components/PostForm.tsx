import { useEffect, useRef, useState } from 'react';
import MarkdownEditor from './MarkdownEditor';
import TagInput from './TagInput';
import type { PostFormProps } from '../post.types';
import type { PostStatus } from '@blog/types';
import { generateSlug } from '@/shared/utils/slug';
import { useFetcher } from 'react-router';
import type { ValidationIssue } from '@blog/api-client';
import type { createPostAction } from '../post.actions';

function PostForm({ initialValues = {}, mode }: PostFormProps) {
  const [title, setTitle] = useState(initialValues.title ?? '');
  const [slug, setSlug] = useState('');
  const [excerpt, setExcerpt] = useState(initialValues.excerpt ?? '');
  const [tags, setTags] = useState<string[]>(initialValues.tags ?? []);
  const [contentMarkdown, setContentMarkdown] = useState(
    initialValues.contentMarkdown ?? '',
  );
  const [status, setStatus] = useState<PostStatus>(
    initialValues.status ?? 'draft',
  );
  const fetcher = useFetcher<Awaited<ReturnType<typeof createPostAction>>>();
  const actionData = fetcher.data;
  const isSubmitting = fetcher.state === 'submitting';
  const modalRef = useRef<HTMLDialogElement>(null);

  function handleTitleChange(value: string) {
    setTitle(value);
    if (mode === 'create') {
      setSlug(generateSlug(value));
    }
  }
  useEffect(() => {
    if (actionData?.success) {
      if (actionData?.success) {
        modalRef.current?.showModal();
      }
    }
  }, [actionData]);
  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    fetcher.submit(
      {
        title,
        excerpt: excerpt || null,
        contentMarkdown,
        status,
        tags,
      },
      { method: 'POST', action: '/dashboard/posts' },
    );
  }

  const isArchived = status === 'archived';

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {actionData?.success && (
        <>
          <dialog ref={modalRef} className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute top-2 right-2">
                  ✕
                </button>
              </form>
              <h3 className="text-lg font-bold">Post Create SuccessFully!</h3>
              <p className="py-4">
                Press ESC key or click on ✕ button to close
              </p>
              <button className="btn btn-neutral">View Post</button>
            </div>
          </dialog>
        </>
      )}

      <div className="flex flex-wrap justify-stretch gap-6">
        <div className="card bg-base-100 min-w-prose min-w-prose flex-3 shadow-sm">
          <div className="card-body">
            {!actionData?.success &&
              actionData?.error?.issues &&
              actionData.error.issues.length > 0 && (
                <div className="mb-2">
                  {actionData?.error?.issues?.map((issue: ValidationIssue) => (
                    <p key={issue.path} className="text-red-500">
                      {issue.path}: {issue.message}
                    </p>
                  ))}
                </div>
              )}
            {/* Title */}
            <label className="fieldset">
              <span className="fieldset-label font-semibold">Title *</span>
              <input
                className="input w-full"
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                disabled={isArchived}
                required
              />
            </label>

            {/* Slug */}
            <label className="fieldset">
              <span className="fieldset-label font-semibold">Slug</span>
              <input value={slug} className="input w-full" disabled={true} />
              <span className="label">
                Slug is generated in backend automatically with xxxxx 5 chars
                nano id{' '}
              </span>
            </label>

            <label className="fieldset">
              {/* Excerpt */}
              <span className="fieldset-label font-semibold">Summary</span>
              <textarea
                className="textarea textarea-bordered"
                rows={3}
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Optional summary"
                disabled={isArchived}
              />
            </label>
          </div>
        </div>
        <div className="card bg-base-100 min-w-xs flex-1 shadow-sm">
          <div className="card-body space-y-4">
            {/* Tags */}
            <label className="fieldset">
              <div>
                <span className="fieldset-label font-semibold">Tags</span>
                <span className="label">(optional)</span>
              </div>
              <TagInput value={tags} onChange={setTags} />
            </label>

            {/* Status */}
            <label className="fieldset">
              <label className="fieldset-label font-semibold">Status *</label>
              <select
                className="select"
                value={status}
                onChange={(e) => setStatus(e.target.value as PostStatus)}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </label>
          </div>
        </div>
      </div>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <label className="fieldset">
            {/* Content */}
            <span className="fieldset-label font-semibold">
              Content Markdown
            </span>
            <MarkdownEditor
              value={contentMarkdown}
              onChange={setContentMarkdown}
            />
          </label>
        </div>
      </div>

      {/* Actions */}
      <div className="card-actions justify-end">
        <button
          type="submit"
          className="btn btn-neutral"
          disabled={isArchived || isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="loading loading-ball loading-xs"></span>Saving…
            </>
          ) : mode === 'create' ? (
            'Create Post'
          ) : (
            'Save Changes'
          )}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
