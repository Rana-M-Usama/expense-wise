import { faker } from "@faker-js/faker";

describe("on Sign up Page", () => {
  context("with correct inputs", () => {
    it("registers user", () => {
      const email = faker.internet.email();
      const password = "Admin1";

      cy.register(
        faker.internet.userName(),
        faker.internet.userName(),
        email,
        password,
        password,
      );

      cy.contains("User registered successfully.");
    });
  });

  context("with incorrect inputs", () => {
    it("shows live validations on sign up try", () => {
      cy.visit("/signup");

      cy.contains("Sign Up").click();
      cy.contains("First name is required.");
      cy.contains("Last name is required.");
      cy.contains("Email is required.");
      cy.contains("Password is required.");
      cy.contains("Confirm password is required.");
      cy.register("FirstName", "LastName", "a", "a", "a");
      cy.contains("Please provide a valid email.");
      cy.contains(
        "Your password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter and one number.",
      );
      cy.contains(
        "Your confirm password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter and one number.",
      );
    });
  });
});
