import { beforeEach, describe, expect, it } from "@jest/globals";
import { faker } from "@faker-js/faker";

import UserFactory from "../../factories/user.factory";

const FAKER_STRING = faker.lorem.lines(101);

describe("User model", () => {
  describe("validation", () => {
    let user;

    beforeEach(() => {
      user = UserFactory();
    });

    it("should correctly validate a valid user", () => {
      expect(user.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if email is null", () => {
      user.email = null;
      expect(user.validateSync().errors.email.message).toEqual(
        "Email is required.",
      );
    });

    it("should throw a validation error if email is invalid", () => {
      user.email = "invalidEmail";
      expect(user.validateSync().errors.email.message).toEqual(
        "Please provide a valid email.",
      );
    });

    it("should throw a validation error if password is blank", () => {
      user.password = null;
      expect(user.validateSync().errors.password.message).toEqual(
        "Password is required.",
      );
    });

    it("should throw a validation error if password is invalid", () => {
      user.password = "invalid";
      expect(user.validateSync().errors.password.message).toEqual(
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      );
    });

    it("should throw a validation error if firstName is blank", () => {
      user.firstName = null;
      expect(user.validateSync().errors.firstName.message).toEqual(
        "First name is required.",
      );
    });

    it("should be fine if the length of firstName is less than or equal 50", () => {
      user.firstName = faker.lorem.word(5);
      expect(user.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if the length of the firstName exceeds 50", () => {
      user.firstName = FAKER_STRING.substring(0, 100);
      expect(user.validateSync().errors.firstName.message).toEqual(
        "First name can not be longer than 50 characters.",
      );
    });

    it("should throw a validation error if firstName contains other than alphabets", () => {
      user.firstName = FAKER_STRING.substring(0, 20).concat(",");
      expect(user.validateSync().errors.firstName.message).toEqual(
        "First name can only contain alphabets.",
      );
    });

    it("should throw a validation error if lastName is blank", () => {
      user.lastName = null;
      expect(user.validateSync().errors.lastName.message).toEqual(
        "Last name is required.",
      );
    });

    it("should be fine if the length of lastName is less than or equal 50", () => {
      user.lastName = faker.lorem.word(5);
      expect(user.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if the length of lastName exceeds 50", () => {
      user.lastName = FAKER_STRING.substring(0, 100);
      expect(user.validateSync().errors.lastName.message).toEqual(
        "Last name can not be longer than 50 characters.",
      );
    });

    it("should throw a validation error if lastName contains other than alphabets", () => {
      user.lastName = FAKER_STRING.substring(0, 20).concat(",");
      expect(user.validateSync().errors.lastName.message).toEqual(
        "Last name can only contain alphabets.",
      );
    });

    it("should be fine if imageUrl is blank", () => {
      user.imageUrl = null;
      expect(user.validateSync()).toEqual(undefined);
    });
  });
});
