import { faker } from "@faker-js/faker";

describe("Sheet Page", () => {
  context(
    "The system authenticates the user and enables them to create, read, update, and delete sheets, while also verifying their validity and pagination.",
    () => {
      const email = faker.internet.email();
      const password = "Admin1";
      const FAKER_STRING = faker.lorem.lines(500);
      let title1, title2;

      before(() => {
        cy.clearDB();
        cy.register(
          faker.lorem.word(5),
          faker.lorem.word(5),
          email,
          password,
          password,
        );

        cy.login(email, password);
        cy.contains("Logged in successfully.").should("be.visible");

        // Create first sheet
        title1 = faker.company.name();
        const description1 = faker.lorem.sentence();
        cy.createSheet(title1, description1);
        cy.contains("Sheet created successfully.").should("be.visible");

        // Create second sheet
        title2 = faker.company.name();
        const description2 = faker.lorem.sentence();
        cy.createSheet(title2, description2);
        cy.contains("Sheet created successfully.").should("be.visible");
      });

      it("performs CRUD operations on sheets", () => {
        // Validate Sheet
        cy.createSheet(" ", " ");
        cy.contains("Title is required").should("be.visible");
        cy.contains("Description is required").should("be.visible");

        cy.visit("/");
        cy.createSheet(FAKER_STRING.substring(0, 110), " ");
        cy.contains("Title can not be longer than 100 characters.").should(
          "be.visible",
        );
        cy.contains("Description is required").should("be.visible");

        // Assert that two sheets were created
        cy.visit("/");
        cy.get("table.MuiTable-root")
          .find("a.css-q7usj2")
          .should("have.length", 2);

        // Edit first sheet
        cy.editSheet("updated title", "updated description");
        cy.contains("Sheet updated successfully.").should("be.visible");

        // Delete first sheet
        cy.get('svg[data-testid="DeleteIcon"]').first().click();
        cy.contains("Yes").click();
        cy.contains("Sheet deleted successfully.").should("be.visible");
        cy.get("table.MuiTable-root")
          .find("a.css-q7usj2")
          .should("have.length", 1);

        // Add 12 more sheets
        cy.createSheetList(12);
        // Assert that 10 sheets are displayed on the first page
        cy.get("table.MuiTable-root")
          .find("a.css-q7usj2")
          .should("have.length", 10);

        // Navigate to the second page
        cy.get('[data-testid="NavigateNextIcon"]').click();
        cy.get("table.MuiTable-root")
          .find("a.css-q7usj2")
          .should("have.length", 3);

        // Navigate to the first page
        cy.get('[data-testid="NavigateBeforeIcon"]').click();
        cy.get("table.MuiTable-root")
          .find("a.css-q7usj2")
          .should("have.length", 10);
      });
    },
  );
});
