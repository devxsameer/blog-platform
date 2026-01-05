import { useState } from 'react';

type Props = {
  value: string[];
  onChange: (tags: string[]) => void;
  maxTags?: number;
  disabled?: boolean;
};

function normalize(tag: string) {
  return tag.trim().toLowerCase();
}

export default function TagInput({
  value,
  onChange,
  maxTags = 10,
  disabled = false,
}: Props) {
  const [input, setInput] = useState('');

  function addTag(raw: string) {
    const tag = normalize(raw);

    if (!tag) return;
    if (tag.length > 30) return;
    if (value.includes(tag)) return;
    if (value.length >= maxTags) return;

    onChange([...value, tag]);
    setInput('');
  }

  function removeTag(tag: string) {
    onChange(value.filter((t) => t !== tag));
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (disabled) return;
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    }
  }

  return (
    <div className="space-y-2">
      {/* Input */}
      <input
        className="input w-full"
        placeholder="Add tags (press Enter)"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled || value.length >= maxTags}
      />

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {value.map((tag) => (
          <span
            key={tag}
            className={`badge gap-2 ${
              disabled
                ? 'badge-outline opacity-60'
                : 'bg-base-200 border-base-300'
            }`}
          >
            #{tag}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="opacity-60 hover:opacity-100"
              >
                ✕
              </button>
            )}
          </span>
        ))}

        {value.length === 0 && (
          <span className="text-base-content/60 text-sm">No tags added</span>
        )}
      </div>

      {/* Hint */}
      <p className="text-base-content/60 text-xs">
        Up to {maxTags} tags · Lowercase · Max 30 characters
      </p>
    </div>
  );
}
