import { Text } from "@catiarodrigues/goldfinch";

export default function TextBasic() {
  return (
    <div className="flex flex-col gap-2">
      <Text variant="heading1" as="h1">
        Heading 1
      </Text>
      <Text variant="heading2" as="h2">
        Heading 2
      </Text>
      <Text variant="heading3" as="h3">
        Heading 3
      </Text>
      <Text variant="body">Body text</Text>
      <Text variant="secondary">Secondary text</Text>
    </div>
  );
}
