export type AdminOverview = {
  totals: {
    posts: number;
    publishedPosts: number;
    likes: number;
    comments: number;
    users: number;
  };
  activity: {
    postsLast7Days: number;
    likesLast7Days: number;
    viewsLast7Days: number;
  };
};

export type AuthorOverview = {
  posts: number;
  publishedPosts: number;
  likes: number;
  views: number;
};
