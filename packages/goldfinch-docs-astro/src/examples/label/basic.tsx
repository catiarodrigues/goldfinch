import { Label } from "@catiarodrigues/goldfinch";

export default function LabelBasic() {
  return (
    <div className="flex flex-col gap-3">
      <Label>Email</Label>
      <Label showOptional>Middle Name</Label>
      <Label tooltip="We'll use this to verify your account.">Phone</Label>
    </div>
  );
}
