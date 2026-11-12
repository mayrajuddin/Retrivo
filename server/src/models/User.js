
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    googleId: {
  type: String,
  unique: true,
  sparse: true,
  default: undefined,
},

    password: {
      type: String,
      select: false,
      required: function () {
        return this.authProvider === "email";
      },
    },

    phone: {
      type: String,
      trim: true,
      default: "",
    },

    photoURL: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    status: {
      type: String,
      enum: ["active", "blocked"],
      default: "active",
    },

    authProvider: {
      type: String,
      enum: ["email", "google"],
      default: "email",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
