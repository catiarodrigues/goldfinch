import { Button, Popover } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Popover>
      <Popover.Trigger>
        <Button variant="ghost">Open</Button>
      </Popover.Trigger>
      <Popover.Content>
        <Popover.Title>Details</Popover.Title>
        <p>Popover content here.</p>
      </Popover.Content>
    </Popover>
  );
}
