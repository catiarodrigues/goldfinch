import { Toolbar } from "@catiarodrigues/goldfinch";

export default function ToolbarBasic() {
  return (
    <Toolbar aria-label="Formatting">
      <Toolbar.Button>Bold</Toolbar.Button>
      <Toolbar.Button>Italic</Toolbar.Button>
      <Toolbar.Button>Underline</Toolbar.Button>
    </Toolbar>
  );
}
