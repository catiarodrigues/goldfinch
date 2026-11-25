import { Button, Collapsible } from "@catiarodrigues/goldfinch";

export default function CollapsibleBasic() {
  return (
    <Collapsible defaultOpen>
      <Collapsible.Trigger render={<Button variant="ghost" />}>
        Toggle
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <div className="pt-3 text-sm text-goldfinch-default">
          Hidden content revealed.
        </div>
      </Collapsible.Panel>
    </Collapsible>
  );
}
