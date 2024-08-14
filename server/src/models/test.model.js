import mongoose, { Schema } from "mongoose";

const testSchema = new Schema(
  {
    userName: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    recording: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const Like = mongoose.model("test", testSchema);
