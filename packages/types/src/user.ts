export type User = {
  id: string;
  username: string;
  email: string;
  bio: string | null;

  role: 'author' | 'admin' | 'user';
  isReadOnly: boolean;

  avatarUrl?: string | null;
  emailVerifiedAt?: string | null;
  isActive?: boolean;

  createdAt?: string;
};
