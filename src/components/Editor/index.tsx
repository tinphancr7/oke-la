import { Editor, IAllProps } from "@tinymce/tinymce-react";

export default function BundledEditor(props: IAllProps) {
  const { init, ...rest } = props;
  return (
    <Editor
      apiKey="i90dbv242azw8c5um2zf4pydfpl3qd9xrqubimrguvszeaxq"
      init={{
        ...init,
      }}
      {...rest}
    />
  );
}
