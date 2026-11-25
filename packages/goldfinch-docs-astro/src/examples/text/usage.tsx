import { Text } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <div>
      <Text variant="heading1" as="h1">
        Heading 1
      </Text>
      <Text variant="body">Body copy goes here.</Text>
      <Text variant="secondary">Secondary / muted text.</Text>
      <Text variant="mono">npm install</Text>
    </div>
  );
}
