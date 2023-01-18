import { beforeEach, describe, expect, it } from "@jest/globals";
import { faker } from "@faker-js/faker";

import SheetFactory from "../../factories/sheet.factory";

const FAKER_STRING =
  "abcasjdajadnjajnd7beP8QCNXLswWmtj1IcmKatpIHNzWtCMSofKce8up2bD2HoqiuUCjypJDu1QFdsdMmVfLlopuxUIWL83QBvHBIPoJrnl0bYVwrpyOLuq2c7gnwFVnU4z3HheVU3ZSabEv0gWZff9K0xwgGfJDxQHgnfhLBxC4ob5YOXM4wNmmlqjbfGJPpoPhoawzHTuMbIKjcLN1hkn6JVizy1webPzoKIiXa2FymMNvlWhCf62gXwVAq2aKW1yzM15xQdfhxyZbSbC3qO8uEs9ejDMUzX2yOkfXm0nLI5hjmeitMma91jGTrazzykjSwW2VYCdqZGW10x8yLqXH3GEpVLoo5qKTVwYtwmyLM3AQ6obxyNBgDEs9oUyuKjZIj7hon171308TwPyBYfgbhXbSuby9MDSL4doVZ5lihRmv0ZK93Tk9ol06dMK2mNfCz4FQuQnxNQ6E6wBIxuW53PiTYDGU8qALB7E5Fm4skMCssQXvzEgR8foSrzDC44FcJLUAqFnUjPZYRGPcoY0XlkGYqLHJvvKmR92YkNydj2LceVMcENAMeQR2KwPY2LUbaikzMZEzNXWZykTBBRUXMNPuHDZMUOktHMlEt0ImsI5ImUHVPu0svJCHFkiBTnWlXvfcw2MFKYNRnqRx1PIwJsvxxfsCMMSdtMAHF8XwZZfj7iMN4G7QhIsQ2SjLqNkoTqqI7OmePhHnuQyGOJKUAyapVikm8d9DJzt2KUJcVcKWh2nk6LXvTO1awFFpmhK1ulvcdLzVbTNVbRtrizb7GLz69Kgq8oVcDJk6WaPLQmIFtfZfE4zLanWEOF7MWmScijZJN8nIfrmM4sJavTCHRFXH3Zij2dsDRgpDd9frPXJsZYT0Tdymrq95QgWulUTmcD96FP5rFCcCWJ4MLhfXacRDujtsUZdmO7hkIl2JkOpbSrHc4EGnkyaWnyiqd1xlsiyTZKYwMHaboS2XYVW2L7KbpkqobdPJ6ZEgeubdI7V9ZRmeK5A";

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
      sheet.title = FAKER_STRING.substring(0, 101);
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
      sheet.description = FAKER_STRING.substring(0, 1001);
      expect(sheet.validateSync().errors.description.message).toEqual(
        "Description can not be longer than 1000 characters.",
      );
    });
  });
});
