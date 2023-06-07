const mongoose = require("mongoose");

//Schema
const UsersSchema = new mongoose.Schema(
  {
    full_name: {
      type: String,
    },
    dp: {
      type: String,
      required: true,
    },
    title: {
      type: String,
    },
    about: {
      type: String,
    },
    phone: {
      type: String,
    },
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    language: {
      type: String,
    },
    country: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "admin", "hod", "super_admin"],
      default: "user",
    },
    rpt: {
      //Reset password token
      type: String,
    },
    otp: {
      //One time password
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("users", UsersSchema);
