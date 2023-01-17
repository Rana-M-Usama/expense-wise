import mongoose from "mongoose";

import {
  ADMIN_PERMISSIONS,
  EDIT_PERMISSIONS,
  VIEW_PERMISSIONS,
} from "../middlewares/permission";
import Permission from "./Permission";

const SheetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required."],
      maxlength: 100,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Owner is required."],
      immutable: true,
    },
  },
  { timestamps: true },
);

// Cascade delete expenses when a sheet is deleted
SheetSchema.pre("remove", async function (next) {
  await this.model("Expense").deleteMany({ sheet: this._id });
  next();
});

// Creates permission for the sheet owner
SheetSchema.post("save", async function (doc, next) {
  await Permission.create({
    sheet: this._id,
    user: this.owner,
    type: "admin",
  });

  next();
});

SheetSchema.methods.hasViewPermission = function (user) {
  return VIEW_PERMISSIONS.includes(user.permission.type);
};

SheetSchema.methods.hasEditPermission = function (user) {
  return EDIT_PERMISSIONS.includes(user.permission.type);
};

SheetSchema.methods.hasAdminPermission = function (user) {
  return ADMIN_PERMISSIONS.includes(user.permission.type);
};

export default mongoose.model("Sheet", SheetSchema);
