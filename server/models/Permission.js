import mongoose from "mongoose";

import ErrorResponse from "../utils/errorResponse";
import httpStatus from "http-status";

const PermissionSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["view", "edit", "admin"],
      default: "view",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required."],
    },
    sheet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Sheet",
      required: [true, "Sheet is required."],
    },
  },
  { timestamps: true },
);

// validates if permission of a user with a sheet already exists
PermissionSchema.pre("validate", async function (next) {
  const permission = await mongoose
    .model("Permission", PermissionSchema)
    .findOne({ sheet: this.sheet, user: this.user });

  if (permission) {
    return next(
      new ErrorResponse(
        "Permission of this user with this sheet already exists",
        httpStatus.NOT_FOUND,
      ),
    );
  }

  next();
});

export default mongoose.model("Permission", PermissionSchema);
