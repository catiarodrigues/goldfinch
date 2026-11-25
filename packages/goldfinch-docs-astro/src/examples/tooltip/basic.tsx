import { Button, Tooltip } from "@catiarodrigues/goldfinch";

export default function TooltipBasic() {
  return (
    <Tooltip content="This is a tooltip">
      <Button variant="ghost">Hover me</Button>
    </Tooltip>
  );
}
