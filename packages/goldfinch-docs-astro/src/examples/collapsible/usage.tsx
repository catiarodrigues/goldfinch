import { Collapsible, Button } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Collapsible>
      <Collapsible.Trigger render={<Button variant="ghost" />}>
        Toggle
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <div>Hidden content revealed.</div>
      </Collapsible.Panel>
    </Collapsible>
  );
}
