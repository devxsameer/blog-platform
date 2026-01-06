export type User = {
  id: string;
  username: string;
  bio: string | null;
  email: string;
  role: 'author' | 'admin' | 'user';
  isReadOnly: boolean;
  createdAt?: string;
};
