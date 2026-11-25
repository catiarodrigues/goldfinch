import { useState } from "react";
import { Tabs, type TabsItem } from "@catiarodrigues/goldfinch";

const tabs: TabsItem[] = [
  { value: "preview", label: "Preview" },
  { value: "code", label: "Code" },
  { value: "props", label: "Props" },
];

export default function TabsUnderline() {
  const [tab, setTab] = useState("preview");
  return (
    <div>
      <Tabs
        tabs={tabs}
        variant="underline"
        value={tab}
        onValueChange={setTab}
      />
      <p className="pt-4 text-sm">
        {tabs.find((t) => t.value === tab)?.label} content
      </p>
    </div>
  );
}
