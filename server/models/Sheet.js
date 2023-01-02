const mongoose = require("mongoose");

const SheetSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Please add a title for the sheet"],
      maxlength: 100,
    },
    description: {
      type: String,
      maxlength: 1000,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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

module.exports = mongoose.model("Sheet", SheetSchema);
