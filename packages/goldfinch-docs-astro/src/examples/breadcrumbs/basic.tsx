import { Breadcrumbs } from "@catiarodrigues/goldfinch";

export default function BreadcrumbsBasic() {
  const items = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "Details" },
  ];
  return <Breadcrumbs items={items} />;
}
