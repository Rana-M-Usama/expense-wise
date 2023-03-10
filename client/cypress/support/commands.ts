/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
import axios from "axios";
import { faker } from "@faker-js/faker";

Cypress.Commands.add("clearDB", async () => {
  const url = Cypress.env("serverUrl") + Cypress.env("clearTestDbEndpoint");
  const config = {
    headers: { Authorization: `Bearer ${Cypress.env("DEVELOPER_TOKEN")}` },
  };

  try {
    await axios.get(url, config);
  } catch (error) {
    Cypress.log({
      name: "clearDB",
      message: `Failed to clear test database: ${error.message}`,
      consoleProps: () => ({ error }),
    });
  }
});

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/");
  cy.contains("Sign in with Google").should("be.visible");
  cy.get("input[name='email']").type(email);
  cy.get("input[name='password']").type(password);
  cy.contains("Sign in").click();
});

Cypress.Commands.add("logout", () => {
  cy.get(".MuiStack-root .MuiAvatar-root").click({ force: true });
  cy.contains("Logout").click({ force: true });
  cy.contains("Successfully logged out.");
});

Cypress.Commands.add(
  "register",
  (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
  ) => {
    cy.visit("/signup");
    cy.contains("Sign in with Google").should("be.visible");
    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='lastName']").type(lastName);
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("input[name='confirmPassword']").type(confirmPassword);
    cy.contains("Sign Up").click();
  },
);

Cypress.Commands.add("createSheet", (title: string, description: string) => {
  cy.contains("Add new Sheet").click();
  cy.get("input[name='title']").type(title);
  cy.get("input[name='description']").type(description);
  cy.contains("Add Sheet").click();
});

Cypress.Commands.add("editSheet", (title: string, description: string) => {
  cy.get('svg[data-testid="EditIcon"]').first().click();
  cy.get("input[name='title']").clear().type(title);
  cy.get("input[name='description']").clear().type(description);
  cy.contains("Update Sheet").click();
});

Cypress.Commands.add("createSheetList", (length: number) => {
  for (let i = 0; i < length; i++) {
    cy.createSheet(faker.company.name(), faker.lorem.sentence());
    cy.contains("Sheet created successfully.");
  }
});

Cypress.Commands.add(
  "createExpense",
  (
    title: string,
    type: string,
    amount: string,
    status: string,
    amountType: string,
  ) => {
    cy.contains("Add expense").click();
    cy.get("input[name='title']").type(title);
    cy.get("input[name='type']").type(type);
    cy.get("input[name='amount']").type(amount);
    cy.get("#status").click();
    cy.get(`[data-value=${status}]`).click();
    cy.get("#amountType").click();
    cy.get(`[data-value=${amountType}]`).click();

    cy.contains("Add Expense").click();
  },
);

Cypress.Commands.add(
  "editExpense",
  (
    title: string,
    type: string,
    amount: string,
    status: string,
    amountType: string,
  ) => {
    cy.get('svg[data-testid="EditIcon"]').first().click();
    cy.get("input[name='title']").clear().type(title);
    cy.get("input[name='type']").clear().type(type);
    cy.get("input[name='amount']").clear().type(amount);
    cy.get("#status").click();
    cy.get(`[data-value=${status}]`).click();
    cy.get("#amountType").click();
    cy.get(`[data-value=${amountType}]`).click();

    cy.contains("Update Expense").click();
  },
);

Cypress.Commands.add(
  "createExpenseList",
  (length: number, amount: string, status: string, amountType: string) => {
    for (let i = 0; i < length; i++) {
      cy.createExpense(
        faker.company.name(),
        faker.animal.type(),
        amount,
        status,
        amountType,
      );
      cy.contains("Expense created successfully.");
    }
  },
);

Cypress.Commands.add(
  "createPermission",
  (email: string, permissionType: string) => {
    cy.contains("Add Permission").click();
    cy.get("input[name='email']").type(email);
    cy.get("#permissionType").click();
    cy.get(`[data-value=${permissionType}]`).click();
    cy.get("button[type='submit']").contains("Add Permission").click();
  },
);

Cypress.Commands.add(
  "editPermission",
  (email: string, permissionType: string) => {
    cy.get('svg[data-testid="EditIcon"]').last().click();
    cy.get("input[name='email']").clear().type(email);
    cy.get("#permissionType").click();
    cy.get(`[data-value=${permissionType}]`).click();
    cy.get("button[type='submit']").contains("Update Permission").click();
  },
);
