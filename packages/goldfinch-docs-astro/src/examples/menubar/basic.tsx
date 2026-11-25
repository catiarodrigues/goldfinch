import { Copy, Trash } from "@phosphor-icons/react";
import { MenuBar } from "@catiarodrigues/goldfinch";

export default function MenubarBasic() {
  return (
    <MenuBar
      isActive={0}
      options={[
        { icon: <Copy size={16} />, tooltip: "Copy", onClick: () => {} },
        { icon: <Trash size={16} />, tooltip: "Delete", onClick: () => {} },
      ]}
    />
  );
}
