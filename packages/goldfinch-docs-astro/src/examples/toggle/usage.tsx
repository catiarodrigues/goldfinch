import { useState } from "react";
import { Toggle } from "@catiarodrigues/goldfinch";

export default function Example() {
  const [enabled, setEnabled] = useState(false);
  return (
    <Toggle
      label="Enable notifications"
      checked={enabled}
      onCheckedChange={setEnabled}
    />
  );
}
