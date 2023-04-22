const express = require('express');
const router = express.Router();
const create_ticket = require('./../models/ticket_schema');
const path = require('path');
const CheckAuth = require("./../functions/check_auth");

//Create ticket route
router.post("/", async (req, res) => {

    //Check file upload
    if (!req.files) {
        return res.status(400).json({ message: "No file uploaded" });
    }

    const check = await CheckAuth(req, res);

    if (check.auth === false) {
        return res.status(401).json({ message: "Unauthorized", auth: false });
    }


    //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
    let image_link1 = req.files.image_link;
    //Use the mv() method to place the file in upload directory (i.e. "uploads")
    image_link1.mv('./uploads/' + image_link1.name);
    console.log(image_link1.name);

    //Get ticket fields
    const { brand, requester, assignee, form, type, priority, type_of_issue, impact, subject, description, status } = req.body;
    const ticket = new create_ticket({
        brand: brand,
        requester: check.data._id,
        assignee: assignee,
        form: form,
        type: type,
        priority: priority,
        type_of_issue: type_of_issue,
        impact: impact,
        subject: subject,
        image: image_link1.name,
        image_link: req.protocol + "://" + req.get("host") + "/" + image_link1.name,
        description: description,
        status: status
    });

    //Save ticket
    await ticket.save();
    res.status(200).json({
        message: "Ticket created successfully"
    });
});

//Get my tickets
router.get("/mytickets", async (req, res) => {

    const check = await CheckAuth(req, res);

    if (check.auth === false) {
        return res.status(401).json({ message: "Unauthorized", auth: false });
    }

    try {
        const tickets = await create_ticket.find({ requester: check.data._id });
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message, message: "something went wrong" });
    }
});


module.exports = router;    