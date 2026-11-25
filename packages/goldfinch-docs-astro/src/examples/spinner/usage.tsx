import { Spinner, Button } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Button disabled>
      <Spinner size="sm" aria-label="Loading" />
      Saving...
    </Button>
  );
}
