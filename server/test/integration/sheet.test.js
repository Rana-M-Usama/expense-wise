import { beforeEach, describe, expect, it } from "@jest/globals";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";

import { buildSheetList, SheetFactory } from "../factories/sheet.factory";
import app from "../../app";
import { ExpenseFactory } from "../factories/expense.factory";
import setupTestDB from "../utils/setupTestDB";
import Sheet from "../../models/Sheet";
import UserFactory from "../factories/user.factory";

setupTestDB();

describe("Sheet endpoints", () => {
  let user;
  let authToken;

  beforeEach(async () => {
    user = UserFactory();
    await user.save();
    authToken = await user.getSignedJwtToken();
  });

  describe("GET /api/v1/sheets/", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .get("/api/v1/sheets/")
        .set("Authorization", "Bearer inValid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should return a list of all the sheets belonging to the owner", async () => {
      await buildSheetList(1, user);

      const sheets = await Sheet.where({ owner: user.id });

      const res = await request(app)
        .get("/api/v1/sheets/")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.count).toEqual(1);
      expect(res.body.data).toMatchObject([
        {
          _id: sheets[0]._id,
          description: sheets[0].description,
          title: sheets[0].title,
          permissionType: "admin",
          owner: {
            _id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            imageUrl: user.imageUrl,
          },
          __v: expect.any(Number),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
      ]);
    });
  });

  describe("GET /api/v1/sheets/:id", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .get("/api/v1/sheets/63c8197c553b29d8b53b25be")
        .set("Authorization", "Bearer inValid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if the id is invalid", async () => {
      const res = await request(app)
        .get("/api/v1/sheets/inValid")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid sheet id."]);
    });

    it("should raise an error if the sheet does not belong to the owner", async () => {
      const user2 = UserFactory();
      await user2.save();
      await buildSheetList(1, user2);

      const sheet = await Sheet.findOne({ owner: user2.id });
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });

    it("should raise an error if the specified sheet does not exist", async () => {
      const res = await request(app)
        .get("/api/v1/sheets/63c8197c553b29d8b53b25be")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.NOT_FOUND);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "No sheet found with the id of 63c8197c553b29d8b53b25be.",
      ]);
    });

    it("should return the sheet that belongs to the owner, identified by the specified ID", async () => {
      const sheet = await SheetFactory({ owner: user }).save();

      await ExpenseFactory({
        status: "paid",
        amount: 1200,
        amountType: "incoming",
        owner: user,
        sheet,
      }).save();
      await ExpenseFactory({
        status: "unpaid",
        amount: 2000,
        amountType: "incoming",
        owner: user,
        sheet,
      }).save();
      await ExpenseFactory({
        status: "paid",
        amount: 800,
        amountType: "outgoing",
        owner: user,
        sheet,
      }).save();
      await ExpenseFactory({
        status: "unpaid",
        amount: 200,
        amountType: "outgoing",
        owner: user,
        sheet,
      }).save();

      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: sheet._id,
        description: sheet.description,
        title: sheet.title,
        owner: sheet.owner._id,
        amounts: {
          remainingAmount: 2000,
          receivedAmount: 1200,
          spentAmount: 800,
          debtAmount: 200,
          totalIncomingAmount: 3200,
          totalOutgoingAmount: 1000,
          currentSheetBalance: 400,
        },
      });
    });
  });

  describe("POST /api/v1/sheets/", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const sheet = {
        title: faker.lorem.word(),
        description: faker.lorem.word(),
        owner: user,
      };

      const res = await request(app)
        .post("/api/v1/sheets/")
        .set("Authorization", "Bearer inValid")
        .send(sheet)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should create a sheet and return it", async () => {
      const sheet = {
        title: faker.lorem.word(),
        description: faker.lorem.word(),
        owner: user,
      };

      const res = await request(app)
        .post("/api/v1/sheets/")
        .set("Authorization", `Bearer ${authToken}`)
        .send(sheet);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        description: sheet.description,
        title: sheet.title,
        owner: sheet.owner.id,
      });
    });
  });

  describe("PUT /api/v1/sheets/", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const sheet = {
        title: faker.lorem.word(),
        description: faker.lorem.word(),
        owner: user,
      };

      const res = await request(app)
        .put("/api/v1/sheets/")
        .set("Authorization", "Bearer inValid")
        .send(sheet)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should update the sheet and return updated one", async () => {
      const sheet = await SheetFactory({ owner: user }).save();

      const res = await request(app)
        .put(`/api/v1/sheets/${sheet._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ title: "Updated title", description: "Updated description" })
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: sheet._id,
        description: "Updated description",
        title: "Updated title",
        owner: sheet.owner.id,
      });
    });

    it("should raise an error if attempts to change the owner", async () => {
      const user2 = await UserFactory().save();
      const sheet = await SheetFactory({ owner: user2 }).save();

      const res = await request(app)
        .put(`/api/v1/sheets/${sheet._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ title: "Updated title", description: "Updated description" })
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });
  });

  describe("DELETE /api/v1/sheets/", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const sheet = await SheetFactory({ owner: user }).save();

      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}`)
        .set("Authorization", "Bearer inValid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should delete the sheet and return an empty object", async () => {
      const sheet = await SheetFactory({ owner: user }).save();

      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toEqual({});
    });

    it("should raise an error if a user attempts to delete a sheet that belongs to another user", async () => {
      const user2 = await UserFactory().save();
      const sheet = await SheetFactory({ owner: user2 }).save();

      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}`)
        .set("Authorization", `Bearer ${authToken}`);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });
  });
});
