import type { Meta, StoryObj } from "@storybook/react-vite";
import { Sidebar } from "./sidebar";
import { expect, userEvent, within } from "storybook/test";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

export const Default: Story = {
  render: () => (
    <div className="w-64 overflow-hidden rounded-lg border border-goldfinch-hairline">
      <Sidebar.Provider defaultOpen collapsible="none">
        <Sidebar>
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
  ),
};

/** The trigger collapses the sidebar to icons and expands it again. */
export const CollapseAndExpand: Story = {
  render: () => (
    <Sidebar.Provider defaultOpen collapsible="icon" contained>
      <Sidebar>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>Dashboard</Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>
      <main className="p-4">
        <Sidebar.Trigger />
      </main>
    </Sidebar.Provider>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const wrapper = canvasElement.querySelector("[data-sidebar-wrapper]");
    await expect(wrapper).toHaveAttribute("data-state", "expanded");

    // The trigger's name and aria-expanded follow the state.
    const collapse = canvas.getByRole("button", { name: "Collapse sidebar" });
    await expect(collapse).toHaveAttribute("aria-expanded", "true");
    await userEvent.click(collapse);
    await expect(wrapper).toHaveAttribute("data-state", "collapsed");

    const expand = canvas.getByRole("button", { name: "Expand sidebar" });
    await expect(expand).toHaveAttribute("aria-expanded", "false");
    await userEvent.click(expand);
    await expect(wrapper).toHaveAttribute("data-state", "expanded");
  },
};
