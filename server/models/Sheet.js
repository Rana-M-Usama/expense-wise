const mongoose = require("mongoose");

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

module.exports = mongoose.model("Sheet", SheetSchema);
