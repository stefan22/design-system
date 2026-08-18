import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Mail } from "lucide-react";
import { Button } from "./button";

const meta = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
    },
    size: {
      control: "select",
      options: ["default", "sm", "lg", "icon"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Button", variant: "default" },
};

export const Destructive: Story = {
  args: { children: "Delete", variant: "destructive" },
};

export const Outline: Story = {
  args: { children: "Outline", variant: "outline" },
};

export const Secondary: Story = {
  args: { children: "Secondary", variant: "secondary" },
};

export const Ghost: Story = {
  args: { children: "Ghost", variant: "ghost" },
};

export const Link: Story = {
  args: { children: "Link", variant: "link" },
};

export const Small: Story = {
  args: { children: "Small", size: "sm" },
};

export const Large: Story = {
  args: { children: "Large", size: "lg" },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Mail /> Email
      </>
    ),
  },
};

export const IconOnly: Story = {
  args: { size: "icon", "aria-label": "Send email", children: <Mail /> },
};

export const Disabled: Story = {
  args: { children: "Disabled", disabled: true },
};

// Statelessly renders each pseudo-state (rest / hover / focus-visible /
// disabled) side by side so you can eyeball them without moving a mouse.
// A real :hover can only ever apply to whatever's under the pointer *right
// now*, so a play-function that hovers each button in turn can't show them
// all at once -- instead this forces each column by applying the exact same
// utility classes the component's own hover:/focus-visible: rules use, just
// unconditionally. It's the actual CSS the browser would apply, not a mock.
const STATE_VARIANTS = [
  { variant: "default", hover: "bg-primary/90" },
  { variant: "destructive", hover: "bg-destructive/90" },
  { variant: "outline", hover: "bg-accent text-accent-foreground" },
  { variant: "secondary", hover: "bg-secondary/80" },
  { variant: "ghost", hover: "bg-accent text-accent-foreground" },
  { variant: "link", hover: "underline" },
] as const;
const FORCED_FOCUS_VISIBLE = "border-ring ring-[3px] ring-ring/50";

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <table className="text-sm">
      <thead>
        <tr className="[&>th]:px-3 [&>th]:pb-2 [&>th]:text-left [&>th]:font-medium">
          <th>Variant</th>
          <th>Rest</th>
          <th>Hover</th>
          <th>Focus-visible</th>
          <th>Disabled</th>
        </tr>
      </thead>
      <tbody>
        {STATE_VARIANTS.map(({ variant, hover }) => (
          <tr key={variant} className="[&>td]:p-3">
            <td className="capitalize">{variant}</td>
            <td>
              <Button variant={variant}>{variant}</Button>
            </td>
            <td>
              <Button variant={variant} className={hover}>
                {variant}
              </Button>
            </td>
            <td>
              <Button variant={variant} className={FORCED_FOCUS_VISIBLE}>
                {variant}
              </Button>
            </td>
            <td>
              <Button variant={variant} disabled>
                {variant}
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};

export const Clickable: Story = {
  args: { children: "Click me" },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole("button", { name: "Click me" });
    await userEvent.click(button);
    await expect(args.onClick).toHaveBeenCalledOnce();
  },
};
