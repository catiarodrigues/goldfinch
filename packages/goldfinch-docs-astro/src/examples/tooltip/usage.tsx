import { TrashIcon } from "@phosphor-icons/react";
import { Button, Tooltip } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Tooltip content="Delete item">
      <Button variant="ghost" aria-label="Delete">
        <TrashIcon />
      </Button>
    </Tooltip>
  );
}
