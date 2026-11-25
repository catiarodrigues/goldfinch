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
        <TopNavigation.NavItem active>Docs</TopNavigation.NavItem>
        <TopNavigation.NavItem>Components</TopNavigation.NavItem>
        <TopNavigation.NavItem>Blog</TopNavigation.NavItem>
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
