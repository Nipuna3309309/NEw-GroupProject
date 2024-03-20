import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    message: {
      type: String,
      required: true
    },
    serviceType: {
      type: String,
      enum: ["good", "bad", "neutral"],
      required: true
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users", // Reference to the User model
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

export default mongoose.model("Feedback", feedbackSchema);
