const express = require("express");
const router = express.Router();
const UsersSchema = require("./../models/users");
const bcrypt = require("bcryptjs");


//create users
router.post("/", async(req, res) => {
    const { name, email, password,  } = req.body;

    // //generate random userid
    // const userid =
    //     Math.random().toString(36).substring(2, 15) +
    //     Math.random().toString(36).substring(2, 15);

    //Hash password
    const hashed_password = await bcrypt.hash(password, 10);
    

    //Save user to database
    const save_user = new UsersSchema({
        name,
        email,
        password: hashed_password,
      
    });
    try { 
        await save_user.save();
        res.status(200).json({
            message: "User created successfully",
        });
    } catch (error) {
        res.status(400).json({ message: error.message, status: "error" });
    }
});

module.exports = router;