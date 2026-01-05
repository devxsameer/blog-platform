// web/src/features/post/route.tsx
import PostPage from '@/features/post/pages/Post';
import PostsPage from './pages/Posts';
import { postLoader, postsLoader } from './post.loaders';
import { createCommentAction, deleteCommentAction } from './comment/comment.actions';
import { likePostAction } from './post.actions';

export const postRoute = {
  path: 'posts',
  children: [
    { id: 'posts', index: true, Component: PostsPage, loader: postsLoader },
    {
      id: 'post',
      path: ':postSlug',
      Component: PostPage,
      loader: postLoader,
      children: [
        { path: 'like', action: likePostAction },
        {
          path: 'comments',
          action: createCommentAction,
        },
        {
          path: 'comments/:commentId/delete',
          action: deleteCommentAction,
        },
      ],
    },
  ],
};
