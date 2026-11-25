import { Input, Field } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Field label="Name" description="Enter your full name.">
      <Input placeholder="John Doe" aria-label="Name" />
    </Field>
  );
}
