import { Combobox } from "@catiarodrigues/goldfinch";

export default function ComboboxValidation() {
  return (
    <div className="w-72">
      <Combobox
        label="Time zone"
        items={["Europe/Lisbon", "Europe/London", "Europe/Berlin"]}
        placeholder="Search time zones…"
        error="Choose a time zone"
      />
    </div>
  );
}
