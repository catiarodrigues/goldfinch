import { Button, Popover } from "@catiarodrigues/goldfinch";

export default function PopoverBasic() {
  return (
    <Popover>
      <Popover.Trigger render={<Button variant="ghost">Open Popover</Button>} />
      <Popover.Content>
        <div className="text-sm">Popover content</div>
      </Popover.Content>
    </Popover>
  );
}
