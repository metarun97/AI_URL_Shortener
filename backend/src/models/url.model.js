// Impoted items:-
import mongoose from "mongoose";

// urlSchema created:-
const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
    trim: true,
  },

  shortCode: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  isUrlSafe: {
    type: Boolean,
    required: [true, "URL safety is required"],
    default: null,
  },

  risk: {
    type: String,
    enum: ["low", "medium", "high"],
    required: true,
    default: null,
  },

  aiReason: {
    type: String,
    required: [true, "aiReason is required"],
    default: null,
  },

  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },

  clicks: {
    type: Number,
    default: 0,
  },
},
  { timestamps: true }
);

// urlModel created:-
const urlModel = mongoose.model("shortUrl", urlSchema);

export default urlModel;

