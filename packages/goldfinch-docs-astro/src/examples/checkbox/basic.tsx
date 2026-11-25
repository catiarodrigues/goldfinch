import { useState } from "react";
import { Checkbox, Label } from "@catiarodrigues/goldfinch";

export default function CheckboxBasic() {
  const [subscribed, setSubscribed] = useState(true);
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox aria-label="Accept terms" /> Accept terms
      </Label>
      <Label>
        <Checkbox
          checked={subscribed}
          onCheckedChange={setSubscribed}
          aria-label="Subscribe"
        />{" "}
        Subscribe
      </Label>
    </div>
  );
}
