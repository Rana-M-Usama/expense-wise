import { beforeEach, describe, expect, it } from "@jest/globals";
import { faker } from "@faker-js/faker";

import generateUser from "../../fixtures/user.fixture";
import User from "../../../models/User";

const FAKER_STRING = faker.lorem.paragraphs(1);

describe("User model", () => {
  describe("validation", () => {
    let user;

    beforeEach(() => {
      user = { ...generateUser() };
    });

    it("should correctly validate a valid user", () => {
      const response = new User(user).validateSync();
      expect(response).toEqual(undefined);
    });

    it("should throw a validation error if email is null", () => {
      user.email = null;
      const response = new User(user).validateSync();
      expect(response.errors.email.message).toEqual("Email is required.");
    });

    it("should throw a validation error if email is invalid", () => {
      user.email = "invalidEmail";
      const response = new User(user).validateSync();
      expect(response.errors.email.message).toEqual(
        "Please provide a valid email.",
      );
    });

    it("should throw a validation error if password is blank", () => {
      user.password = null;
      const response = new User(user).validateSync();
      expect(response.errors.password.message).toEqual("Password is required.");
    });

    it("should throw a validation error if password is invalid", () => {
      user.password = "invalid";
      const response = new User(user).validateSync();
      expect(response.errors.password.message).toEqual(
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      );
    });

    it("should throw a validation error if the length of the firstName exceeds 50", () => {
      user.firstName = FAKER_STRING.substring(0, 60);
      const response = new User(user).validateSync();
      expect(response.errors.firstName.message).toEqual(
        "First name can not be longer than 50 characters.",
      );
    });

    it("should throw a validation error if the length of lastName exceeds 50", () => {
      user.lastName = FAKER_STRING.substring(0, 60);
      const response = new User(user).validateSync();
      expect(response.errors.lastName.message).toEqual(
        "Last name can not be longer than 50 characters.",
      );
    });

    it("should throw a validation error if firstName is blank", () => {
      user.firstName = null;
      const response = new User(user).validateSync();
      expect(response.errors.firstName.message).toEqual(
        "First name is required.",
      );
    });

    it("should throw a validation error if lastName is blank", () => {
      user.lastName = null;
      const response = new User(user).validateSync();
      expect(response.errors.lastName.message).toEqual(
        "Last name is required.",
      );
    });

    it("should be fine if the length of firstName is exact 50", () => {
      user.firstName = FAKER_STRING.substring(0, 50);
      const error = new User(user).validateSync();
      expect(error).toEqual(undefined);
    });

    it("should be fine if the length of lastName is exact 50", () => {
      user.lastName = FAKER_STRING.substring(0, 50);
      const error = new User(user).validateSync();
      expect(error).toEqual(undefined);
    });

    it("should be fine if the length of firstName is less than or equal 50", () => {
      user.firstName = FAKER_STRING.substring(0, 20);
      const error = new User(user).validateSync();
      expect(error).toEqual(undefined);
    });

    it("should be fine if the length of lastName is less than or equal 50", () => {
      user.lastName = FAKER_STRING.substring(0, 20);
      const error = new User(user).validateSync();
      expect(error).toEqual(undefined);
    });

    it("should be fine if imageUrl is blank", () => {
      user.imageUrl = null;
      const error = new User(user).validateSync();
      expect(error).toEqual(undefined);
    });
  });
});
