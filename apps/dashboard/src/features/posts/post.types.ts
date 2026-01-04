import type { PostInput } from '@blog/types';

export type PostFormProps = {
  initialValues?: Partial<PostInput>;
  mode: 'create' | 'edit';
};
