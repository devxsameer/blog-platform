import type { AvatarUploadSignature } from '../endpoints/avatar';

export async function uploadAvatarToCloudinary(
  file: File,
  sig: AvatarUploadSignature,
) {
  const form = new FormData();

  form.append('file', file);
  form.append('api_key', sig.apiKey);
  form.append('timestamp', String(sig.timestamp));
  form.append('signature', sig.signature);
  form.append('public_id', sig.publicId);

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${sig.cloudName}/image/upload`,
    {
      method: 'POST',
      body: form,
    },
  );

  if (!res.ok) {
    throw new Error('Avatar upload failed');
  }

  const json = await res.json();
  return json.secure_url as string;
}
