import PostForm from '../components/PostForm';

function CreatePostPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold tracking-tight">Create post</h1>
        <p className="text-base-content/70">Write and publish a new article.</p>
      </header>

      <PostForm mode="create" />
    </div>
  );
}

export default CreatePostPage;
