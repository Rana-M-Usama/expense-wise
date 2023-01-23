import { beforeEach, describe, expect, it } from "@jest/globals";
import httpStatus from "http-status";
import request from "supertest";

import app from "../../app";
import Permission from "../../models/Permission";
import setupTestDB from "../utils/setupTestDB";
import Sheet from "../../models/Sheet";
import { SheetFactory } from "../factories/sheet.factory";
import User from "../../models/User";
import UserFactory from "../factories/user.factory";

setupTestDB();

describe("Permission endpoints", () => {
  let permission;
  let permission2;
  let user;
  let user2;
  let sheet;
  let authToken;

  beforeEach(async () => {
    user = UserFactory();
    sheet = SheetFactory({ owner: user });
    user2 = UserFactory();

    await new User(user).save();
    await new Sheet(sheet).save();
    permission = await Permission.findOne({ user, sheet });
    authToken = await user.getSignedJwtToken();

    permission2 = {
      type: "view",
      user: user2,
      sheet,
    };
  });

  describe("POST /api/v1/sheets/:sheetId/permissions", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", "Bearer invalid")
        .send(permission2)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if a user doesn't has rights to access sheet", async () => {
      const sheet2 = await new Sheet(SheetFactory()).save();
      permission2.type = "view";

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet2._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        errors: ["You are not authorized for this action."],
        success: false,
      });
    });

    it("should raise an error if a user provides an invalid id for sheet", async () => {
      const res = await request(app)
        .post("/api/v1/sheets/invalid/permissions")
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid sheet id"]);
    });

    it("should raise an error if a user having view permission attempts to assign edit permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: "view" });
      permission2.type = "edit";

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        errors: ["You do not have rights to assign this permission."],
        success: false,
      });
    });

    it("should raise an error if a user having view permission attempts to assign admin permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: "view" });
      permission2.type = "admin";

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        errors: ["You do not have rights to assign this permission."],
        success: false,
      });
    });

    it("should raise an error if a user having edit permission attempts to assign admin permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: "edit" });
      permission2.type = "admin";

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        errors: ["You do not have rights to assign this permission."],
        success: false,
      });
    });

    it("should be fine if a user having view permission attempts to assign view permission", async () => {
      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        user: permission2.user._id,
        sheet: permission2.sheet._id,
        type: "view",
      });
    });

    it("should be fine if a user having edit permission attempts to assign view permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: "edit" });
      permission2.type = "view";

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        user: permission2.user._id,
        sheet: permission2.sheet._id,
        type: "view",
      });
    });

    it("should be fine if a user having edit permission attempts to assign edit", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: "edit" });
      permission2.type = "edit";

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        user: permission2.user._id,
        sheet: permission2.sheet._id,
        type: "edit",
      });
    });

    it("should be fine if a user having admin permission attempts to assign view permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: "admin" });
      permission2.type = "view";

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        user: permission2.user._id,
        sheet: permission2.sheet._id,
        type: "view",
      });
    });

    it("should be fine if a user having admin permission attempts to assign edit permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: "admin" });
      permission2.type = "edit";

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        user: permission2.user._id,
        sheet: permission2.sheet._id,
        type: "edit",
      });
    });

    it("should be fine if a user having admin permission attempts to assign admin permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: "admin" });
      permission2.type = "admin";

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        user: permission2.user._id,
        sheet: permission2.sheet._id,
        type: "admin",
      });
    });

    it("should be fine if an admin changes the sheet owner's permissions to edit or view", async () => {
      await new User(user2).save();
      await Permission.findOneAndUpdate(permission.id, { type: "admin" });

      permission2.type = "admin";

      await new Permission(permission2).save();

      const loginCredentials = {
        email: user2.email,
        password: user2.password,
      };

      let res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${res.body.data.token}`)
        .send({
          type: "edit",
          user: permission.user._id,
          sheet: permission.sheet._id,
        })
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        user: permission.user._id,
        sheet: permission.sheet._id,
        type: "edit",
      });
    });
  });

  describe("GET /api/v1/sheets/:sheetId/permissions", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", "Bearer invalid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if a user provides an invalid id for sheet", async () => {
      const res = await request(app)
        .post("/api/v1/sheets/invalid/permissions")
        .set("authorization", `Bearer ${authToken}`)
        .send(permission2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid sheet id"]);
    });

    it("should raise an error if a user attempts to get permissions of others' sheet", async () => {
      await new User(user2).save();

      const loginCredentials = {
        email: user2.email,
        password: user2.password,
      };

      let res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });

    it("should return all permissions of a sheet", async () => {
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.permissions.length).toEqual(1);
      expect(res.body.permissions).toMatchObject([
        {
          _id: expect.anything(),
          sheet: permission.sheet._id,
          type: "admin",
          user: permission.user._id,
        },
      ]);
    });
  });

  describe("DELETE /api/v1/sheets/:sheetId/permissions/:permissionId", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/${permission2.id}`)
        .set("authorization", "Bearer invalid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if a user provides an invalid id for sheet", async () => {
      await new Permission(permission2).save();

      const res = await request(app)
        .delete(`/api/v1/sheets/invalid/permissions/${permission2.id}`)
        .set("authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid sheet id"]);
    });

    it("should raise an error if a user provides an invalid id for permission", async () => {
      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/invalid`)
        .set("authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid permission id"]);
    });

    it("should raise an error if a user having view permission attempts to delete a permission", async () => {
      const newPermission = await new Permission(permission2).save();
      await Permission.findOneAndUpdate(permission.id, { type: "view" });

      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/${newPermission._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        errors: ["You are not authorized for this action."],
        success: false,
      });
    });

    it("should raise an error if a user having edit permission attempts to delete a permission", async () => {
      const newPermission = await new Permission(permission2).save();
      await Permission.findOneAndUpdate(permission.id, { type: "edit" });

      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/${newPermission._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        errors: ["You are not authorized for this action."],
        success: false,
      });
    });

    it("should raise an error if a user attempts to delete a permission without having any permission", async () => {
      await new User(user2).save();
      const newPermission = await new Permission(permission2).save();

      const loginCredentials = {
        email: user2.email,
        password: user2.password,
      };

      let res = await request(app)
        .post("/api/v1/auth/login")
        .send(loginCredentials)
        .expect(httpStatus.OK);

      res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/${newPermission._id}`)
        .set("authorization", `Bearer ${res.body.data.token}`)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.UNAUTHORIZED,
        errors: ["You are not authorized for this action."],
        success: false,
      });
    });

    it("should delete a permission and return an empty object if a user has admin permission of a specified sheet", async () => {
      const newPermission = await new Permission(permission2).save();

      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/${newPermission._id}`)
        .set("authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toEqual({});
    });
  });
});
