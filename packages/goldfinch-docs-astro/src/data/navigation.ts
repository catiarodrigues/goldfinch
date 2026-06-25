export interface NavItem {
  title: string;
  href: string;
  badge?: string;
}

export interface NavSection {
  title: string;
  items: NavItem[];
}

export const navigation: NavSection[] = [
  {
    title: "Getting Started",
    items: [
      { title: "Installation", href: "/getting-started/installation" },
      { title: "Theming", href: "/getting-started/theming" },
    ],
  },
  {
    title: "Components",
    items: [
      { title: "Alert", href: "/components/alert" },
      { title: "Badge", href: "/components/badge" },
      { title: "Breadcrumbs", href: "/components/breadcrumbs" },
      { title: "Button", href: "/components/button" },
      { title: "Card", href: "/components/card" },
      { title: "Checkbox", href: "/components/checkbox" },
      { title: "Collapsible", href: "/components/collapsible" },
      { title: "CopyToClipboard", href: "/components/copy-to-clipboard" },
      { title: "Dropdown", href: "/components/dropdown" },
      { title: "EmptyState", href: "/components/empty-state" },
      { title: "Field", href: "/components/field" },
      { title: "Grid", href: "/components/grid" },
      { title: "Input", href: "/components/input" },
      { title: "InputGroup", href: "/components/input-group" },
      { title: "Label", href: "/components/label" },
      { title: "Link", href: "/components/link" },
      { title: "Menubar", href: "/components/menubar" },
      { title: "Modal", href: "/components/modal" },
      { title: "Page", href: "/components/page" },
      { title: "Pagination", href: "/components/pagination" },
      { title: "Popover", href: "/components/popover" },
      { title: "Progress", href: "/components/progress" },
      { title: "Radio", href: "/components/radio" },
      { title: "Select", href: "/components/select" },
      { title: "SensitiveInput", href: "/components/sensitive-input" },
      { title: "Sidebar", href: "/components/sidebar" },
      { title: "Spinner", href: "/components/spinner" },
      { title: "Table", href: "/components/table" },
      { title: "TableOfContents", href: "/components/table-of-contents" },
      { title: "Tabs", href: "/components/tabs" },
      { title: "Text", href: "/components/text" },
      { title: "Toast", href: "/components/toast" },
      { title: "Toggle", href: "/components/toggle" },
      { title: "Toolbar", href: "/components/toolbar" },
      { title: "Tooltip", href: "/components/tooltip" },
      { title: "TopNavigation", href: "/components/top-navigation" },
    ],
  },
];
