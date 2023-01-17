import { beforeEach, describe, expect, it } from "@jest/globals";
import { faker } from "@faker-js/faker";

import ExpenseFactory from "../../factories/expense.factory";

const FAKER_STRING = faker.lorem.paragraphs(101);

describe("Sheet model", () => {
  describe("validation", () => {
    let expense;

    beforeEach(() => {
      expense = ExpenseFactory();
    });

    it("validate a expense to ensure it is valid", () => {
      expect(expense.validateSync()).toEqual(undefined);
    });

    it("should throw an error if the title field is empty or null", () => {
      expense.title = null;
      expect(expense.validateSync().errors.title.message).toEqual(
        "Title is required.",
      );
    });

    it("should not throw any validation error if the length of the title field is exactly 100 characters", () => {
      expense.title = FAKER_STRING.substring(0, 100);
      expect(expense.validateSync()).toEqual(undefined);
    });

    it("should not throw any validation error if the length of the title field is less than or equal to 100 characters", () => {
      expense.title = FAKER_STRING.substring(0, 20);
      expect(expense.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if the length of the title field exceeds 100 characters", () => {
      expense.title = FAKER_STRING.substring(0, 101);
      expect(expense.validateSync().errors.title.message).toEqual(
        "Title can not be longer than 100 characters.",
      );
    });

    it("should throw an error if the type field is empty or null", () => {
      expense.type = null;
      expect(expense.validateSync().errors.type.message).toEqual(
        "Type is required.",
      );
    });

    it("should not throw any validation error if the length of the type field is exactly 100 characters", () => {
      expense.type = FAKER_STRING.substring(0, 100);
      expect(expense.validateSync()).toEqual(undefined);
    });

    it("should not throw any validation error if the length of the type field is less than or equal to 100 characters", () => {
      expense.type = FAKER_STRING.substring(0, 20);
      expect(expense.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if the length of the type field exceeds 100 characters", () => {
      expense.type = FAKER_STRING.substring(0, 101);
      expect(expense.validateSync().errors.type.message).toEqual(
        "Type can not be longer than 100 characters.",
      );
    });

    it("should throw an error if the status field is empty or null", () => {
      expense.status = null;
      expect(expense.validateSync().errors.status.message).toEqual(
        "Status is required.",
      );
    });

    it("should throw an error if the status field is not 'paid' or 'unpaid'", () => {
      expense.status = "pending";
      expect(expense.validateSync().errors.status.message).toEqual(
        "`pending` is not a valid enum value for path `status`.",
      );
    });

    it("should throw an error if the amount field is empty or null", () => {
      expense.amount = null;
      expect(expense.validateSync().errors.amount.message).toEqual(
        "Amount is required.",
      );
    });

    it("should throw an error if the amount field is less than 0", () => {
      expense.amount = -1;
      expect(expense.validateSync().errors.amount.message).toEqual(
        "Must be at least 0, got -1",
      );
    });

    it("should throw an error if the amountType field is empty or null", () => {
      expense.amountType = null;
      expect(expense.validateSync().errors.amountType.message).toEqual(
        "Type is required.",
      );
    });

    it("should throw an error if the amountType field is not 'incoming' or 'outgoing'", () => {
      expense.amountType = "other";
      expect(expense.validateSync().errors.amountType.message).toEqual(
        "`other` is not a valid enum value for path `amountType`.",
      );
    });

    it("should be fine if the sheet field is empty or null", () => {
      expense.sheet = null;
      expect(expense.validateSync().errors.sheet.message).toEqual(
        "Sheet is required.",
      );
    });

    it("should be fine if the owner field is empty or null", () => {
      expense.owner = null;
      expect(expense.validateSync().errors.owner.message).toEqual(
        "User is required.",
      );
    });
  });
});
