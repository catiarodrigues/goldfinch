import { Combobox } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Combobox
      label="Fruit"
      items={["Apple", "Banana", "Cherry"]}
      placeholder="Search fruit…"
    />
  );
}
