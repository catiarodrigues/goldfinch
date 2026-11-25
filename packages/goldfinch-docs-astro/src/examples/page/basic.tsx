import { Page } from "@catiarodrigues/goldfinch";

export default function PageBasic() {
  return (
    <Page size="sm">
      <Page.Breadcrumbs>Home / Components</Page.Breadcrumbs>
      <Page.Title>Button</Page.Title>
      <Page.Description>
        Clickable controls for forms, dialogs, and action bars.
      </Page.Description>
      <p className="pt-4 text-goldfinch-default">
        This content is constrained to a max-width container with consistent
        padding.
      </p>
    </Page>
  );
}
