import { Select } from "@catiarodrigues/goldfinch";

export default function SelectItems() {
  return (
    <Select
      label="Pick a fruit"
      placeholder="Pick a fruit…"
      items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
    />
  );
}
