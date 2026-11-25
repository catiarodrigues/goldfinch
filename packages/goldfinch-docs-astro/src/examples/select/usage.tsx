import { useState } from "react";
import { Select } from "@catiarodrigues/goldfinch";

export default function Example() {
  const [value, setValue] = useState<string | null>("option-1");
  const options = [
    { label: "Option 1", value: "option-1" },
    { label: "Option 2", value: "option-2" },
  ];
  return (
    <Select
      items={options}
      value={value}
      onValueChange={setValue}
      placeholder="Select an option"
    />
  );
}
