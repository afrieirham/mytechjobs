import { Schema, model, models } from "mongoose";

const userSchema = Schema(
  {
    headline: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    bio: {
      type: String,
    },
    positions: {
      type: Array,
    },
    status: {
      type: String,
      required: true,
      default: "invisible",
    },
    jobTypes: {
      type: Array,
    },
    jobLevels: {
      type: Array,
    },
    arrangements: {
      type: Array,
    },
    locations: {
      type: Array,
    },
    availableDate: {
      type: Date,
    },
    website: {
      type: String,
    },
    github: {
      type: String,
    },
    linkedin: {
      type: String,
    },
    jobAlerts: {
      type: Boolean,
      required: true,
      default: false,
    },
    superTokensId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export const User = models?.User || model("User", userSchema);
