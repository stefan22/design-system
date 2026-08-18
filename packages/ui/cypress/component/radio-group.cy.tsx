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
    cy.focused().type("{downarrow}");
    cy.get('[data-cy="radio-b"]').should("have.attr", "data-state", "checked");
  });

  it("supports selecting an item by clicking it", () => {
    cy.mount(<RadioGroupHarness />);
    cy.get('[data-cy="radio-b"]').click();
    cy.get('[data-cy="radio-b"]').should("have.attr", "data-state", "checked");
    cy.get('[data-cy="radio-a"]').should("have.attr", "data-state", "unchecked");
  });
});
