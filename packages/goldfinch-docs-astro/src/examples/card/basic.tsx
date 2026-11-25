import { Card } from "@catiarodrigues/goldfinch";

export default function CardBasic() {
  return (
    <Card className="p-6">
      <h3 className="mb-2 text-lg font-semibold text-goldfinch-strong">Card</h3>
      <p className="text-sm text-goldfinch-default">A card with elevation.</p>
    </Card>
  );
}
