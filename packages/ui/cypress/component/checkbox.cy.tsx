import * as React from "react";
import { Checkbox } from "../../src/components/checkbox/checkbox";

describe("Checkbox", () => {
  it("toggles from unchecked to checked on click", () => {
    cy.mount(<Checkbox aria-label="Accept terms" />);
    cy.get('[role="checkbox"]').should("have.attr", "data-state", "unchecked");
    cy.get('[role="checkbox"]').click();
    cy.get('[role="checkbox"]').should("have.attr", "data-state", "checked");
  });
});
