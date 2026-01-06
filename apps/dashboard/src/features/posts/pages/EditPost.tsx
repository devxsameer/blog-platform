import { useLoaderData } from 'react-router';
import PostForm from '../components/PostForm';
import { postLoader } from '../post.loaders';

function EditPostPage() {
  const data = useLoaderData<Awaited<ReturnType<typeof postLoader>>>();

  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Edit post</h1>
          <span className="badge badge-outline capitalize">
            {data?.post.status}
          </span>
        </div>

        <p className="text-base-content/70">
          Update content, status, or manage this post.
        </p>
      </header>

      <PostForm mode="edit" initialValues={data?.post} />
    </div>
  );
}
export default EditPostPage;
