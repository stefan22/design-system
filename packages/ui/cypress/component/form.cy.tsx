import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../src/components/form";
import { Input } from "../../src/components/input";
import { Button } from "@/components/button/button";

const schema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters."),
  email: z.string().email("Enter a valid email address."),
});

type FormValues = z.infer<typeof schema>;

function FormHarness({ onSubmit }: { onSubmit: (values: FormValues) => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { username: "", email: "" },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} data-cy="demo-form">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input {...field} data-cy="username-input" />
              </FormControl>
              <FormMessage data-cy="username-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input {...field} data-cy="email-input" />
              </FormControl>
              <FormMessage data-cy="email-error" />
            </FormItem>
          )}
        />
        <Button type="submit" data-cy="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

describe("Form (react-hook-form + zod)", () => {
  it("shows validation errors when submitted empty", () => {
    const onSubmit = cy.stub().as("onSubmit");
    cy.mount(<FormHarness onSubmit={onSubmit} />);
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="username-error"]').should(
      "contain.text",
      "at least 3 characters"
    );
    cy.get('[data-cy="email-error"]').should(
      "contain.text",
      "valid email address"
    );
    cy.get("@onSubmit").should("not.have.been.called");
  });

  it("clears field error once corrected and submits with valid data", () => {
    const onSubmit = cy.stub().as("onSubmit");
    cy.mount(<FormHarness onSubmit={onSubmit} />);
    cy.get('[data-cy="submit"]').click();
    cy.get('[data-cy="username-error"]').should("be.visible");

    cy.get('[data-cy="username-input"]').type("alice");
    cy.get('[data-cy="email-input"]').type("alice@example.com");
    cy.get('[data-cy="submit"]').click();

    cy.get('[data-cy="username-error"]').should("not.exist");
    cy.get('[data-cy="email-error"]').should("not.exist");
    cy.get("@onSubmit").should("have.been.calledOnce");
  });
});
