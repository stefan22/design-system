import * as React from "react";
import { Input } from "../../src/components/input/input";

describe("Input", () => {
  it("updates its value as the user types", () => {
    cy.mount(<Input placeholder="Type here" />);
    cy.get('input[placeholder="Type here"]')
      .type("Hello, Cypress!")
      .should("have.value", "Hello, Cypress!");
  });
});
