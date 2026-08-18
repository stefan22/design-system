import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Card, CardContent, CardHeader, CardTitle } from "../card";

const meta = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="account" className="w-80">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">
        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Make changes to your account here.
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="password">
        <Card>
          <CardHeader>
            <CardTitle>Password</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Change your password here.
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  ),
};

export const SwitchesPanels: Story = {
  render: () => (
    <Tabs defaultValue="tab1" className="w-80">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for tab one.</TabsContent>
      <TabsContent value="tab2">Content for tab two.</TabsContent>
    </Tabs>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Content for tab one.")).toBeVisible();
    await userEvent.click(canvas.getByRole("tab", { name: "Tab 2" }));
    await expect(canvas.getByText("Content for tab two.")).toBeVisible();
  },
};
