import type { Meta, StoryObj } from "@storybook/react-vite";
import { Button } from "../button/button";
import { TopNavigation } from "./top-navigation";

import BasicExample from "../../../../goldfinch-docs-astro/src/examples/top-navigation/basic";
import UsageExample from "../../../../goldfinch-docs-astro/src/examples/top-navigation/usage";
const meta: Meta<typeof TopNavigation> = {
  title: "Components/Top Navigation",
  component: TopNavigation,
};

export default meta;
type Story = StoryObj<typeof TopNavigation>;

export const Default: Story = {
  render: () => (
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
  ),
};

export const Basic: Story = { render: () => <BasicExample /> };

export const Usage: Story = { render: () => <UsageExample /> };
