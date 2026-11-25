/* ---------- Imports ---------- */
import {
  Badge,
  Sidebar,
  Tabs,
  TopNavigation,
  Page,
} from "@catiarodrigues/goldfinch";

/* ---------- Button ---------- */
export { default as ButtonDemo } from "../../examples/button/basic";

/* ---------- Badge ---------- */
export function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="success">Success</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  );
}

/* ---------- Alert ---------- */
export { default as AlertDemo } from "../../examples/alert/basic";

/* ---------- Breadcrumbs ---------- */
export { default as BreadcrumbsDemo } from "../../examples/breadcrumbs/basic";

/* ---------- Checkbox ---------- */
export { default as CheckboxDemo } from "../../examples/checkbox/basic";

/* ---------- CopyToClipboard ---------- */
export { default as CopyToClipboardDemo } from "../../examples/copy-to-clipboard/basic";

/* ---------- Collapsible ---------- */
export { default as CollapsibleDemo } from "../../examples/collapsible/basic";

/* ---------- Modal ---------- */
export { default as ModalDemo } from "../../examples/modal/basic";

/* ---------- Dropdown ---------- */
export { default as DropdownDemo } from "../../examples/dropdown/basic";

/* ---------- EmptyState ---------- */
export { default as EmptyStateDemo } from "../../examples/empty-state/basic";

/* ---------- Field ---------- */
export { default as FieldDemo } from "../../examples/field/basic";

/* ---------- Label ---------- */
export { default as LabelDemo } from "../../examples/label/basic";

/* ---------- Grid ---------- */
export { default as GridDemo } from "../../examples/grid/basic";

/* ---------- Input ---------- */
export { default as InputDemo } from "../../examples/input/basic";

/* ---------- InputGroup ---------- */
export { default as InputGroupDemo } from "../../examples/input-group/basic";

/* ---------- Card ---------- */
export { default as CardDemo } from "../../examples/card/basic";

/* ---------- Link ---------- */
export { default as LinkDemo } from "../../examples/link/basic";

/* ---------- Spinner ---------- */
export { default as SpinnerDemo } from "../../examples/spinner/basic";

/* ---------- Menubar ---------- */
export { default as MenubarDemo } from "../../examples/menubar/basic";

/* ---------- Progress ---------- */
export { default as ProgressDemo } from "../../examples/progress/basic";

/* ---------- Pagination ---------- */
export { default as PaginationDemo } from "../../examples/pagination/basic";

/* ---------- Popover ---------- */
export { default as PopoverDemo } from "../../examples/popover/basic";

/* ---------- Radio ---------- */
export { default as RadioDemo } from "../../examples/radio/basic";

/* ---------- Select ---------- */
export { default as SelectDemo } from "../../examples/select/basic";

/* ---------- SensitiveInput ---------- */
export { default as SensitiveInputDemo } from "../../examples/sensitive-input/basic";

/* ---------- Sidebar ---------- */
export { default as SidebarDemo } from "../../examples/sidebar/basic";

/* ---------- Toggle ---------- */
export { default as ToggleDemo } from "../../examples/toggle/basic";

/* ---------- Table ---------- */
export { default as TableDemo } from "../../examples/table/basic";

/* ---------- TableOfContents ---------- */
export { default as TableOfContentsDemo } from "../../examples/table-of-contents/basic";

/* ---------- Text ---------- */
export { default as TextDemo } from "../../examples/text/basic";

/* ---------- Toast ---------- */
export { default as ToastDemo } from "../../examples/toast/basic";

/* ---------- Toolbar ---------- */
export { default as ToolbarDemo } from "../../examples/toolbar/basic";

/* ---------- TopNavigation ---------- */
export { default as TopNavigationDemo } from "../../examples/top-navigation/basic";

/* ---------- Page ---------- */
export { default as PageDemo } from "../../examples/page/basic";

/* ---------- Tooltip ---------- */
export { default as TooltipDemo } from "../../examples/tooltip/basic";

/* ---------- Grid previews ----------
 * Compact stand-ins for the Overview page's component grid, used only
 * where the full doc-page demo (above) is too tall or too wide to read
 * at card size. Doc pages keep using the full demos untouched.
 */
export function TopNavigationGridPreview() {
  return (
    <div style={{ width: 200 }}>
      <TopNavigation>
        <TopNavigation.Logo>
          <span className="text-sm font-bold text-goldfinch-strong">
            Goldfinch
          </span>
        </TopNavigation.Logo>
      </TopNavigation>
    </div>
  );
}

export function SidebarGridPreview() {
  return (
    <div className="h-28 w-40 overflow-hidden rounded-lg border border-goldfinch-hairline">
      <Sidebar.Provider defaultOpen collapsible="none">
        <Sidebar>
          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>Dashboard</Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>Settings</Sidebar.MenuButton>
              </Sidebar.MenuItem>
            </Sidebar.Menu>
          </Sidebar.Content>
        </Sidebar>
      </Sidebar.Provider>
    </div>
  );
}

export function TabsGridPreview() {
  return (
    <Tabs
      tabs={[
        { value: "preview", label: "Preview" },
        { value: "code", label: "Code" },
      ]}
      variant="segmented"
      value="preview"
      onValueChange={() => {}}
    />
  );
}

export function PageGridPreview() {
  return (
    <div style={{ width: 200 }}>
      <Page size="sm" className="p-0">
        <Page.Title>Button</Page.Title>
      </Page>
    </div>
  );
}
