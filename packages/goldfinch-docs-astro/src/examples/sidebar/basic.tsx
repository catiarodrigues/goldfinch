import { Sidebar } from "@catiarodrigues/goldfinch";

export default function SidebarBasic() {
  return (
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
  );
}
