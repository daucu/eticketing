const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcryptjs");

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to the API",
    });
});

//User Login
router.post("/", async(req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UsersSchema.findOne({ email }).lean();
        if (!user)
            return res
                .status(400)
                .json({ message: "User and password is wrong.", status: "warning" });
        const hashpass = user.password;
        if (!bcrypt.compareSync(password, hashpass))
            return res
                .status(400)
                .json({ message: "User and password is wrong.", status: "warning" });

        //create and assign token
        const token = jwt.sign({
                _id: user._id,
              
            },
            process.env.JWT_SECRET, {
                algorithm: "HS256",
            }
        );
        

        //Set cookie
        res.cookie("auth_token", token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 24 * 300,
            sameSite: "none",
            secure: true,
        }); //300 days

        res.setHeader("x-auth-token", token);
        res.cookie("auth_token", token)

        res.status(200).json({ message: "Login Successful", status: "success", token: token });
    } catch (error) {
        res.status(500).json({ message: error.message, status: "error" });
    }
});

module.exports = router;
