import { beforeEach, describe, expect, it } from "@jest/globals";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import request from "supertest";

import { buildExpenseList, ExpenseFactory } from "../factories/expense.factory";
import app from "../../app";
import Expense from "../../models/Expense";
import setupTestDB from "../utils/setupTestDB";
import { SheetFactory } from "../factories/sheet.factory";
import UserFactory from "../factories/user.factory";

setupTestDB();

describe("Expense endpoints", () => {
  let user;
  let sheet;
  let authToken;

  beforeEach(async () => {
    user = UserFactory();
    sheet = SheetFactory({ owner: user });
    await user.save();
    await sheet.save();

    authToken = await user.getSignedJwtToken();
  });

  describe("GET /api/v1/sheets/:sheetId/expenses/", () => {
    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/expenses/`)
        .set("Authorization", "Bearer inValid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if the sheet does not belong to the owner", async () => {
      const sheet2 = SheetFactory();
      await sheet2.save();
      await buildExpenseList(2, sheet2);

      const res = await request(app)
        .get(`/api/v1/sheets/${sheet2._id}/expenses/`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });

    it("should raise an error if the sheetId is invalid", async () => {
      const res = await request(app)
        .get("/api/v1/sheets/invalid/expenses/")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid sheet id."]);
    });

    it("should raise an error if the sheetId is valid but the corresponding sheet does not exist", async () => {
      const res = await request(app)
        .get("/api/v1/sheets/63c8197c553b29d8b53b25be/expenses/")
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.NOT_FOUND);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "No sheet found with the id of 63c8197c553b29d8b53b25be.",
      ]);
    });

    it("should return a list of all the sheets belonging to the owner", async () => {
      await buildExpenseList(2, sheet);
      const expenses = await Expense.where({ sheet: sheet._id });
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/expenses/`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.count).toEqual(2);
      expect(res.body.data).toMatchObject([
        {
          _id: expenses[0]._id,
          amount: expenses[0].amount,
          amountType: expenses[0].amountType,
          type: expenses[0].type,
          title: expenses[0].title,
          status: expenses[0].status,
          owner: expenses[0].owner,
          sheet: {
            _id: expenses[0].sheet,
          },
        },
        {
          _id: expenses[1]._id,
          amount: expenses[1].amount,
          amountType: expenses[1].amountType,
          type: expenses[1].type,
          title: expenses[1].title,
          status: expenses[1].status,
          owner: expenses[1].owner,
          sheet: {
            _id: expenses[1].sheet,
          },
        },
      ]);
    });
  });

  describe("GET /api/v1/sheets/:sheetId/expenses/:id", () => {
    let expense;

    beforeEach(async () => {
      expense = ExpenseFactory({ owner: user, sheet });
      await expense.save();
    });

    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/expenses/${expense._id}`)
        .set("Authorization", "Bearer inValid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if the sheet does not belong to the owner", async () => {
      const sheet2 = SheetFactory();
      await sheet2.save();
      await buildExpenseList(2, sheet2);
      const expense2 = await Expense.findOne({ sheet: sheet._id });

      const res = await request(app)
        .get(`/api/v1/sheets/${sheet2._id}/expenses/${expense2._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });

    it("should raise an error if the expense id is valid but the corresponding expense does not exist", async () => {
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/expenses/63c8197c553b29d8b53b25be`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.NOT_FOUND);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "No expense found with the id of 63c8197c553b29d8b53b25be.",
      ]);
    });

    it("should raise an error if the expense id invalid", async () => {
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/expenses/invalid`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Invalid expense id."]);
    });

    it("should raise an error if the expense doesn't belongs to sheet", async () => {
      const sheet2 = SheetFactory();

      await sheet2.save();

      const res = await request(app)
        .get(`/api/v1/sheets/${sheet2._id}/expenses/${expense._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });

    it("should return a list of all the sheets belonging to the owner", async () => {
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet._id}/expenses/${expense._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expense._id,
        title: expense.title,
        type: expense.type,
        status: expense.status,
        amount: expense.amount,
        amountType: expense.amountType,
        sheet: {
          _id: expense.sheet._id,
          title: expense.sheet.title,
          owner: {
            _id: expense.sheet.owner._id,
            firstName: expense.sheet.owner.firstName,
            lastName: expense.sheet.owner.lastName,
          },
        },
        owner: {
          _id: expense.sheet.owner._id,
          firstName: expense.sheet.owner.firstName,
          lastName: expense.sheet.owner.lastName,
        },
      });
    });
  });

  describe("POST /api/v1/sheets/:sheetId/expenses/", () => {
    let expenseParams;

    beforeEach(async () => {
      expenseParams = {
        title: faker.lorem.words(1),
        type: faker.commerce.department(),
        status: "paid",
        amount: faker.commerce.price(),
        amountType: "incoming",
        owner: sheet.owner,
        sheet,
      };
    });

    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .post("/api/v1/sheets/:sheetId/expenses/")
        .set("Authorization", "Bearer inValid")
        .send(expenseParams)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if a user attempts to add an expense to a sheet that does not belong to them", async () => {
      const sheet2 = SheetFactory();
      await sheet2.save();
      const res = await request(app)
        .get(`/api/v1/sheets/${sheet2._id}/expenses`)
        .set("Authorization", "Bearer inValid")
        .send(expenseParams)
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should create an expense and return it", async () => {
      const res = await request(app)
        .post(`/api/v1/sheets/${sheet._id}/expenses/`)
        .set("Authorization", `Bearer ${authToken}`)
        .send(expenseParams);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        title: expenseParams.title,
        type: expenseParams.type,
        status: expenseParams.status,
        amount: parseInt(expenseParams.amount, 10),
        amountType: expenseParams.amountType,
        sheet: expenseParams.sheet._id,
        owner: expenseParams.sheet.owner._id,
      });
    });
  });

  describe("PUT /api/v1/sheets/:sheetId/expenses/:id", () => {
    let expense;

    beforeEach(async () => {
      expense = ExpenseFactory({ owner: user, sheet });
      await expense.save();
    });

    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .put(`/api/v1/sheets/${sheet._id}/expenses/${expense._id}`)
        .set("Authorization", "Bearer inValid")
        .send({})
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if a user attempts to update an expense that does not belong to them", async () => {
      const sheet2 = SheetFactory();
      await sheet2.save();
      await buildExpenseList(2, sheet2);
      const expense2 = await Expense.findOne({ sheet: sheet._id });
      const res = await request(app)
        .put(`/api/v1/sheets/${sheet2._id}/expenses/${expense2._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({})
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });

    it("should update the expense and return updated one", async () => {
      const res = await request(app)
        .put(`/api/v1/sheets/${sheet._id}/expenses/${expense._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .send({ title: "Updated title", status: "unpaid" })
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({
        _id: expect.anything(),
        title: "Updated title",
        type: expense.type,
        status: "unpaid",
        amount: expense.amount,
        amountType: expense.amountType,
        sheet: expense.sheet._id,
        owner: expense.sheet.owner._id,
      });
    });
  });

  describe("DELETE /api/v1/sheets/:sheetId/expenses/:id", () => {
    let expense;

    beforeEach(async () => {
      expense = ExpenseFactory({ owner: user, sheet });
      await expense.save();
    });

    it("should raise an error if the auth token is invalid", async () => {
      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/expenses/${expense._id}`)
        .set("Authorization", "Bearer inValid")
        .expect(httpStatus.UNAUTHORIZED);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual(["Please provide a valid token."]);
    });

    it("should raise an error if a user attempts to delete an expense that does not belong to them", async () => {
      const sheet2 = SheetFactory();

      await sheet2.save();
      await buildExpenseList(2, sheet2);

      const expense2 = await Expense.findOne({ sheet: sheet._id });
      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet2._id}/expenses/${expense2._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.BAD_REQUEST);

      expect(res.body.success).toBeFalsy();
      expect(res.body.errors).toEqual([
        "You are not authorized for this action.",
      ]);
    });

    it("should delete the expense and returns an empty object", async () => {
      const res = await request(app)
        .delete(`/api/v1/sheets/${sheet._id}/expenses/${expense._id}`)
        .set("Authorization", `Bearer ${authToken}`)
        .expect(httpStatus.OK);

      expect(res.body.success).toBeTruthy();
      expect(res.body.data).toMatchObject({});
    });
  });
});
