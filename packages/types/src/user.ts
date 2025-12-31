export type User = {
  id: string;
  username: string;
  email: string;
  role: 'author' | 'admin' | 'user';
  createdAt?: string;
};
