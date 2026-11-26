import { Button, TopNavigation } from "@catiarodrigues/goldfinch";

export default function TopNavigationBasic() {
  return (
    <TopNavigation>
      <TopNavigation.Logo>
        <span className="text-lg font-bold text-goldfinch-strong">
          Goldfinch
        </span>
      </TopNavigation.Logo>
      <TopNavigation.Nav>
        <TopNavigation.NavItem href="#docs" active>
          Docs
        </TopNavigation.NavItem>
        <TopNavigation.NavItem href="#components">
          Components
        </TopNavigation.NavItem>
        <TopNavigation.NavItem href="#blog">Blog</TopNavigation.NavItem>
      </TopNavigation.Nav>
      <TopNavigation.Actions>
        <Button variant="ghost" size="sm">
          Log in
        </Button>
        <Button size="sm">Sign up</Button>
      </TopNavigation.Actions>
    </TopNavigation>
  );
}
