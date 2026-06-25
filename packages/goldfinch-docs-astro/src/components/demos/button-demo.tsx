import { Button } from "@catiarodrigues/goldfinch";

export function ButtonDemo() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Button>Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="brand">Brand</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="plain">Plain</Button>
    </div>
  );
}

export function ButtonSizesDemo() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  );
}

export function ButtonShapeDemo() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Button shape="squircle">Squircle</Button>
      <Button shape="pill">Pill</Button>
    </div>
  );
}

export function ButtonLoadingDemo() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Button loading>Loading</Button>
      <Button variant="primary" loading>Primary</Button>
      <Button variant="brand" loading>Brand</Button>
    </div>
  );
}

export function ButtonIconDemo() {
  return (
    <div class="flex flex-wrap items-center gap-4">
      <Button variant="primary">No Icon</Button>
    </div>
  );
}
