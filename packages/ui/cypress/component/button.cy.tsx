import * as React from "react";
import { Button } from "../../src/components/button/button";

describe("Button", () => {
  it("calls onClick when clicked", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(<Button onClick={onClick}>Click me</Button>);
    cy.contains("button", "Click me").click();
    cy.get("@onClick").should("have.been.calledOnce");
  });

  it("does not call onClick when disabled", () => {
    const onClick = cy.stub().as("onClick");
    cy.mount(
      <Button onClick={onClick} disabled>
        Click me
      </Button>
    );
    cy.contains("button", "Click me").should("be.disabled");
    cy.get("@onClick").should("not.have.been.called");
  });
});
