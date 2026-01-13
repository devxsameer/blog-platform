import { useMutation } from '@tanstack/react-query';
import { avatarApi } from '@blog/api-client';
import { uploadAvatarToCloudinary } from '@blog/api-client';

export default function AvatarUploader() {
  const uploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const sig = await avatarApi.getUploadSignature();
      const url = await uploadAvatarToCloudinary(file, sig);
      await avatarApi.updateAvatar(url);
      return url;
    },
  });

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    uploadMutation.mutate(file);
  }

  return (
    <div className="space-y-2">
      <input
        type="file"
        accept="image/*"
        onChange={onSelectFile}
        disabled={uploadMutation.isPending}
        className="file-input file-input-bordered"
      />

      {uploadMutation.isPending && (
        <p className="text-sm opacity-70">Uploading avatar…</p>
      )}
    </div>
  );
}
