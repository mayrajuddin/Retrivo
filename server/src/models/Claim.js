import mongoose from "mongoose";

const claimSchema = new mongoose.Schema(
  {
    item_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Item",
      required: true,
    },

    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    item_color: {
      type: String,
      required: true,
      trim: true,
    },

    unique_feature: {
      type: String,
      required: true,
      trim: true,
    },

    ownership_details: {
      type: String,
      required: true,
      trim: true,
    },
    lost_location: {
      type: String,
      required: true,
      trim: true,
    },

    lost_date: {
      type: Date,
      required: true,
    },

    lost_time: {
      type: String,
      trim: true,
      default: "",
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    claim_date: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    admin_note: {
      type: String,
      trim: true,
      default: "",
    },

    verified_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

const Claim = mongoose.model("Claim", claimSchema);

export default Claim;
