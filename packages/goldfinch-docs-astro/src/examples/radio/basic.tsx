import { Radio } from "@catiarodrigues/goldfinch";

export default function RadioBasic() {
  return (
    <Radio.Group legend="Choose one" defaultValue="a">
      <Radio.Item label="Option A" value="a" />
      <Radio.Item label="Option B" value="b" />
    </Radio.Group>
  );
}
