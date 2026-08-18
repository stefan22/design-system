import * as React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../src/components/tabs/tabs";

function TabsHarness() {
  return (
    <Tabs defaultValue="tab1" className="w-80">
      <TabsList>
        <TabsTrigger value="tab1">Tab 1</TabsTrigger>
        <TabsTrigger value="tab2">Tab 2</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">Content for tab one.</TabsContent>
      <TabsContent value="tab2">Content for tab two.</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("switches panels when a different tab is clicked", () => {
    cy.mount(<TabsHarness />);
    cy.contains("Content for tab one.").should("be.visible");
    cy.contains('[role="tab"]', "Tab 2").click();
    cy.contains("Content for tab two.").should("be.visible");
  });
});
