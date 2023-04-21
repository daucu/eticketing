const express = require('express');
const router = express.Router();
const ticketSchema1 = require('./../models/ticket_schema');
// const users_schema = require('./../models/users');
const jwt= require("jsonwebtoken")

router.post("/", async(req, res) => {
    console.log(req.headers.authorization)
    const token = req.headers.authorization || req.body.token || req.headers['x-auth-token'];
    // console.log(token)
    if (!token) {
        return res.status(401).json({ message: "Access denied. Please register first", status: "error" });
    }
    const valid_token = jwt.verify(token, process.env.JWT_SECRET, {
        expiresIn: "1y", 
        algorithm: "HS256"
    });
    if (!valid_token) return res.status(401).json({ message: "Invalid token" });
    const id_from_token = valid_token._id;

    const { title, description, status } = req.body;
    try {
        let create_blog = new ticketSchema1({
            user: id_from_token,
            title,
            description,
            status
        });
        // let user= await users_schema.findById(id_from_token);
        // user.blog= create_blog._id;
        
        // await user.save();
        await create_blog.save();
        
        res.status(200).json({ message: "ticket created successfully", data: create_blog });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Server error");
    }

});

module.exports = router;