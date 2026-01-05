// dashboard/src/features/post/post.route.tsx
import {
  createPostAction,
  deletePostAction,
  updatePostAction,
} from './post.actions';
import PostsPage from './pages/Posts';
import { postLoader, postsLoader } from './post.loaders';
import CreatePostPage from './pages/CreatePost';
import ErrorPage from '@/pages/Error';
import EditPostPage from './pages/EditPost';

export const postRoute = {
  path: 'posts',
  action: createPostAction,
  ErrorBoundary: ErrorPage,
  children: [
    { index: true, loader: postsLoader, Component: PostsPage },
    { path: 'create', Component: CreatePostPage },

    {
      path: ':postSlug/edit',
      loader: postLoader,
      action: updatePostAction,
      Component: EditPostPage,
    },

    { path: ':postSlug/delete', action: deletePostAction },
  ],
};
