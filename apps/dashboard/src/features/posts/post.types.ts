import type { PostContent } from '@blog/types';

export type PostFormProps = {
  initialValues?: PostContent;
  mode: 'create' | 'edit';
};
