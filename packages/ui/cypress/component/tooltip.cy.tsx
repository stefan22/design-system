import * as React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../../src/components/tooltip/tooltip";
import { Button } from "../../src/components/button/button";

function TooltipHarness() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="outline">Focus me</Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Tooltip content</p>
      </TooltipContent>
    </Tooltip>
  );
}

describe("Tooltip", () => {
  // Cypress core has no built-in real Tab-key simulation (unlike
  // Testing Library's userEvent.tab()), so this checks the same
  // underlying property the original play() function relied on -
  // that the trigger is focusable - via a direct .focus() instead.
  // A true physical Tab-navigation test would need the
  // cypress-real-events plugin.
  it("keeps the trigger focusable so the tooltip can show on focus", () => {
    cy.mount(<TooltipHarness />);
    cy.contains("button", "Focus me").focus().should("have.focus");
  });
});
