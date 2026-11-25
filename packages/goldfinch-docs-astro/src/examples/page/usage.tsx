import { Page } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Page size="base">
      <Page.Breadcrumbs>Home / Dashboard</Page.Breadcrumbs>
      <Page.Title>Dashboard</Page.Title>
      <Page.Description>Overview of your project metrics.</Page.Description>
      {/* Page content */}
    </Page>
  );
}
