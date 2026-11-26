import { Toggle } from "@catiarodrigues/goldfinch";

export default function ToggleGroupExample() {
  return (
    <Toggle.Group legend="Notifications">
      <Toggle.Item label="Email" defaultChecked />
      <Toggle.Item label="SMS" />
      <Toggle.Item label="Push" defaultChecked />
    </Toggle.Group>
  );
}
