import mongoose from "mongoose";

import bcrypt from "bcrypt";
import crypto from "crypto";
import { type } from "os";

import jwt from "jsonwebtoken";
const userSchema = mongoose.Schema({
  fullName: {
    type: String,
  },
  email: {
    type: String,
    required: [true, "email is Required"],
  },
  password: {
    type: String,
    required: [true, "pass is required"],
    minLength: [8, "  max is 16"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  resume: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generateJsonWebToken = function () {
  const token = jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET_KEY || "default_secret_key",
    {
      expiresIn: process.env.JWT_EXPIRES_IN || "5d",
    }
  );
  return token;
};

userSchema.methods.getResetPasswordToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");

  
  this.resetPasswordToken = crypto
    .createHash("sha256") 
    .update(resetToken)
    .digest("hex");

  
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000; // 15 minutes

  return resetToken;
};

export const user = mongoose.model("User", userSchema);
