import { Breadcrumbs } from "@catiarodrigues/goldfinch";

export default function Example() {
  const items = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: "Details" },
  ];
  return <Breadcrumbs items={items} />;
}
