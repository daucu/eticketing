require("dotenv").config();
const mongoose = require("mongoose");

const ticketSchema = new mongoose.Schema(
  {
    ticket_no: {
      type: Number,
      required: true,
      unique: true,
    },
    priority: {
      type: String,
      enum: ["p1", "p2", "p3"],
      default: "p3",
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      require: true,
    },
    attachment: {
      type: Array,
    },
    brand: {
      type: String,
      default: "no_data",
    },
    requester: {
      type: String,
      default: "no_data",
      ref: "users",
    },
    assignee: {
      type: String,
      default: "no_data",
    },
    form: {
      type: String,
      default: "no_data",
    },
    type: {
      type: String,
      default: "no_data",
    },
    type_of_issue: {
      type: String,
      default: "no_data",
    },
    impact: {
      type: String,
      default: "no_data",
    },
    status: {
      type: String,
      enum: ["unsolved", "closed"],
      default: "unsolved",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("tickets", ticketSchema);
