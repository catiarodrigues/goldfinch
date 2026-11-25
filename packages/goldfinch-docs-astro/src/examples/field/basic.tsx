import { Field, Input } from "@catiarodrigues/goldfinch";

export default function FieldBasic() {
  return (
    <Field label="Email" description="We'll never share your email.">
      <Input type="email" placeholder="you@example.com" aria-label="Email" />
    </Field>
  );
}
