import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { Input } from "../input";
import { Button } from "../button";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
});

function ProfileForm() {
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { username: "" },
  });

  function onSubmit(values: z.infer<typeof schema>) {
    void values;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-80 space-y-4">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

const meta = {
  title: "Components/Form",
  component: ProfileForm,
  tags: ["autodocs"],
} satisfies Meta<typeof ProfileForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SubmitValidationFlow: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(
      await canvas.findByText("Username must be at least 3 characters.")
    ).toBeVisible();

    await userEvent.type(canvas.getByPlaceholderText("shadcn"), "shadcn");
    await userEvent.click(canvas.getByRole("button", { name: "Submit" }));
    await expect(
      canvas.queryByText("Username must be at least 3 characters.")
    ).not.toBeInTheDocument();
  },
};
