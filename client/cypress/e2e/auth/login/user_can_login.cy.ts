import { faker } from "@faker-js/faker";

describe("On Login Page", () => {
  before(() => {
    cy.clearDB();
  });

  context("with correct credentials", () => {
    it("logs in user", () => {
      const email = faker.internet.email();
      const password = "Admin1";

      cy.register(
        faker.lorem.word(5),
        faker.lorem.word(5),
        email,
        password,
        password,
      );

      cy.login(email, password);
      cy.contains("Logged in successfully.").should("be.visible");
    });
  });

  describe("with incorrect credentials", () => {
    it("shows authentication error", () => {
      const email = faker.internet.email();
      const password = "Admin1";

      cy.register(
        faker.lorem.word(5),
        faker.lorem.word(5),
        email,
        password,
        password,
      );

      cy.login(email, "Admin12");
      cy.contains("Invalid credentials.").should("be.visible");
    });
  });

  describe("with invalid inputs", () => {
    it("shows live validations on login try", () => {
      cy.visit("/login");

      cy.contains("Sign in").click();
      cy.contains("Email is required.").should("be.visible");
      cy.contains("Password is required.").should("be.visible");
      cy.login("invalid", "invalid");
      cy.contains("Please provide a valid email.");
      cy.contains("Invalid password.");
    });
  });
});
