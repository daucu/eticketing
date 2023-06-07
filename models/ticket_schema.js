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
    image: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
    },
    requester: {
      type: String,
    },
    assignee: {
      type: String,
    },
    form: {
      type: String,
    },
    type: {
      type: String,
    },
    type_of_issue: {
      type: String,
    },
    impact: {
      type: String,
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
