import { PlusIcon } from "@phosphor-icons/react";
import { Button } from "@catiarodrigues/goldfinch";

export default function ButtonShape() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button icon={<PlusIcon />}>Add item</Button>
      <Button shape="square" icon={<PlusIcon />} aria-label="Add item" />
    </div>
  );
}
