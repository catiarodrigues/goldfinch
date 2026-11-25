import { Toggle } from "@catiarodrigues/goldfinch";

export default function ToggleBasic() {
  return (
    <div className="flex items-center gap-3">
      <Toggle defaultChecked /> <span className="text-sm">Toggle</span>
    </div>
  );
}
