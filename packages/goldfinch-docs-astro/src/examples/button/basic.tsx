import { Button } from "@catiarodrigues/goldfinch";

export default function ButtonBasic() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}
