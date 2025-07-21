import type React from "react";
import Markdown from "markdown-to-jsx";

export function MdPlain({ children }: { children?: React.ReactNode }) {
  return <Markdown>{children as string}</Markdown>;
}
