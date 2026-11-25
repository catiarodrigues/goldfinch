import { Toolbar } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Toolbar aria-label="Formatting">
      <Toolbar.Button onClick={() => {}}>Bold</Toolbar.Button>
      <Toolbar.Button onClick={() => {}}>Italic</Toolbar.Button>
      <Toolbar.Input placeholder="Search..." aria-label="Search" />
    </Toolbar>
  );
}
