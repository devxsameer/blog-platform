import { authHttp } from '../http/auth-http';
import { unwrap } from '../unwrap';

export type AvatarUploadSignature = {
  cloudName: string;
  apiKey: string;
  timestamp: number;
  signature: string;
  publicId: string;
};

export const avatarApi = {
  async getUploadSignature() {
    const { status, body } = await authHttp('/api/users/me/avatar/upload');

    return unwrap<AvatarUploadSignature>(status, body);
  },

  async updateAvatar(avatarUrl: string) {
    const { status, body } = await authHttp('/api/users/me/avatar', {
      method: 'PUT',
      body: JSON.stringify({ avatarUrl }),
    });

    return unwrap(status, body);
  },
};
