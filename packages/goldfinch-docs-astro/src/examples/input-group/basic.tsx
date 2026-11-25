import { InputGroup } from "@catiarodrigues/goldfinch";

export default function InputGroupBasic() {
  return (
    <InputGroup>
      <InputGroup.Input placeholder="Search…" aria-label="Search" />
      <InputGroup.Button variant="primary">Go</InputGroup.Button>
    </InputGroup>
  );
}
