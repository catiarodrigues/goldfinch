import { InputGroup, Input, Button } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <InputGroup>
      <Button variant="secondary" onClick={() => alert("Search")}>
        Search
      </Button>
      <Input placeholder="Search..." aria-label="Search" />
    </InputGroup>
  );
}
