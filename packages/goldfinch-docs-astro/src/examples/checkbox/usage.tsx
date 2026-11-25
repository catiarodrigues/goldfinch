import { useState } from "react";
import { Checkbox } from "@catiarodrigues/goldfinch";

export default function Example() {
  const [accepted, setAccepted] = useState(false);
  return (
    <Checkbox
      label="Accept terms"
      checked={accepted}
      onCheckedChange={setAccepted}
    />
  );
}
