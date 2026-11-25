import { Select } from "@catiarodrigues/goldfinch";

export default function SelectBasic() {
  return (
    <Select
      placeholder="Choose…"
      items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
    />
  );
}
