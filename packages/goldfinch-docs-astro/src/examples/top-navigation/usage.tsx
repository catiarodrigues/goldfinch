import { TopNavigation, Button } from "@catiarodrigues/goldfinch";

export default function AppBar() {
  return (
    <TopNavigation>
      <TopNavigation.Logo>
        <span className="text-lg font-bold">MyApp</span>
      </TopNavigation.Logo>
      <TopNavigation.Nav>
        <TopNavigation.NavItem href="/dashboard" active>
          Dashboard
        </TopNavigation.NavItem>
        <TopNavigation.NavItem href="/settings">Settings</TopNavigation.NavItem>
      </TopNavigation.Nav>
      <TopNavigation.Actions>
        <Button variant="ghost" size="sm">
          Log in
        </Button>
      </TopNavigation.Actions>
    </TopNavigation>
  );
}
