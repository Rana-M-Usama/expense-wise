import { describe, beforeEach, test, expect } from "@jest/globals";

/* eslint-disable node/no-unpublished-import */
import { faker } from "@faker-js/faker";
import User from "../../../models/User";

describe("User model", () => {
  describe("User validation", () => {
    let newUser;
    beforeEach(() => {
      newUser = {
        firstName: faker.name.fullName(),
        lastName: faker.name.fullName(),
        email: faker.internet.email().toLowerCase(),
        password: "password1",
      };
    });

    test("should correctly validate a valid user", async () => {
      await expect(new User(newUser).validate()).resolves.toBeUndefined();
    });

    test("should throw a validation error if email is invalid", async () => {
      newUser.email = "invalidEmail";
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    test("should throw a validation error if password length is less than 6 characters", async () => {
      newUser.password = "pass";
      await expect(new User(newUser).validate()).rejects.toThrow();
    });

    // test("should throw a validation error if password does not contain numbers", async () => {
    //   newUser.password = "password";
    //   await expect(new User(newUser).validate()).rejects.toThrow();
    // });

    // test("should throw a validation error if password does not contain letters", async () => {
    //   newUser.password = "11111111";
    //   await expect(new User(newUser).validate()).rejects.toThrow();
    // });
  });

  // describe("User toJSON()", () => {
  //   test("should not return user password when toJSON is called", () => {
  //     const newUser = {
  //       name: faker.name.fullName(),
  //       email: faker.internet.email().toLowerCase(),
  //       password: "password1",
  //       role: "user",
  //     };
  //     expect(new User(newUser).toJSON()).not.toHaveProperty("password");
  //   });
  // });
});
