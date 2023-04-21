const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users_schema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const CheckAuth = require("./../functions/check_auth");

//Get Profile
router.get("/", async (req, res) => {

  const check = await CheckAuth(req, res);
  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", data: null, auth: false });
  } else {
    return res.status(200).json({ message: "Authorized", data: check.data, auth: true });
  }
});

module.exports = router;
