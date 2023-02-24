import { faker } from "@faker-js/faker";

describe("on Sign up Page", () => {
  before(() => {
    cy.clearDB();
  });

  context("with correct inputs", () => {
    it("registers user", () => {
      const email = faker.internet.email();
      const password = "Admin1";

      cy.register(
        faker.lorem.word(5),
        faker.lorem.word(5),
        email,
        password,
        password,
      );

      cy.contains(
        "You're registered! Check your email to activate your account.",
      ).should("be.visible");
    });
  });

  context("with incorrect inputs", () => {
    it("shows live validations on sign up try", () => {
      cy.visit("/signup");

      cy.contains("Sign Up").click();
      cy.contains("First name is required.").should("be.visible");
      cy.contains("Last name is required.").should("be.visible");
      cy.contains("Email is required.").should("be.visible");
      cy.contains("Password is required.").should("be.visible");
      cy.contains("Confirm password is required.").should("be.visible");
      cy.register("FirstName", "LastName", "a", "a", "a");
      cy.contains("Please provide a valid email.").should("be.visible");
      cy.contains(
        "Your password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter and one number.",
      ).should("be.visible");
      cy.contains(
        "Your password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter and one number.",
      ).should("be.visible");
      cy.register("FirstName", "LastName", "a", "admin123*", "a");
      cy.contains("Please provide a valid email.");
      cy.contains("Confirm password does not matches with password.");
      cy.register("FirstName", "LastName", "a", "Admin123*", "a");
      cy.contains("Please provide a valid email.");
      cy.contains("Confirm password does not matches with password.");
    });
  });
});
