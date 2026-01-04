import MDEditor from '@uiw/react-md-editor';

type Props = {
  value: string;
  onChange: (value: string) => void;
};

function MarkdownEditor({ value, onChange }: Props) {
  return (
    <div data-color-mode="light">
      <MDEditor
        value={value}
        onChange={(val) => onChange(val || '')}
        textareaProps={{
          placeholder: 'Write your post in Markdown...',
        }}
      />
    </div>
  );
}

export default MarkdownEditor;
