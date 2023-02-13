import { beforeEach, describe, expect, it } from "@jest/globals";
import httpStatus from "http-status";
import request from "supertest";

import { ADMIN, EDIT, VIEW } from "../../constants/permission";
import app from "../../app";
import { buildPermissionList } from "../factories/permission.factory";
import Permission from "../../models/Permission";
import setupTestDB from "../utils/setupTestDB";
import Sheet from "../../models/Sheet";
import { SheetFactory } from "../factories/sheet.factory";
import User from "../../models/User";
import UserFactory from "../factories/user.factory";

setupTestDB();

describe("Permission endpoints", () => {
  let permission;
  let permissionParams;
  let user;
  let duplicateUser;
  let sheet;
  let authToken;

  beforeEach(async () => {
    user = UserFactory();
    duplicateUser = await UserFactory().save();

    sheet = SheetFactory({ owner: user });
    permissionParams = {
      type: VIEW,
      userEmail: duplicateUser.email,
      sheet,
    };

    await user.save();
    await sheet.save();
    permission = await Permission.findOne({ user, sheet });
    authToken = await user.getSignedJwtToken();
  });

  describe("POST /api/v1/sheets/:sheetId/permissions", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", "Bearer invalid")
        .send(permissionParams)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if a user doesn't has rights to access sheet", async () => {
      const sheet2 = await new Sheet(SheetFactory()).save();

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet2._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body).toEqual({
        statusCode: httpStatus.BAD_REQUEST,
        errors: ["You are not authorized for this action."],
        success: false,
      });
    });

    it("should raise an error if a user provides an invalid id for sheet", async () => {
      const res = await request(app)
        .post("/api/v1/sheets/invalid/permissions")
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid sheet id."]);
    });

    it("should raise an error if a user having view permission attempts to assign edit permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: VIEW });
      permissionParams.type = EDIT;

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.BAD_REQUEST,
        errors: ["You do not have rights to assign this permission."],
        success: false,
      });
    });

    it("should raise an error if a user having view permission attempts to assign admin permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: VIEW });
      permissionParams.type = ADMIN;

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.BAD_REQUEST,
        errors: ["You do not have rights to assign this permission."],
        success: false,
      });
    });

    it("should raise an error if a user having edit permission attempts to assign admin permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: EDIT });
      permissionParams.type = ADMIN;

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.BAD_REQUEST,
        errors: ["You do not have rights to assign this permission."],
        success: false,
      });
    });

    it("should raise an error if a user having view permission attempts to assign view permission to admin", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: ADMIN });
      permissionParams.type = VIEW;

      await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      const authToken2 = await duplicateUser.getSignedJwtToken();
      const permissionParams2 = {
        type: VIEW,
        userEmail: user.email,
        sheet,
      };

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken2}`)
        .send(permissionParams2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toMatchObject([
        "You do not have rights to assign this permission.",
      ]);
    });

    it("should raise an error if a user having view permission attempts to assign view permission to editor", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: EDIT });
      permissionParams.type = VIEW;

      await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      const authToken2 = await duplicateUser.getSignedJwtToken();
      const permissionParams2 = {
        type: VIEW,
        userEmail: user.email,
        sheet,
      };

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken2}`)
        .send(permissionParams2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toMatchObject([
        "You do not have rights to assign this permission.",
      ]);
    });

    it("should raise an error if a user having edit permission attempts to assign view permission to admin", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: ADMIN });
      permissionParams.type = EDIT;

      await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      const authToken2 = await duplicateUser.getSignedJwtToken();
      const permissionParams2 = {
        type: VIEW,
        userEmail: user.email,
        sheet,
      };

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken2}`)
        .send(permissionParams2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toMatchObject([
        "You do not have rights to assign this permission.",
      ]);
    });

    it("should raise an error if a user having edit permission attempts to assign edit permission to admin", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: ADMIN });
      permissionParams.type = EDIT;

      await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      const authToken2 = await duplicateUser.getSignedJwtToken();
      const permissionParams2 = {
        type: EDIT,
        userEmail: user.email,
        sheet,
      };

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken2}`)
        .send(permissionParams2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toMatchObject([
        "You do not have rights to assign this permission.",
      ]);
    });

    it("should raise an error if a user having edit permission attempts to assign view permission to editor", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: EDIT });
      permissionParams.type = EDIT;

      await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      const authToken2 = await duplicateUser.getSignedJwtToken();
      const permissionParams2 = {
        type: VIEW,
        userEmail: user.email,
        sheet,
      };

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken2}`)
        .send(permissionParams2)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.errors).toMatchObject([
        "You do not have rights to assign this permission.",
      ]);
    });

    it("should be fine if a user having view permission attempts to assign view permission", async () => {
      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      user = await User.findOne({ email: permissionParams.userEmail });

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        sheet: permissionParams.sheet._id,
        type: VIEW,
        user: {
          _id: user._id,
        },
      });
    });

    it("should be fine if a user having edit permission attempts to assign view permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: EDIT });
      permissionParams.type = VIEW;

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      user = await User.findOne({ email: permissionParams.userEmail });

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        sheet: permissionParams.sheet._id,
        type: VIEW,
        user: {
          _id: user._id,
        },
      });
    });

    it("should be fine if a user having edit permission attempts to assign edit permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: EDIT });
      permissionParams.type = EDIT;

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      user = await User.findOne({ email: permissionParams.userEmail });

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        sheet: permissionParams.sheet._id,
        type: EDIT,
        user: {
          _id: user._id,
        },
      });
    });

    it("should be fine if a user having admin permission attempts to assign view permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: ADMIN });
      permissionParams.type = VIEW;

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      user = await User.findOne({ email: permissionParams.userEmail });

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        sheet: permissionParams.sheet._id,
        type: VIEW,
        user: {
          _id: user._id,
        },
      });
    });

    it("should be fine if a user having admin permission attempts to assign edit permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: ADMIN });
      permissionParams.type = EDIT;

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      user = await User.findOne({ email: permissionParams.userEmail });

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        sheet: permissionParams.sheet._id,
        type: EDIT,
        user: {
          _id: user._id,
        },
      });
    });

    it("should be fine if a user having admin permission attempts to assign admin permission", async () => {
      await Permission.findOneAndUpdate(permission.id, { type: ADMIN });
      permissionParams.type = ADMIN;

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(permissionParams)
        .expect(httpStatus.OK);

      user = await User.findOne({ email: permissionParams.userEmail });

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        sheet: permissionParams.sheet._id,
        type: ADMIN,
        user: {
          _id: user._id,
        },
      });
    });

    it("should be fine if an admin changes the sheet owner's permissions to edit or view", async () => {
      const user2 = await UserFactory().save();
      await new Permission({
        type: ADMIN,
        user: user2,
        sheet,
      }).save();
      const authToken2 = await user2.getSignedJwtToken();

      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken2}`)
        .send({
          type: EDIT,
          userEmail: user.email,
          sheet: permission.sheet._id,
        })
        .expect(httpStatus.OK);

      user = await User.findOne({ email: user.email });
      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        sheet: permissionParams.sheet._id,
        type: EDIT,
        user: {
          _id: user.id,
          email: user.email,
        },
      });
    });
  });

  describe("GET /api/v1/sheets/:sheetId/permissions", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", "Bearer invalid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if a user provides an invalid id for sheet", async () => {
      const res = await request(app)
        .get("/api/v1/sheets/invalid/permissions")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid sheet id."]);
    });

    it("should raise an error if a user attempts to get permissions of others' sheet", async () => {
      const user2 = UserFactory();
      await user2.save();
      const authToken2 = user2.getSignedJwtToken();

      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken2}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });

    it("should return all permissions of a sheet", async () => {
      const permissions = await buildPermissionList(2, sheet);

      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/permissions`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.permissions.length).toEqual(3);
      expect(res.body.permissions).toMatchObject([
        {
          type: permission.type,
          user: permission.user._id,
          sheet: permission.sheet._id,
          _id: permission._id,
        },
        {
          type: permissions[0].type,
          user: permissions[0].user._id,
          sheet: permissions[0].sheet._id,
          _id: permissions[0]._id,
        },
        {
          type: permissions[1].type,
          user: permissions[1].user._id,
          sheet: permissions[1].sheet._id,
          _id: permissions[1]._id,
        },
      ]);
    });
  });

  describe("DELETE /api/v1/sheets/:sheetId/permissions/:Id", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .delete(
          `/api/v1/sheets/${sheet._id}/permissions/${permissionParams._id}`,
        )
        .set("Authorization", "Bearer invalid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if a user provides an invalid id for sheet", async () => {
      const user2 = await UserFactory().save();
      await new Permission({
        type: ADMIN,
        user: user2,
        sheet,
      }).save();
      const res = await request(app)
        .delete(`/api/v1/sheets/invalid/permissions/${permissionParams._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid sheet id."]);
    });
    it("should raise an error if a user provides an invalid id for permission", async () => {
      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/invalid`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid permission id."]);
    });

    it("should raise an error if a user having view permission attempts to delete a permission", async () => {
      const user2 = await UserFactory().save();
      const permission2 = await new Permission({
        type: ADMIN,
        user: user2,
        sheet,
      }).save();
      await Permission.findOneAndUpdate(permission.id, { type: VIEW });
      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/${permission2._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.BAD_REQUEST,
        errors: ["You are not authorized for this action."],
        success: false,
      });
    });

    it("should raise an error if a user having edit permission attempts to delete a permission", async () => {
      const user2 = await UserFactory().save();
      const permission2 = await new Permission({
        type: ADMIN,
        user: user2,
        sheet,
      }).save();
      await Permission.findOneAndUpdate(permission.id, { type: EDIT });
      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/${permission2._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.BAD_REQUEST,
        errors: ["You are not authorized for this action."],
        success: false,
      });
    });

    it("should raise an error if a user attempts to delete a permission without having any permission", async () => {
      const user2 = await UserFactory().save();
      const permission2 = await new Permission({
        type: VIEW,
        user: user2,
        sheet,
      }).save();
      const authToken2 = await permission2.user.getSignedJwtToken();
      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/permissions/${permission2._id}`)
        .set("Authorization", `Bearer ${authToken2}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body).toEqual({
        statusCode: httpStatus.BAD_REQUEST,
        errors: ["You are not authorized for this action."],
        success: false,
      });
    });

    it("should delete a permission and return an empty object if a user has admin permission of a specified sheet", async () => {
      const user2 = await UserFactory().save();
      const permissionToBeDeleted = await new Permission({
        type: ADMIN,
        user: user2,
        sheet,
      }).save();
      const res = await request(app)
        .delete(
          `/api/v1/sheets/${sheet._id}/permissions/${permissionToBeDeleted._id}`,
        )
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toEqual({});
    });
  });
});
