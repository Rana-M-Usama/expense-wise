/* eslint-disable no-unused-vars */
/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    clearDB(): Chainable<any>;
  }

  interface Chainable<Subject = any> {
    login(email: string, password: string): Chainable<any>;
  }

  interface Chainable<Subject = any> {
    register(
      firstName: string,
      lastName: string,
      email: string,
      password: string,
      confirmPassword: string,
    ): Chainable<any>;
  }
}
