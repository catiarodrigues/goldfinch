import { Badge } from "@catiarodrigues/goldfinch";

export default function BadgeInSentence() {
  return (
    <p className="flex items-center gap-2">
      Users
      <Badge variant="secondary">New</Badge>
    </p>
  );
}
