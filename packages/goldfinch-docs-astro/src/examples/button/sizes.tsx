import { Button } from "@catiarodrigues/goldfinch";

export default function ButtonSizes() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="base">Base</Button>
      <Button size="lg">LG</Button>
    </div>
  );
}
