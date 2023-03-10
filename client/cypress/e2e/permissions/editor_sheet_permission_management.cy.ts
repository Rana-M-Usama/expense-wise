import { faker } from "@faker-js/faker";

describe("Permissions Management with admin", () => {
  context(
    "The system authenticates the user and enables them to create, read, update, and delete sheet permissions, while also verifying their validity.",
    () => {
      const email = faker.internet.email();
      const duplicateEmail = faker.internet.email();
      const duplicateEmail1 = faker.internet.email();
      const password = "Admin1*";
      const title = faker.company.name();

      before(() => {
        cy.clearDB();
        cy.register(
          faker.lorem.word(5),
          faker.lorem.word(5),
          email,
          password,
          password,
        );
        cy.register(
          faker.lorem.word(5),
          faker.lorem.word(5),
          duplicateEmail,
          password,
          password,
        );
        cy.register(
          faker.lorem.word(5),
          faker.lorem.word(5),
          duplicateEmail1,
          password,
          password,
        );

        cy.login(email, password);
        cy.contains("Logged in successfully.");

        cy.createSheet(title, faker.lorem.sentence());
        cy.contains("Sheet created successfully.");

        cy.get('svg[data-testid="VisibilityIcon"]').click();
        cy.url().should("include", "/sheets");
        cy.url().should("include", "/expenses");

        cy.createExpenseList(1, "120", "unpaid", "incoming");
      });

      it("perform permission operations on sheets", () => {
        // Open permissions page
        cy.get('svg[data-testid="MoreVertIcon"]').click();
        cy.contains("Sheet Permissions").click();
        cy.url().should("include", "/sheets");
        cy.url().should("include", "/permissions");
        cy.contains(`Permissions for ${title}`).should("be.visible");
        cy.contains("Permission Type").should("be.visible");
        cy.contains("User").should("be.visible");
        cy.contains("Action").should("be.visible");
        cy.contains("admin").should("be.visible");
        cy.contains(email).should("be.visible");
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .should("have.length", 2);

        // Validate Permission
        cy.createPermission(" ", "view");
        cy.contains("Email is required.").should("be.visible");

        cy.get('svg[data-testid="CloseOutlinedIcon"]').click();
        cy.createPermission("invalid", "view");
        cy.contains("Please provide a valid email.").should("be.visible");

        // Attempt to grant permission to a non-existent email address
        cy.get('svg[data-testid="CloseOutlinedIcon"]').click();
        cy.createPermission("invalid@email.com", "view");
        cy.contains(
          "User not found with this email: invalid@email.com.",
        ).should("be.visible");

        // createPermissions
        cy.get('svg[data-testid="CloseOutlinedIcon"]').click();
        cy.createPermission(duplicateEmail, "edit");
        cy.contains("Permission created successfully.");
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .should("have.length", 3);
        cy.logout();

        //verifyPermission
        cy.login(duplicateEmail, password);
        cy.contains("Logged in successfully.");
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .parent()
          .parent()
          .within(() => {
            cy.get('svg[data-testid="VisibilityIcon"]').should("be.visible");
            cy.get('svg[data-testid="EditIcon"]').should("be.visible");
            cy.get('svg[data-testid="DeleteIcon"]')
              .parent()
              .should("have.attr", "disabled");
            cy.get('svg[data-testid="VisibilityIcon"]').click();
          });
        cy.url().should("include", "/sheets");
        cy.url().should("include", "/expenses");

        //add expense to permitted sheet
        cy.createExpense(
          faker.company.name(),
          faker.animal.type(),
          faker.finance.amount(),
          "paid",
          "incoming",
        );

        //edit first expense
        cy.editExpense(
          "updated Expense",
          "Birthday",
          "10",
          "unpaid",
          "incoming",
        );

        //delete first expense
        cy.get('svg[data-testid="DeleteIcon"]').first().click();
        cy.contains("Yes").click();
        cy.contains("Expense deleted successfully.").should("be.visible");

        // Move to permissions page
        cy.get('svg[data-testid="MoreVertIcon"]').click();
        cy.contains("Sheet Permissions").click();
        cy.url().should("include", "/sheets");
        cy.url().should("include", "/permissions");

        // authorized editor has the ability to assign only view and edit permission to users.
        cy.contains("Add Permission").click();
        cy.get("#permissionType").click();
        cy.get("[data-value=admin").should("not.exist");
        cy.get('svg[data-testid="CloseOutlinedIcon"]').click({ force: true });
        cy.createPermission(duplicateEmail1, "edit");
        cy.contains("Permission created successfully.");
        cy.createPermission(duplicateEmail1, "view");
        cy.contains("Permission with this email already created.");

        // editor unable to delete and edit permissions
        cy.get('svg[data-testid="DeleteIcon"]').should("not.exist");
        cy.get('svg[data-testid="EditIcon"]').should("not.exist");
      });
    },
  );
});
