describe("Visiting Sign Up Page", () => {
  before(() => {
    cy.clearDB();
  });

  it("renders sign up page", () => {
    cy.visit("/signup");
    cy.contains("Sign Up").should("be.visible");
  });

  context("User can click on sign up link", () => {
    it("takes to sign up user page", () => {
      cy.visit("/signup");
      cy.contains("Already have an account? Sign in").click();
      cy.location("pathname").should("eq", "/");
    });
  });
});
