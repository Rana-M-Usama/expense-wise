import { beforeEach, describe, expect, it, jest } from "@jest/globals";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";

import app from "../../app";
import emailService from "../../utils/sendEmail";
import setupTestDB from "../utils/setupTestDB";
import User from "../../models/User";
import UserFactory from "../factories/user.factory";

setupTestDB();
jest.setTimeout(10000);

describe("Auth endpoints", () => {
  let user;
  let user2;
  let authToken;

  beforeEach(async () => {
    user2 = {
      firstName: faker.name.fullName(),
      lastName: faker.name.fullName(),
      email: faker.internet.email().toLowerCase(),
      password: "Admin123*",
    };
    user = UserFactory();
    await user.save();
    authToken = await user.getSignedJwtToken();
  });

  describe("POST /api/v1/auth/register", () => {
    it("should return 201 and successfully register user for valid user", async () => {
      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user2)
        .expect(httpStatus.OK);

      expect(res.body.data.token).toBeUndefined();
      expect(res.body.data.user).toEqual({
        id: expect.anything(),
        firstName: user2.firstName,
        lastName: user2.lastName,
        email: user2.email,
        imageUrl: expect.anything(),
      });
    });

    it("should return 400 error if email is invalid", async () => {
      user2.email = "invalidEmail";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toEqual(["Please provide a valid email."]);
    });

    it("should return 400 error if email is already used", async () => {
      const user3 = await User.create(user2);
      user3.email = user2.email;

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user2)
        .expect(httpStatus.CONFLICT);

      expect(res.body.errors).toEqual(["Email already in use."]);
    });

    it("should return 400 error if password length is less than 6 characters", async () => {
      user2.password = "Admin";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toEqual([
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      ]);
    });

    it("should return 400 error if email is invalid and password length is less than 6 characters", async () => {
      user2.email = "invalidEmail";
      user2.password = "Admin";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toEqual([
        "Please provide a valid email.",
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      ]);
    });

    it("should return 400 error if password does not contain letters", async () => {
      user2.password = "11111111";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toEqual([
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      ]);
    });

    it("should return 400 error if password does not numbers", async () => {
      user2.password = "password";

      const res = await request(app)
        .post("/api/v1/auth/register")
        .send(user2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toEqual([
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      ]);
    });
  });

  describe("POST /api/v1/auth/login", () => {
    it("should return 200 and auth token with user if email and password match", async () => {
      const loginCredentials = {
        email: user.email,
        password: "Admin123*",
      };

      const res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      expect(res.body.data.token).toBeDefined();
      expect(res.body.success).toBe(true);
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
      const res = await request(app)
        .get("/api/v1/auth/me")
        .set("authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        email: user.email,
        firstName: user.firstName,
        imageUrl: expect.anything(),
        lastName: user.lastName,
      });
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
      const res = await request(app)
        .put("/api/v1/auth/me")
        .set("authorization", `Bearer ${authToken}`)
        .send({
          firstName: "Updated firstName",
          lastName: "Updated lastName",
          imageUrl: "newAvatar.jpg",
        })
        .expect(httpStatus.OK);

      expect(res.body.success).toBe(true);
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        email: user.email,
        firstName: "Updated firstName",
        imageUrl: "newAvatar.jpg",
        lastName: "Updated lastName",
      });
    });

    it("should return 400 and unauthorized message with invalid auth token", async () => {
      const res = await request(app)
        .put("/api/v1/auth/me")
        .set("authorization", "Bearer invalidToken")
        .send(user)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });
  });

  describe("PUT /api/v1/auth/me/password", () => {
    it("should return 200 and auth token", async () => {
      const res = await request(app)
        .put("/api/v1/auth/me/password")
        .set("authorization", `Bearer ${authToken}`)
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

      await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({ email: user.email })
        .expect(httpStatus.OK);

      expect(sendResetPasswordEmailSpy).toHaveBeenCalled();

      user = await User.findById(user.id);

      expect(user.resetPasswordToken).toBeDefined();
    });

    it("should return 400 if email is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send()
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toEqual(["Email is required."]);
    });

    it("should return 404 if email does not belong to any user", async () => {
      const res = await request(app)
        .post("/api/v1/auth/forgot-password")
        .send({ email: user2.email })
        .expect(httpStatus.NOT_FOUND);

      expect(res.body.errors).toEqual(["User with this email doesn't exist."]);
    });
  });

  describe("POST /api/v1/auth/reset-password", () => {
    it("should return 204 and reset the password", async () => {
      let res = await request(app)
        .get("/api/v1/auth/me")
        .set("authorization", `Bearer ${authToken}`)
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
      let res = await request(app)
        .get("/api/v1/auth/me")
        .set("authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      user = await User.findById(res.body.data._id);

      const resetPasswordToken = await user.getResetPasswordToken();
      await user.save({ validateBeforeSave: false });
      res = await request(app)
        .put(`/api/v1/auth/reset-password/${resetPasswordToken}`)
        .send({ password: "123456" })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toEqual([
        "Please provide a valid password, minimum six characters, at least one capital letter and a number.",
      ]);
    });

    it("should return 404 if reset password token is missing", async () => {
      const res = await request(app)
        .post("/api/v1/auth/reset-password")
        .send({ password: "Admin123*" })
        .expect(httpStatus.NOT_FOUND);

      expect(res.body.errors).toEqual(["Not Found!"]);
    });
  });
});
