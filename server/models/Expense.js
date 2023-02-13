import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const ExpenseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: [true, "Title is required."],
      maxlength: [100, "Title can not be longer than 100 characters."],
    },
    type: {
      type: String,
      trim: true,
      required: [true, "Type is required."],
      maxlength: [100, "Type can not be longer than 100 characters."],
    },
    status: {
      type: String,
      required: [true, "Status is required."],
      enum: ["paid", "unpaid"],
    },
    amount: {
      type: Number,
      required: [true, "Amount is required."],
      min: [0, "Must be at least 0, got {VALUE}"],
    },
    amountType: {
      type: String,
      required: [true, "Amount type is required."],
      enum: ["incoming", "outgoing"],
    },
    sheet: {
      type: ObjectId,
      ref: "Sheet",
      required: [true, "Sheet is required."],
      immutable: true,
    },
    owner: {
      type: ObjectId,
      ref: "User",
      required: [true, "User is required."],
      immutable: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("Expense", ExpenseSchema);
