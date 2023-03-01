import bcrypt from "bcryptjs";
import crypto from "crypto";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      required: [true, "First name is required."],
      maxlength: [50, "First name can not be longer than 50 characters."],
      match: [/^[A-Za-z ]+$/, "First name can only contain alphabets."],
    },
    lastName: {
      type: String,
      trim: true,
      required: [true, "Last name is required."],
      maxlength: [50, "Last name can not be longer than 50 characters."],
      match: [/^[A-Za-z ]+$/, "Last name can only contain alphabets."],
    },
    email: {
      type: String,
      required: [true, "Email is required."],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email.",
      ],
    },
    imageUrl: {
      type: String,
      default: "",
    },
    isGoogleUser: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      select: false,
      required: [
        function () {
          return !this.isGoogleUser;
        },
        "Password is required.",
      ],
      default() {
        if (this.isGoogleUser) {
          return "";
        }
      },
      match: [
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z\d@$!%*#?&-]{6,}$/,
        "Please provide a valid password, minimum six characters, " +
          "at least one capital letter and a number.",
      ],
    },

    confirmed: {
      type: Boolean,
      default: false,
    },
    confirmEmailToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true },
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.getSignedJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

UserSchema.methods.matchPassword = async function (enteredPassword) {
  const isEqual = await bcrypt.compare(enteredPassword, this.password);
  return isEqual;
};

UserSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set expire - expire after 10 minutes
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

export default mongoose.model("User", UserSchema);
