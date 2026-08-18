import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../../src/components/dropdown-menu/dropdown-menu";
import { Button } from "../../src/components/button/button";

function DropdownMenuHarness() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Actions</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Edit</DropdownMenuItem>
        <DropdownMenuItem>Duplicate</DropdownMenuItem>
        <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

describe("DropdownMenu", () => {
  it("opens the menu on trigger click and shows its items", () => {
    cy.mount(<DropdownMenuHarness />);
    cy.get('[role="menu"]').should("not.exist");
    cy.contains("button", "Actions").click();
    cy.get('[role="menuitem"]').contains("Delete").should("be.visible");
  });
});
