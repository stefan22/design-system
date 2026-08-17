import * as React from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../src/components/dialog";
import { Button } from "../../src/components/button";

function DialogHarness() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open dialog</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here.
          </DialogDescription>
        </DialogHeader>
        <input data-cy="first-field" placeholder="Name" />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" data-cy="cancel">
              Cancel
            </Button>
          </DialogClose>
          <Button data-cy="save">Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

describe("Dialog", () => {
  it("is closed by default and opens on trigger click", () => {
    cy.mount(<DialogHarness />);
    cy.get('[role="dialog"]').should("not.exist");
    cy.contains("button", "Open dialog").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.contains("Edit profile").should("be.visible");
  });

  it("moves focus inside the dialog when opened (focus trap entry)", () => {
    cy.mount(<DialogHarness />);
    cy.contains("button", "Open dialog").click();
    cy.get('[role="dialog"]').should("be.visible");
    // Radix Dialog auto-focuses the content container (or first focusable
    // element) once open, keeping focus scoped inside the dialog.
    cy.focused().should(($el) => {
      expect($el.closest('[role="dialog"]').length).to.eq(1);
    });
  });

  it("closes on cancel button and on Escape key", () => {
    cy.mount(<DialogHarness />);
    cy.contains("button", "Open dialog").click();
    cy.get('[data-cy="cancel"]').click();
    cy.get('[role="dialog"]').should("not.exist");

    cy.contains("button", "Open dialog").click();
    cy.get('[role="dialog"]').should("be.visible");
    cy.get("body").type("{esc}");
    cy.get('[role="dialog"]').should("not.exist");
  });
});
