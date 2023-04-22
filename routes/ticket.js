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

    let image_link1 = req.files.image_link;
    image_link1.mv('./uploads/' + image_link1.name);

    //Get ticket fields
    const { brand, assignee, form, type, priority, type_of_issue, impact, subject, description } = req.body;
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
        status: "active"
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

//Delete ticket
router.delete("/:ticketId", async (req, res) => {

    const check = await CheckAuth(req, res);

    if (check.auth === false) {
        return res.status(401).json({ message: "Unauthorized", auth: false });
    }

    try {
        const ticket = await create_ticket.findById(req.params.ticketId);
        if (ticket.requester == check.data._id) {
            await ticket.remove();
            res.status(200).json({ message: "Ticket deleted successfully" });
        } else {
            res.status(401).json({ message: "Unauthorized" });
        }
    } catch (error) {
        res.status(500).json({ error: error.message, message: "something went wrong" });
    }
});

module.exports = router;