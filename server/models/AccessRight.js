import mongoose from "mongoose";

import ErrorResponse from "../utils/errorResponse";
import httpStatus from "http-status";

const AccessRightSchema = new mongoose.Schema(
  {
    read: {
      type: Boolean,
      default: false,
    },
    update: {
      type: Boolean,
      default: false,
    },
    delete: {
      type: Boolean,
      default: false,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    sheet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sheet",
      required: true,
    },
  },
  { timestamps: true },
);

// validates if access right of a user with a sheet already exists
AccessRightSchema.pre("validate", async function (next) {
  if (
    await mongoose
      .model("AccessRight", AccessRightSchema)
      .findOne({ sheet: this.sheet, user: this.user })
  ) {
    return next(
      new ErrorResponse(
        "Access Right of this user with this sheet already exists",
        httpStatus.NOT_FOUND,
      ),
    );
  }

  next();
});

export default mongoose.model("AccessRight", AccessRightSchema);
