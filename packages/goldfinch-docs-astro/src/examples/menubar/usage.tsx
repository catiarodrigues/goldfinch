import { TextBIcon, TextItalicIcon } from "@phosphor-icons/react";
import { MenuBar } from "@catiarodrigues/goldfinch";

export default function Example() {
  const items = [
    { icon: <TextBIcon />, tooltip: "Bold", onClick: () => {} },
    { icon: <TextItalicIcon />, tooltip: "Italic", onClick: () => {} },
  ];
  return <MenuBar options={items} isActive={0} />;
}
