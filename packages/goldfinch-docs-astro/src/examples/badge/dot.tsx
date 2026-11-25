import { Badge } from "@catiarodrigues/goldfinch";

export default function BadgeDot() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge appearance="dot" variant="success">
        Healthy
      </Badge>
      <Badge appearance="dot" variant="warning">
        Warning
      </Badge>
      <Badge appearance="dot" variant="error">
        Error
      </Badge>
      <Badge appearance="dot" variant="neutral">
        Neutral
      </Badge>
    </div>
  );
}
