import React, { useContext } from "react";
import MDEditor, {
  commands,
  ICommand,
  EditorContext,
} from "@uiw/react-md-editor";
import { FaPlay } from "react-icons/fa";
import { RiEditFill } from "react-icons/ri";

export default function MdTextArea({
  value,
  setValue,
}: {
  value?: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="container">
      <MDEditor
        value={value || ""}
        preview="edit"
        data-color-mode="light"
        extraCommands={[codePreview, customButton, commands.fullscreen]}
        onChange={(val) => {
          setValue(val!);
        }}
      />
    </div>
  );
}

const Button = () => {
  const { preview, dispatch } = useContext(EditorContext);
  const click = () => {
    dispatch!({
      preview: preview === "edit" ? "preview" : "edit",
    });
  };
  if (preview === "edit") {
    return (
      <button title="Preview" type="button" onClick={click} className="pointer">
        <FaPlay />
      </button>
    );
  }
  return (
    <button title="Edit" type="button" onClick={click} className="pointer">
      <RiEditFill />
    </button>
  );
};

const codePreview: ICommand = {
  name: "preview",
  keyCommand: "preview",
  value: "preview",
  icon: <Button />,
};

const Disable = () => {
  const { preview } = useContext(EditorContext);
  return (
    <button disabled={preview === "preview"}>
      <svg viewBox="0 0 16 16" width="12px" height="12px">
        <path
          d="M8 0C3.6 0 0 3.6 0 8s3.6 8 8 8 8-3.6 8-8-3.6-8-8-8Zm.9 13H7v-1.8h1.9V13Zm-.1-3.6v.5H7.1v-.6c.2-2.1 2-1.9 1.9-3.2.1-.7-.3-1.1-1-1.1-.8 0-1.2.7-1.2 1.6H5c0-1.7 1.2-3 2.9-3 2.3 0 3 1.4 3 2.3.1 2.3-1.9 2-2.1 3.5Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};

const customButton = {
  name: "disable",
  keyCommand: "disable",
  value: "disable",
  icon: <Disable />,
};
