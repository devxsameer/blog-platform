import MDEditor from '@uiw/react-md-editor';

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
};

export default function MarkdownEditor({
  value,
  onChange,
  disabled = false,
}: Props) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        preview={disabled ? 'preview' : 'live'}
        hideToolbar={disabled}
        textareaProps={{
          placeholder: disabled ? undefined : 'Write your post in Markdown...',
          'aria-readonly': disabled,
        }}
      />
    </div>
  );
}
