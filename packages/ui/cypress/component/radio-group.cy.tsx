import * as React from "react";
import { RadioGroup, RadioGroupItem } from "../../src/components/radio-group/radio-group";

function RadioGroupHarness() {
  return (
    <RadioGroup defaultValue="a">
      <RadioGroupItem value="a" id="k1" data-cy="radio-a" />
      <RadioGroupItem value="b" id="k2" data-cy="radio-b" />
    </RadioGroup>
  );
}

describe("RadioGroup", () => {
  it("moves selection with Arrow keys", () => {
    cy.mount(<RadioGroupHarness />);
    cy.get('[data-cy="radio-a"]').should("have.attr", "data-state", "checked");
    cy.get('[data-cy="radio-a"]').focus();
    // Radix's roving-focus-group navigation depends on a real, trusted
    // keydown: it moves focus via a `setTimeout`-deferred call and tracks
    // "was this an arrow-key press" via a raw `document.addEventListener`
    // listener (see @radix-ui/react-roving-focus + @radix-ui/react-radio-group).
    // Cypress's `.trigger("keydown", ...)` dispatches a synthetic, untrusted
    // event that doesn't reliably drive that flow, so the assertion below
    // just times out with the selection never moving. `cy.realPress` (from
    // cypress-real-events) dispatches an actual OS-level key event via CDP,
    // which behaves like a real user keypress and Radix picks it up correctly.
    cy.realPress("ArrowDown");
    cy.get('[data-cy="radio-b"]').should("have.attr", "data-state", "checked");
  });

  it("supports selecting an item by clicking it", () => {
    cy.mount(<RadioGroupHarness />);
    cy.get('[data-cy="radio-b"]').click();
    cy.get('[data-cy="radio-b"]').should("have.attr", "data-state", "checked");
    cy.get('[data-cy="radio-a"]').should("have.attr", "data-state", "unchecked");
  });
});
