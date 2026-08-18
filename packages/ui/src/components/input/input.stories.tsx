import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Input } from "./input";

const meta = {
  title: "Components/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "file"],
    },
    disabled: { control: "boolean" },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Email", type: "email" },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true },
};

export const WithValue: Story = {
  args: { defaultValue: "Hello world" },
};

export const File: Story = {
  args: { type: "file" },
};

export const TypingInteraction: Story = {
  args: { placeholder: "Type here" },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByPlaceholderText("Type here");
    await userEvent.type(input, "Hello, Storybook!");
    await expect(input).toHaveValue("Hello, Storybook!");
  },
};
