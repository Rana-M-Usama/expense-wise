import { beforeEach, describe, expect, it } from "@jest/globals";
import { faker } from "@faker-js/faker";

import { SheetFactory } from "../../factories/sheet.factory";

const FAKER_STRING = faker.lorem.lines(1500);

describe("Sheet model", () => {
  describe("validation", () => {
    let sheet;

    beforeEach(() => {
      sheet = SheetFactory();
    });

    it("validate a sheet to ensure it is valid", () => {
      expect(sheet.validateSync()).toEqual(undefined);
    });

    it("should throw an error if the title field is empty or null", () => {
      sheet.title = null;
      expect(sheet.validateSync().errors.title.message).toEqual(
        "Title is required.",
      );
    });

    it("should not throw any validation error if the length of the title field is exactly 100 characters", () => {
      sheet.title = FAKER_STRING.substring(0, 100);
      expect(sheet.validateSync()).toEqual(undefined);
    });

    it("should not throw any validation error if the length of the title field is less than or equal to 100 characters", () => {
      sheet.title = FAKER_STRING.substring(0, 20);
      expect(sheet.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if the length of the title field exceeds 100 characters", () => {
      sheet.title = FAKER_STRING.substring(0, 150);
      expect(sheet.validateSync().errors.title.message).toEqual(
        "Title can not be longer than 100 characters.",
      );
    });

    it("should be fine if the description field is empty or null", () => {
      sheet.description = null;
      expect(sheet.validateSync()).toEqual(undefined);
    });

    it("should not throw any validation error if the length of the description field is exactly 1000 characters", () => {
      sheet.description = FAKER_STRING.substring(0, 1000);
      expect(sheet.validateSync()).toEqual(undefined);
    });

    it("should not throw any validation error if the length of the description field is less than or equal to 1000 characters", () => {
      sheet.description = FAKER_STRING.substring(0, 20);
      expect(sheet.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if the length of the description field exceeds 1000 characters", () => {
      sheet.description = FAKER_STRING.substring(0, 1500);
      expect(sheet.validateSync().errors.description.message).toEqual(
        "Description can not be longer than 1000 characters.",
      );
    });
  });
});
