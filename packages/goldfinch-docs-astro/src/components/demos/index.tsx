/* ---------- Imports ---------- */
import {
  Badge,
  Alert,
  Breadcrumbs,
  Button,
  Checkbox,
  CopyToClipboard,
  Collapsible,
  Modal,
  DropdownMenu,
  EmptyState,
  Field,
  Grid,
  Input,
  InputGroup,
  Label,
  SensitiveInput,
  Card,
  Link,
  Spinner,
  MenuBar,
  Progress,
  Pagination,
  Popover,
  Radio,
  Select,
  Sidebar,
  Toggle,
  Table,
  TableOfContents,
  Tabs,
  Text,
  Toast,
  Toasty,
  Toolbar,
  Tooltip,
  TopNavigation,
  Page,
  useGoldfinchToastManager,
} from "@catiarodrigues/goldfinch";
import { useState, useCallback } from "react";
import { Copy, Trash } from "@phosphor-icons/react";
export { DemoFrame } from "./DemoFrame";

/* ---------- Button ---------- */
export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary">Default</Button>
      <Button variant="primary">Primary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="outline">Outline</Button>
    </div>
  );
}

export function ButtonSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button size="xs">XS</Button>
      <Button size="sm">SM</Button>
      <Button size="base">Base</Button>
      <Button size="lg">LG</Button>
    </div>
  );
}

export function ButtonLoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="secondary" loading>Loading</Button>
      <Button variant="primary" loading>Primary</Button>
    </div>
  );
}

export function ButtonShapeDemo() {
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button>Default</Button>
      <Button shape="square">Square</Button>
    </div>
  );
}

/* ---------- Badge ---------- */
export function BadgeSemanticVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
      <Badge variant="outline">Outline</Badge>
      <Badge variant="beta">Beta</Badge>
    </div>
  );
}

export function BadgeColorVariantsDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="neutral">Neutral</Badge>
      <Badge variant="red">Red</Badge>
      <Badge variant="green">Green</Badge>
      <Badge variant="orange">Orange</Badge>
      <Badge variant="teal">Teal</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="purple">Purple</Badge>
    </div>
  );
}

export function BadgeDotDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge appearance="dot" variant="success">Healthy</Badge>
      <Badge appearance="dot" variant="warning">Warning</Badge>
      <Badge appearance="dot" variant="error">Error</Badge>
      <Badge appearance="dot" variant="neutral">Neutral</Badge>
    </div>
  );
}

export function BadgeInSentenceDemo() {
  return (
    <p className="flex items-center gap-2">
      Users
      <Badge variant="secondary">New</Badge>
    </p>
  );
}

export function BadgeSizesDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Badge size="sm">SM</Badge>
      <Badge size="md">MD</Badge>
      <Badge size="lg">LG</Badge>
    </div>
  );
}

/* ---------- Alert ---------- */
export function AlertDemo() {
  return (
    <Alert>This is an informational alert message.</Alert>
  );
}

export function AlertVariantsDemo() {
  return (
    <div className="flex flex-col gap-4">
      <Alert>Default</Alert>
      <Alert variant="alert">Alert</Alert>
      <Alert variant="error">Error</Alert>
      <Alert variant="secondary">Secondary</Alert>
    </div>
  );
}

/* ---------- Breadcrumbs ---------- */
export function BreadcrumbsDemo() {
  const items = [
    { label: "Home", href: "#" },
    { label: "Products", href: "#" },
    { label: "Details" },
  ];
  return <Breadcrumbs items={items} />;
}

/* ---------- Checkbox ---------- */
export function CheckboxDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Label>
        <Checkbox aria-label="Accept terms" /> Accept terms
      </Label>
      <Label>
        <Checkbox defaultChecked aria-label="Subscribe" /> Subscribe
      </Label>
    </div>
  );
}

/* ---------- CopyToClipboard ---------- */
export function CopyToClipboardDemo() {
  return <CopyToClipboard text="npm install @catiarodrigues/goldfinch" />;
}

/* ---------- Collapsible ---------- */
export function CollapsibleDemo() {
  return (
    <Collapsible defaultOpen>
      <Collapsible.Trigger render={<Button variant="ghost" />}>
        Toggle
      </Collapsible.Trigger>
      <Collapsible.Panel>
        <div className="pt-3 text-sm text-goldfinch-default">
          Hidden content revealed.
        </div>
      </Collapsible.Panel>
    </Collapsible>
  );
}

/* ---------- Modal ---------- */
export function ModalDemo() {
  const [open, setOpen] = useState(false);
  return (
    <Modal.Root open={open} onOpenChange={setOpen}>
      <Modal.Trigger>
        <Button>Open Modal</Button>
      </Modal.Trigger>
      <Modal size="sm">
        <Modal.Title>Hello</Modal.Title>
        <Modal.Description className="text-sm text-goldfinch-default pb-4">
          This is a modal example.
        </Modal.Description>
        <Modal.Close>
          <Button>Close</Button>
        </Modal.Close>
      </Modal>
    </Modal.Root>
  );
}

/* ---------- Dropdown ---------- */
export function DropdownDemo() {
  return (
    <DropdownMenu>
      <DropdownMenu.Trigger>
        <Button variant="ghost">Actions</Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item onClick={() => {}}>Edit</DropdownMenu.Item>
          <DropdownMenu.Item onClick={() => {}}>Duplicate</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item onClick={() => {}} variant="danger">Delete</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu>
  );
}

/* ---------- EmptyState ---------- */
export function EmptyStateDemo() {
  return (
    <EmptyState
      title="No results"
      description="Try adjusting your search or filters."
    />
  );
}

/* ---------- Field ---------- */
export function FieldDemo() {
  return (
    <Field label="Email" description="We'll never share your email." error="">
      <Input type="email" placeholder="you@example.com" aria-label="Email" />
    </Field>
  );
}

/* ---------- Grid ---------- */
export function GridDemo() {
  return (
    <Grid columns={3} gap="base">
      <div className="rounded-lg bg-goldfinch-tint p-4 text-center text-sm">1</div>
      <div className="rounded-lg bg-goldfinch-tint p-4 text-center text-sm">2</div>
      <div className="rounded-lg bg-goldfinch-tint p-4 text-center text-sm">3</div>
    </Grid>
  );
}

/* ---------- Input ---------- */
export function InputDemo() {
  return <Input placeholder="Type something…" aria-label="Sample input" />;
}

export function InputVariantsDemo() {
  return (
    <div className="flex flex-col gap-3 w-full max-w-xs">
      <Input placeholder="Default" aria-label="Default input" />
      <Input placeholder="Error state" error="This field is required" aria-label="Error input" />
    </div>
  );
}

/* ---------- InputGroup ---------- */
export function InputGroupDemo() {
  return (
    <InputGroup>
      <InputGroup.Input placeholder="Search…" aria-label="Search" />
      <InputGroup.Button variant="primary">Go</InputGroup.Button>
    </InputGroup>
  );
}

/* ---------- Card ---------- */
export function CardDemo() {
  return (
    <Card className="p-6">
      <h3 className="mb-2 text-lg font-semibold text-goldfinch-strong">Card</h3>
      <p className="text-sm text-goldfinch-default">A card with elevation.</p>
    </Card>
  );
}

/* ---------- Link ---------- */
export function LinkDemo() {
  return <Link href="#">A styled link</Link>;
}

/* ---------- Spinner ---------- */
export function SpinnerDemo() {
  return <Spinner />;
}

export function SpinnerSizesDemo() {
  return (
    <div className="flex items-center gap-4">
      <Spinner size="sm" />
      <Spinner size="base" />
      <Spinner size="lg" />
    </div>
  );
}

/* ---------- Menubar ---------- */
export function MenubarDemo() {
  return (
    <MenuBar
      isActive={0}
      options={[
        { icon: <Copy size={16} />, tooltip: "Copy", onClick: () => {} },
        { icon: <Trash size={16} />, tooltip: "Delete", onClick: () => {} },
      ]}
    />
  );
}

/* ---------- Progress ---------- */
export function ProgressDemo() {
  return <Progress label="Storage" value={65} />;
}

export function ProgressSizesDemo() {
  return (
    <div className="flex flex-col gap-3">
      <Progress label="Storage used" value={65} />
      <Progress label="API requests" value={90} customValue="900 / 1,000" />
    </div>
  );
}

/* ---------- Pagination ---------- */
export function PaginationDemo() {
  const [page, setPage] = useState(1);
  return <Pagination current={page} total={10} onChange={setPage} />;
}

/* ---------- Popover ---------- */
export function PopoverDemo() {
  return (
    <Popover>
      <Popover.Trigger render={<Button variant="ghost">Open Popover</Button>} />
      <Popover.Content>
        <div className="text-sm">Popover content</div>
      </Popover.Content>
    </Popover>
  );
}

/* ---------- Radio ---------- */
export function RadioDemo() {
  return (
    <Radio.Group legend="Choose one" defaultValue="a">
      <Radio.Item label="Option A" value="a" />
      <Radio.Item label="Option B" value="b" />
    </Radio.Group>
  );
}

/* ---------- Select ---------- */
export function SelectDemo() {
  return (
    <Select
      placeholder="Choose…"
      items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
    />
  );
}

export function SelectItemsDemo() {
  return (
    <Select
      label="Pick a fruit"
      placeholder="Pick a fruit…"
      items={{ apple: "Apple", banana: "Banana", cherry: "Cherry" }}
    />
  );
}

/* ---------- SensitiveInput ---------- */
export function SensitiveInputDemo() {
  return <SensitiveInput placeholder="Enter sensitive data…" />;
}

/* ---------- Sidebar ---------- */
export function SidebarDemo() {
  return (
    <div className="w-64 rounded-lg border border-goldfinch-hairline overflow-hidden">
      <Sidebar.Provider defaultOpen>
        <Sidebar collapsible="none">
          <Sidebar.Header>Navigation</Sidebar.Header>
          <Sidebar.Content>
            <Sidebar.Menu>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>Dashboard</Sidebar.MenuButton>
              </Sidebar.MenuItem>
              <Sidebar.MenuItem>
                <Sidebar.MenuButton>Analytics</Sidebar.MenuButton>
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

/* ---------- Toggle ---------- */
export function ToggleDemo() {
  return (
    <div className="flex items-center gap-3">
      <Toggle defaultChecked /> <span className="text-sm">Toggle</span>
    </div>
  );
}

/* ---------- Table ---------- */
export function TableDemo() {
  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.Head>Name</Table.Head>
          <Table.Head>Role</Table.Head>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.Cell>Alice</Table.Cell>
          <Table.Cell>Engineer</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>Bob</Table.Cell>
          <Table.Cell>Designer</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
}

/* ---------- TableOfContents ---------- */
export function TableOfContentsDemo() {
  return (
    <TableOfContents>
      <TableOfContents.List>
        <TableOfContents.Item href="#intro">Introduction</TableOfContents.Item>
        <TableOfContents.Item href="#usage">Usage</TableOfContents.Item>
        <TableOfContents.Item href="#api">API</TableOfContents.Item>
      </TableOfContents.List>
    </TableOfContents>
  );
}

/* ---------- Tabs ---------- */
const tabsItems: TabsItem[] = [
  { value: "preview", label: "Preview" },
  { value: "code", label: "Code" },
  { value: "props", label: "Props" },
];

export function TabsDemo() {
  const [tab, setTab] = useState("preview");
  const [tab2, setTab2] = useState("preview");
  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="mb-2 text-sm font-medium text-goldfinch-subtle">Underline</p>
        <Tabs tabs={tabsItems} variant="underline" value={tab} onValueChange={setTab} />
        <div className="pt-4">
          {tab === "preview" && <p className="text-sm">Preview content</p>}
          {tab === "code" && <p className="text-sm">Code content</p>}
          {tab === "props" && <p className="text-sm">Props content</p>}
        </div>
      </div>
      <div>
        <p className="mb-2 text-sm font-medium text-goldfinch-subtle">Segmented</p>
        <Tabs tabs={tabsItems} variant="segmented" value={tab2} onValueChange={setTab2} />
        <div className="pt-4">
          {tab2 === "preview" && <p className="text-sm">Preview content</p>}
          {tab2 === "code" && <p className="text-sm">Code content</p>}
          {tab2 === "props" && <p className="text-sm">Props content</p>}
        </div>
      </div>
    </div>
  );
}

/* ---------- Text ---------- */
export function TextDemo() {
  return (
    <div className="flex flex-col gap-2">
      <Text variant="heading1">Heading 1</Text>
      <Text variant="heading2">Heading 2</Text>
      <Text variant="heading3">Heading 3</Text>
      <Text variant="body">Body text</Text>
      <Text variant="secondary">Secondary text</Text>
    </div>
  );
}

/* ---------- Toast ---------- */
function ToastInner() {
  const toast = useGoldfinchToastManager();
  const addToast = useCallback(() => {
    toast.add({ title: "Hello!", description: "This is a toast notification." });
  }, [toast]);
  return <Button onClick={addToast}>Show Toast</Button>;
}

export function ToastDemo() {
  return (
    <Toasty>
      <ToastInner />
    </Toasty>
  );
}

/* ---------- Toolbar ---------- */
export function ToolbarDemo() {
  return (
    <Toolbar aria-label="Formatting">
      <Toolbar.Button>Bold</Toolbar.Button>
      <Toolbar.Button>Italic</Toolbar.Button>
      <Toolbar.Button>Underline</Toolbar.Button>
    </Toolbar>
  );
}

/* ---------- TopNavigation ---------- */
export function TopNavigationDemo() {
  return (
    <TopNavigation>
      <TopNavigation.Logo>
        <span className="text-lg font-bold text-goldfinch-strong">Goldfinch</span>
      </TopNavigation.Logo>
      <TopNavigation.Nav>
        <TopNavigation.NavItem active>Docs</TopNavigation.NavItem>
        <TopNavigation.NavItem>Components</TopNavigation.NavItem>
        <TopNavigation.NavItem>Blog</TopNavigation.NavItem>
      </TopNavigation.Nav>
      <TopNavigation.Actions>
        <Button variant="ghost" size="sm">Log in</Button>
        <Button size="sm">Sign up</Button>
      </TopNavigation.Actions>
    </TopNavigation>
  );
}

/* ---------- Page ---------- */
export function PageDemo() {
  return (
    <Page size="sm">
      <Page.Breadcrumbs>Home / Components</Page.Breadcrumbs>
      <Page.Title>Button</Page.Title>
      <Page.Description>Clickable controls for forms, dialogs, and action bars.</Page.Description>
      <p className="text-goldfinch-default pt-4">This content is constrained to a max-width container with consistent padding.</p>
    </Page>
  );
}

/* ---------- Tooltip ---------- */
export function TooltipDemo() {
  return (
    <Tooltip content="This is a tooltip">
      <Button variant="ghost">Hover me</Button>
    </Tooltip>
  );
}
