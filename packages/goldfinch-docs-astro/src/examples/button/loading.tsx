import { FloppyDiskIcon } from "@phosphor-icons/react";
import { Button } from "@catiarodrigues/goldfinch";

export default function ButtonLoading() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="primary" loading>
        Saving…
      </Button>
      <Button icon={<FloppyDiskIcon />} loading>
        Saving…
      </Button>
      <Button
        shape="square"
        icon={<FloppyDiskIcon />}
        loading
        aria-label="Save"
      />
    </div>
  );
}
