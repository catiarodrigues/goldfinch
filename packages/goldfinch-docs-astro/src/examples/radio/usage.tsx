import { useState } from "react";
import { Radio } from "@catiarodrigues/goldfinch";

export default function Example() {
  const [plan, setPlan] = useState("free");
  return (
    <Radio.Group legend="Plan" value={plan} onValueChange={setPlan}>
      <Radio.Item value="free" label="Free" />
      <Radio.Item value="pro" label="Pro" />
    </Radio.Group>
  );
}
