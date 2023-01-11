import { beforeEach, describe, expect, test } from "@jest/globals";
import { faker } from "@faker-js/faker";
import User from "../../../models/User";
import { user } from "../../fixtures/user.fixture";

describe("User model", () => {
  describe("User validation", () => {
    let newUser;
    beforeEach(() => {
      newUser = { ...user };
    });

    test("should correctly validate a valid user", async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test("should throw a validation error if email is invalid", async () => {
      newUser.email = "invalidEmail";
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test("should throw a validation error if password is invalid", async () => {
      newUser.password = "pass";
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test("should throw a validation error if firstName length exceeds 51", async () => {
      newUser.firstName = "rmulsvefxtcjfmrrvttidhlfvetvulfkecsylnrookveuqvgsnw";
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test("should throw a validation error if LastName length exceeds 51", async () => {
      newUser.lastName = "rmulsvefxtcjfmrrvttidhlfvetvulfkecsylnrookveuqvgsnw";
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test("should throw a validation error if firstName is blank", async () => {
      newUser.firstName = "";
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test("should throw a validation error if lastName is blank", async () => {
      newUser.lastName = "";
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test("should be fine if length of firstName is exact 50", async () => {
      newUser.firstName = "rmulsvefxtcjfmrrvttidhlfvetvulfkecsylnrookveuqvgsn";
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test("should be fine if length of lastName is exact 50", async () => {
      newUser.lastName = "rmulsvefxtcjfmrrvttidhlfvetvulfkecsylnrookveuqvgsn";
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test("should be fine if length of firstName is less than or equal 50", async () => {
      newUser.firstName = faker.lorem.word(25);
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test("should be fine if length of lastName is less than or equal 50", async () => {
      newUser.lastName = faker.lorem.word(25);
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test("should be fine if imageUrl is blank", async () => {
      newUser.imageUrl = null;
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });
  });
});
