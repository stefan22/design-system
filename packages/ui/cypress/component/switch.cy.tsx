import * as React from "react";
import { Switch } from "../../src/components/switch/switch";

describe("Switch", () => {
  it("toggles from unchecked to checked on click", () => {
    cy.mount(<Switch aria-label="Toggle setting" />);
    cy.get('[role="switch"]').should("have.attr", "data-state", "unchecked");
    cy.get('[role="switch"]').click();
    cy.get('[role="switch"]').should("have.attr", "data-state", "checked");
  });
});
