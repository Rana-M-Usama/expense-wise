import mongoose from "mongoose";

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

export default mongoose.model("Sheet", SheetSchema);
