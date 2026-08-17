import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Checkbox } from "./checkbox";
import { Label } from "./label";

const meta = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

export const Checked: Story = {
  args: { defaultChecked: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const WithLabel: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="marketing" />
      <Label htmlFor="marketing">Send me marketing emails</Label>
    </div>
  ),
};

export const ToggleInteraction: Story = {
  args: { "aria-label": "Accept terms" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toHaveAttribute("data-state", "unchecked");
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("data-state", "checked");
  },
};
