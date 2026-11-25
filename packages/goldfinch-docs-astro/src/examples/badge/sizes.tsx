import { Badge } from "@catiarodrigues/goldfinch";

export default function BadgeSizes() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  );
}
