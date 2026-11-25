import { GearIcon, HouseIcon } from "@phosphor-icons/react";
import { Sidebar } from "@catiarodrigues/goldfinch";

export default function Example() {
  return (
    <Sidebar.Provider defaultOpen collapsible="icon">
      <Sidebar>
        <Sidebar.Header>Acme</Sidebar.Header>
        <Sidebar.Content>
          <Sidebar.Menu>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton icon={<HouseIcon />} active>
                Dashboard
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
            <Sidebar.MenuItem>
              <Sidebar.MenuButton icon={<GearIcon />}>
                Settings
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          </Sidebar.Menu>
        </Sidebar.Content>
      </Sidebar>
      <main className="p-4">
        <Sidebar.Trigger />
      </main>
    </Sidebar.Provider>
  );
}
