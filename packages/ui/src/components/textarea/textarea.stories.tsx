import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "./textarea";

const meta = {
  title: "Components/Textarea",
  component: Textarea,
  tags: ["autodocs"],
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { placeholder: "Type your message here." },
};

export const Disabled: Story = {
  args: { placeholder: "Disabled", disabled: true },
};

export const WithValue: Story = {
  args: { defaultValue: "Some pre-filled content spanning a couple lines." },
};
