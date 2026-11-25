import { Tabs } from "@catiarodrigues/goldfinch";

// Uncontrolled: omit `value` and it starts on the first tab.
export default function Example() {
  return (
    <Tabs
      tabs={[
        { value: "overview", label: "Overview" },
        { value: "details", label: "Details" },
      ]}
      variant="segmented"
    />
  );
}
