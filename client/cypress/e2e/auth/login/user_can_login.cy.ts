import { faker } from "@faker-js/faker";

describe("On Login Page", () => {
  context("with correct credentials", () => {
    it("logs in user", () => {
      const email = faker.internet.email();
      const password = "Admin1";

      cy.register(
        faker.internet.userName(),
        faker.internet.userName(),
        email,
        password,
        password,
      );

      cy.login(email, password);
      cy.contains("Logged in successfully.");
    });
  });

  describe("with incorrect credentials", () => {
    it("shows authentication error", () => {
      const email = faker.internet.email();
      const password = "Admin1";

      cy.register(
        faker.internet.userName(),
        faker.internet.userName(),
        email,
        password,
        password,
      );

      cy.login(email, "Admin12");
      cy.contains("Invalid credentials.");
    });
  });

  describe("with invalid inputs", () => {
    it("shows live validations on login try", () => {
      cy.visit("/login");

      cy.contains("Sign in").click();
      cy.contains("Email is required.");
      cy.contains("Password is required.");
      cy.login("invalid", "invalid");
      cy.contains("Please provide a valid email.");
      cy.contains(
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      );
    });
  });
});
