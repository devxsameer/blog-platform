// dashboard/src/features/post/post.route.tsx
import { createPostAction } from './post.actions';
import PostsPage from './pages/Posts';
import { postsLoader } from './post.loader';
import CreatePostPage from './pages/CreatePost';
import ErrorPage from '@/pages/Error';

export const postRoute = {
  path: 'posts',
  action: createPostAction,
  ErrorBoundary: ErrorPage,
  children: [
    { index: true, loader: postsLoader, Component: PostsPage },
    { path: 'create', Component: CreatePostPage },
  ],
};
