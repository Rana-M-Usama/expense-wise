import { beforeEach, describe, expect, it } from "@jest/globals";

import UserFactory from "../../factories/user.factory";

const FAKER_STRING =
  "RAI6hQ4lPq5HaS5JtK5A7LkLyLXruu9Z3No8y13oPfd9axC9gLJz4YZVnMDQkhZ9BPHp78khxUbEXqmoyE8mLdQrfGvrcOXmhct5cdA34jdAPsNcdLZIBnf4r1z8xbQphLE9xcKNXkhNa51It2eDwh";

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

    it("should be fine if the length of firstName is exact 50", () => {
      user.firstName = FAKER_STRING.substring(0, 50);
      expect(user.validateSync()).toEqual(undefined);
    });

    it("should be fine if the length of firstName is less than or equal 50", () => {
      user.firstName = FAKER_STRING.substring(0, 20);
      expect(user.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if the length of the firstName exceeds 50", () => {
      user.firstName = FAKER_STRING.substring(0, 51);
      expect(user.validateSync().errors.firstName.message).toEqual(
        "First name can not be longer than 50 characters.",
      );
    });

    it("should throw a validation error if lastName is blank", () => {
      user.lastName = null;
      expect(user.validateSync().errors.lastName.message).toEqual(
        "Last name is required.",
      );
    });

    it("should be fine if the length of lastName is exact 50", () => {
      user.lastName = FAKER_STRING.substring(0, 50);
      expect(user.validateSync()).toEqual(undefined);
    });

    it("should be fine if the length of lastName is less than or equal 50", () => {
      user.lastName = FAKER_STRING.substring(0, 20);
      expect(user.validateSync()).toEqual(undefined);
    });

    it("should throw a validation error if the length of lastName exceeds 50", () => {
      user.lastName = FAKER_STRING.substring(0, 51);
      expect(user.validateSync().errors.lastName.message).toEqual(
        "Last name can not be longer than 50 characters.",
      );
    });

    it("should be fine if imageUrl is blank", () => {
      user.imageUrl = null;
      expect(user.validateSync()).toEqual(undefined);
    });
  });
});
