import { useLoaderData } from 'react-router';
import PostForm from '../components/PostForm';
import { postLoader } from '../post.loaders';

function EditPostPage() {
  const { post } = useLoaderData<Awaited<ReturnType<typeof postLoader>>>();

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Edit Post
        <span className="badge badge-outline ml-2">{post.status}</span>
      </h1>

      <PostForm
        mode="edit"
        initialValues={{
          title: post.title,
          excerpt: post.excerpt,
          contentMarkdown: post.contentMarkdown,
          status: post.status,
        }}
      />
    </div>
  );
}
export default EditPostPage;
