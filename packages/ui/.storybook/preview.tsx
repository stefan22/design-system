import type { Preview } from "@storybook/react-vite";
import React from "react";
import "../src/styles/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0a0a0a" },
      ],
    },
  },
  decorators: [
    (Story, context) => {
      const isDark = context.globals.backgrounds?.value === "#0a0a0a";
      return (
        <div className={isDark ? "dark" : ""}>
          <div className="bg-background p-4 text-foreground">
            <Story />
          </div>
        </div>
      );
    },
  ],
  tags: ["autodocs"],
};

export default preview;
