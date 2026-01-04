import PostForm from '../components/PostForm';

function CreatePostPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Create Post</h1>
      <PostForm mode="create" />
    </div>
  );
}

export default CreatePostPage;
