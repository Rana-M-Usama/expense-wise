import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";

import app from "../../app";
import emailService from "../../utils/sendEmail";
import setupTestDB from "../utils/setupTestDB";
import User from "../../models/User";

setupTestDB();

describe("Auth endpoints", () => {
  let user;

  beforeEach(() => {
    user = {
      firstName: faker.name.fullName(),
      lastName: faker.name.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: "Admin123*",
    };
  });

  describe("POST /api/v1/auth/register", () => {
    it("should return 201 and successfully register user for valid user", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user)
        .expect(httpStatus.OK);

      expect(res.body.data.token).toBeUndefined();
      expect(res.body.data).toHaveProperty("user");
      expect(res.body.data.user).toEqual({
        id: expect.anything(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imageUrl: expect.anything(),
      });
    });

    it("should return 400 error if email is invalid", async () => {
      user.email = "invalidEmail";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0]).toBe("Please provide a valid email.");
    });

    it("should return 400 error if email is already used", async () => {
      const user2 = await User.create(user);
      user.email = user2.email;

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user)
        .expect(httpStatus.CONFLICT);

      expect(res.body.errors[0]).toBe("Email already in use.");
    });

    it("should return 400 error if password length is less than 6 characters", async () => {
      user.password = "Admin";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0]).toBe(
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      );
    });

    it("should return 400 error if email is invalid and password length is less than 6 characters", async () => {
      user.email = "invalidEmail";
      user.password = "Admin";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toEqual([
        "Please provide a valid email.",
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      ]);
    });

    it("should return 400 error if password does not contain letters", async () => {
      user.password = "11111111";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0]).toBe(
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      );
    });

    it("should return 400 error if password does not numbers", async () => {
      user.password = "password";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0]).toBe(
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      );
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should return 200 and auth token with user if email and password match", async () => {
      await new User(user).save();
      const loginCredentials = {
        email: user.email,
        password: user.password,
      };

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("success");
      expect(res.body.data).toHaveProperty("token");
      expect(res.body.data.token).toBeDefined();
      expect(res.body.success).toBe(true);
      expect(res.body.data).toHaveProperty("user");
      expect(res.body.data.user).toEqual({
        id: expect.anything(),
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        imageUrl: expect.anything(),
      });
    });

    it("should return 401 error if there are no users with that email", async () => {
      const loginCredentials = {
        email: user.email,
        password: user.password,
      };

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        errors: ["Invalid credentials."],
        success: false,
      });
    });

    it("should return 401 error if password is wrong", async () => {
      await new User(user).save();
      const loginCredentials = {
        email: user.email,
        password: "invalidPassword123*",
      };

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        errors: ["Invalid credentials."],
        success: false,
      });
    });

    it("should return 400 error without email and password", async () => {
      const res = await request(app)
        .post("/api/v1/auth/login")
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({
        statusCode: httpStatus.BAD_REQUEST,
        errors: ["Please provide an email and password."],
        success: false,
      });
    });
  });

  describe("GET /api/v1/auth/me", () => {
    it("should return 200 and the user who is currently logged in", async () => {
      await new User(user).save();
      const loginCredentials = {
        email: user.email,
        password: user.password,
      };

      let res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      res = await request(app)
        .get("/api/v1/auth/me")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("success");
      expect(res.body).toHaveProperty("data");
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(
        expect.objectContaining({
          _id: expect.anything(),
          email: user.email,
          firstName: user.firstName,
          imageUrl: expect.anything(),
          lastName: user.lastName,
        }),
      );
    });

    it("should return 400 and unauthorized message without auth token", async () => {
      const res = await request(app)
        .get("/api/v1/auth/me")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        success: false,
        errors: ["Please provide an authentication token."],
      });
    });
  });

  describe("PUT /api/v1/auth/me", () => {
    it("should return 200 and updated user", async () => {
      await new User(user).save();
      const loginCredentials = {
        email: user.email,
        password: user.password,
      };

      let res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      user.firstName = "Updated firstName";
      user.lastName = "Updated lastName";
      user.imageUrl = "newAvatar.jpg";

      res = await request(app)
        .put("/api/v1/auth/me")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .send(user)
        .expect(httpStatus.OK);

      expect(res.body).toHaveProperty("success");
      expect(res.body).toHaveProperty("data");
      expect(res.body.success).toBe(true);
      expect(res.body.data).toEqual(
        expect.objectContaining({
          _id: expect.anything(),
          email: user.email,
          firstName: user.firstName,
          imageUrl: expect.anything(),
          lastName: user.lastName,
        }),
      );
    });

    it("should return 400 and unauthorized message with invalid auth token", async () => {
      user.firstName = "Updated firstName";
      user.lastName = "Updated lastName";
      user.imageUrl = "newAvatar.jpg";

      const res = await request(app)
        .put("/api/v1/auth/me")
        .set("authorization", "Bearer invalidToken")
        .send(user)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.errors[0]).toBe("Please provide a valid token.");
    });
  });

  describe("PUT /api/v1/auth/me/password", () => {
    it("should return 200 and auth token", async () => {
      await new User(user).save();
      const loginCredentials = {
        email: user.email,
        password: user.password,
      };

      let res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      res = await request(app)
        .put("/api/v1/auth/me/password")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .send({
          currentPassword: "Admin123*",
          newPassword: "Admin123**",
        })
        .expect(httpStatus.OK);

      expect(res.body.data.token).toBeTruthy();
      expect(res.body.success).toBe(true);
    });
  });

  describe("POST /api/v1/auth/forgot-password", () => {
    beforeEach(() => {
      jest.spyOn(emailService.transporter, "sendMail").mockResolvedValue(true);
    });

    it("should return 204 and send reset password email to the user", async () => {
      const sendResetPasswordEmailSpy = jest.spyOn(emailService, "sendEmail");

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user)
        .expect(httpStatus.OK);

      await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({ email: user.email })
        .expect(httpStatus.OK);

      expect(sendResetPasswordEmailSpy).toHaveBeenCalled();

      const user2 = await User.findById(res.body.data.user.id);

      expect(user2.resetPasswordToken).toBeDefined();
    });

    it("should return 400 if email is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send()
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0]).toBe("Email is required.");
    });

    it("should return 404 if email does not belong to any user", async () => {
      const res = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({ email: user.email })
        .expect(httpStatus.NOT_FOUND);

      expect(res.body.errors[0]).toBe("User with this email doesn't exist.");
    });
  });

  describe("POST /api/v1/auth/reset-password", () => {
    it("should return 204 and reset the password", async () => {
      await new User(user).save();
      const loginCredentials = {
        email: user.email,
        password: user.password,
      };

      let res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      res = await request(app)
        .get("/api/v1/auth/me")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(httpStatus.OK);

      user = await User.findById(res.body.data._id);
      const resetPasswordToken = await user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });
      res = await request(app)
        .put(`/api/v1/auth/reset-password/${resetPasswordToken}`)
        .send({ password: "Admin123*" })
        .expect(httpStatus.OK);

      expect(res.body.success).toBe(true);
    });

    it("should return 404 if password is invalid", async () => {
      await new User(user).save();
      const loginCredentials = {
        email: user.email,
        password: user.password,
      };

      let res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      res = await request(app)
        .get("/api/v1/auth/me")
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(httpStatus.OK);

      user = await User.findById(res.body.data._id);

      const resetPasswordToken = await user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });
      res = await request(app)
        .put(`/api/v1/auth/reset-password/${resetPasswordToken}`)
        .send({ password: "123456" })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors[0]).toBe(
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      );
    });

    it("should return 404 if reset password token is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/reset-password")
        .send({ password: "Admin123*" })
        .expect(httpStatus.NOT_FOUND);

      expect(res.body.errors[0]).toBe("Not Found!");
    });
  });
});
