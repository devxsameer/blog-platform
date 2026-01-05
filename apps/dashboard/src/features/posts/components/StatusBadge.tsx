export default function StatusBadge({ status }: { status?: string }) {
  const map: Record<string, string> = {
    draft: 'badge-ghost',
    published: 'badge-success',
    archived: 'badge-neutral',
  };

  return (
    <span className={`badge-sm badge capitalize ${map[status ?? 'draft']}`}>
      {status}
    </span>
  );
}
