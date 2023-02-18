import { Schema, model, models } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    superTokensId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = models.User || model("User", userSchema);
