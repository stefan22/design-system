import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { RadioGroup, RadioGroupItem } from "./radio-group";
import { Label } from "../label";

const meta = {
  title: "Components/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <RadioGroup defaultValue="a" disabled>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="d1" />
        <Label htmlFor="d1">Option A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="d2" />
        <Label htmlFor="d2">Option B</Label>
      </div>
    </RadioGroup>
  ),
};

export const KeyboardSelection: Story = {
  render: () => (
    <RadioGroup defaultValue="a">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="a" id="k1" />
        <Label htmlFor="k1">Option A</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="b" id="k2" />
        <Label htmlFor="k2">Option B</Label>
      </div>
    </RadioGroup>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const radios = canvas.getAllByRole("radio");
    const [first, second] = radios;
    if (!first || !second) throw new Error("Expected two radio items");
    await expect(first).toHaveAttribute("data-state", "checked");
    first.focus();
    await userEvent.keyboard("{arrowdown}");
    await expect(second).toHaveAttribute("data-state", "checked");
  },
};
