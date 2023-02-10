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
