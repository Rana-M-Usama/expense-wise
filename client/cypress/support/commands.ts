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
import { faker } from "@faker-js/faker";

Cypress.Commands.add("login", (email: string, password: string) => {
  cy.visit("/");
  cy.get("input[name='email']").type(email);
  cy.get("input[name='password']").type(password);
  cy.contains("Sign in").click();
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
    cy.get("input[name='firstName']").type(firstName);
    cy.get("input[name='lastName']").type(lastName);
    cy.get("input[name='email']").type(email);
    cy.get("input[name='password']").type(password);
    cy.get("input[name='confirmPassword']").type(confirmPassword);
    cy.contains("Sign Up").click();
  },
);

Cypress.Commands.add("createSheet", (title: string, description: string) => {
  cy.get('svg[data-testid="AddCircleRoundedIcon"]').click();
  cy.get("input[name='title']").type(title);
  cy.get("input[name='description']").type(description);
  cy.contains("Add Sheet").click();
});

Cypress.Commands.add(
  "editSheet",
  (updatedTitle: string, updatedDescription: string) => {
    cy.get('svg[data-testid="EditIcon"]').first().click();
    cy.get("input[name='title']").clear().type(updatedTitle);
    cy.get("input[name='description']").clear().type(updatedDescription);
    cy.contains("Update Sheet").click();
  },
);

Cypress.Commands.add("createSheetList", (length: number) => {
  for (let i = 0; i < length; i++) {
    cy.createSheet(faker.company.name(), faker.lorem.sentence());
    cy.contains("Sheet created successfully.");
  }
});
