describe("Visiting Login Page", () => {
  it("renders login page", () => {
    cy.visit("/");
    cy.contains("Sign in");
  });

  context("User can click on forgot password link", () => {
    it("shows forgot password modal", () => {
      cy.visit("/");
      cy.contains("Forgot password?").click();

      cy.contains("Forgot Password?");
      cy.contains("You can reset your password here");
      cy.get("input[name='email']");
      cy.contains("Send My Password");
      cy.get("button[type='submit']");

      cy.get("button[type='button']")
        .get("svg[data-testid='CloseOutlinedIcon']")
        .click();
      cy.get("button[type='button']").should("not.exist");
    });
  });

  context("User can click on sign up link", () => {
    it("takes to sign up user page", () => {
      cy.visit("/");
      cy.contains("Don't have an account? Sign Up").click();
      cy.location("pathname").should("eq", "/signup");
    });
  });
});
