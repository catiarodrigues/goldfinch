import { DropdownMenu, Button } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button variant="ghost">Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item onClick={() => {}}>Edit</DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => {}}>Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={() => {}} variant="danger">
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
}
