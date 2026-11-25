import { Button } from "@catiarodrigues/goldfinch";

export default function ButtonShape() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Default</Button>
      <Button shape="square">Square</Button>
    </div>
  );
}
