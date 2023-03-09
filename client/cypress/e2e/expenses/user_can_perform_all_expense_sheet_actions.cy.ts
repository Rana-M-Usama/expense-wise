import { faker } from "@faker-js/faker";

describe("Expense Page", () => {
  context(
    "The system authenticates the user and enables them to create, read, update, and delete expenses, while also verifying their validity and pagination.",
    () => {
      const email = faker.internet.email();
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

        cy.login(email, password);
        cy.contains("Logged in successfully.");

        // Create first sheet
        cy.createSheet(title, faker.lorem.sentence());
        cy.contains("Sheet created successfully.");
      });

      it("performs CRUD operations on sheet expenses", () => {
        // Open a sheet
        cy.get('svg[data-testid="VisibilityIcon"]').click();
        cy.url().should("include", "/sheets");
        cy.url().should("include", "/expenses");
        cy.contains(title).should("be.visible");
        cy.contains("Title").should("be.visible");
        cy.contains("Type").should("be.visible");
        cy.contains("IN/OUT").should("be.visible");
        cy.contains("Status").should("be.visible");
        cy.contains("Amount").should("be.visible");
        cy.contains("Action").should("be.visible");
        cy.contains("Total Incoming:").should("be.visible");
        cy.contains("Received:").should("be.visible");
        cy.contains("Remaining:").should("be.visible");
        cy.contains("Total Outgoing:").should("be.visible");
        cy.contains("Spent:").should("be.visible");
        cy.contains("Debt:").should("be.visible");
        cy.contains("Current Sheet Balance:").should("be.visible");

        // Check expenses count
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .should("have.length", 2);
        cy.contains("No Expense to Show").should("be.visible");

        //add expense to sheet
        const amount = faker.finance.amount();
        cy.createExpense(
          faker.company.name(),
          faker.animal.type(),
          amount,
          "paid",
          "incoming",
        );

        // Check expense changes
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .should("have.length", 2);
        cy.contains("Total Incoming:").should("be.visible");
        cy.contains(amount).should("be.visible");
        cy.contains("Received:").should("be.visible");
        cy.contains(amount).should("be.visible");
        cy.contains("Remaining:").should("be.visible");
        cy.contains(amount).should("be.visible");
        cy.contains("Total Outgoing:").should("be.visible");
        cy.contains(amount).should("be.visible");
        cy.contains("Spent:").should("be.visible");
        cy.contains(amount).should("be.visible");
        cy.contains("Debt:").should("be.visible");
        cy.contains(amount).should("be.visible");
        cy.contains("Current Sheet Balance:").should("be.visible");
        cy.contains(amount).should("be.visible");

        //edit first expense
        cy.editExpense(
          "updated Expense",
          "Birthday",
          "10",
          "unpaid",
          "incoming",
        );

        // Check expense changes
        cy.contains("Expense updated successfully.").should("be.visible");
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .should("have.length", 2);
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .contains("updated Expense")
          .should("be.visible");
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .contains("Birthday")
          .should("be.visible");
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .contains("10")
          .should("be.visible");
        cy.contains("Total Incoming:").should("be.visible");
        cy.contains("10").should("be.visible");
        cy.contains("Received:").should("be.visible");
        cy.contains("10").should("be.visible");
        cy.contains("Total Outgoing:").should("be.visible");
        cy.contains("10").should("be.visible");
        cy.contains("Spent:").should("be.visible");
        cy.contains("10").should("be.visible");
        cy.contains("Remaining:").should("be.visible");
        cy.contains("10").should("be.visible");
        cy.contains("Debt:").should("be.visible");
        cy.contains("10").should("be.visible");
        cy.contains("Current Sheet Balance:").should("be.visible");
        cy.contains("10").should("be.visible");

        //delete first expense
        cy.get('svg[data-testid="DeleteIcon"]').first().click();
        cy.contains("Yes").click();
        cy.contains("Expense deleted successfully.").should("be.visible");

        // Check expense changes
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .should("have.length", 2);

        // Add 12 more expenses to sheet
        cy.createExpenseList(4, "120", "unpaid", "incoming");
        cy.createExpenseList(4, "150", "paid", "incoming");
        cy.createExpenseList(4, "110", "paid", "outgoing");
        cy.createExpenseList(4, "10", "unpaid", "outgoing");

        // Assert that 11 expenses are displayed on the first page
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .should("have.length", 12);
        cy.contains("Total Incoming:").should("be.visible");
        cy.contains("1080").should("be.visible");
        cy.contains("Received:").should("be.visible");
        cy.contains("600").should("be.visible");
        cy.contains("Remaining:").should("be.visible");
        cy.contains("480").should("be.visible");
        cy.contains("Total Outgoing:").should("be.visible");
        cy.contains("480").should("be.visible");
        cy.contains("Spent:").should("be.visible");
        cy.contains("440").should("be.visible");
        cy.contains("Debt:").should("be.visible");
        cy.contains("40").should("be.visible");
        cy.contains("Current Sheet Balance:").should("be.visible");
        cy.contains("160").should("be.visible");

        // Navigate to the second page
        cy.get('[data-testid="NavigateNextIcon"]').click();
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .should("have.length", 6);
        cy.contains("Total Incoming:").should("be.visible");
        cy.contains("1080").should("be.visible");
        cy.contains("Received:").should("be.visible");
        cy.contains("600").should("be.visible");
        cy.contains("Remaining:").should("be.visible");
        cy.contains("480").should("be.visible");
        cy.contains("Total Outgoing:").should("be.visible");
        cy.contains("480").should("be.visible");
        cy.contains("Spent:").should("be.visible");
        cy.contains("440").should("be.visible");
        cy.contains("Debt:").should("be.visible");
        cy.contains("40").should("be.visible");
        cy.contains("Current Sheet Balance:").should("be.visible");
        cy.contains("160").should("be.visible");

        // Navigate to the first page
        cy.get('[data-testid="NavigateBeforeIcon"]').click();
        cy.get("table.MuiTable-root")
          .find("tr.MuiTableRow-root")
          .should("have.length", 12);
      });
    },
  );
});
