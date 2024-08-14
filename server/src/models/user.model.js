import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "user name is required"],
      unique: [true, "user name must be unique"],
    },
    userPassword: {
      type: String,
      required: [true, "user name is required"],
      unique: [true, "user name must be unique"],
    },
    startTime: {
      type: Date,
    },
    lastTime: {
      type: Date,
    },
    userType: {
      type: String,
      default: "examinee",
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model("User", userSchema);
