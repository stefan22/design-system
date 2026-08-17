import * as React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../src/components/select";

function SelectHarness() {
  const [value, setValue] = React.useState<string | undefined>(undefined);
  return (
    <div>
      <Select value={value} onValueChange={setValue}>
        <SelectTrigger data-cy="trigger" className="w-48">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="cherry">Cherry</SelectItem>
        </SelectContent>
      </Select>
      <p data-cy="selected-value">{value ?? "none"}</p>
    </div>
  );
}

describe("Select", () => {
  it("opens the listbox on trigger click", () => {
    cy.mount(<SelectHarness />);
    cy.get('[data-cy="trigger"]').click();
    cy.get('[role="listbox"]').should("be.visible");
    cy.get('[role="option"]').should("have.length", 3);
  });

  it("supports keyboard navigation and selection with Arrow keys + Enter", () => {
    cy.mount(<SelectHarness />);
    cy.get('[data-cy="trigger"]').click();
    cy.get('[role="listbox"]').should("be.visible");

    // Move down twice to reach "Cherry" and confirm with Enter.
    cy.focused().type("{downarrow}");
    cy.focused().type("{downarrow}");
    cy.focused().type("{enter}");

    cy.get('[role="listbox"]').should("not.exist");
    cy.get('[data-cy="selected-value"]').should("contain.text", "cherry");
    cy.get('[data-cy="trigger"]').should("contain.text", "Cherry");
  });

  it("closes the listbox on Escape without changing the selection", () => {
    cy.mount(<SelectHarness />);
    cy.get('[data-cy="trigger"]').click();
    cy.get('[role="listbox"]').should("be.visible");
    cy.focused().type("{esc}");
    cy.get('[role="listbox"]').should("not.exist");
    cy.get('[data-cy="selected-value"]').should("contain.text", "none");
  });
});
