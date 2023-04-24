const express = require("express");
const router = express.Router();
const create_ticket = require("./../models/ticket_schema");
const path = require("path");
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
  //Remove old name and give new string name to file
  image_link1.name = Date.now() + path.extname(image_link1.name);
  image_link1.mv("./uploads/" + image_link1.name);

  //Get ticket fields
  const ticket = new create_ticket({
    ticket_no: req.body.ticket_no,
    priority: req.body.priority,
    subject: req.body.subject,
    description: req.body.description,
    requester: check.data._id,
    brand: "no_data",
    assignee: "no_data",
    form: "no_data",
    type: "no_data",
    type_of_issue: "no_data",
    impact: "no_data",
    image: image_link1.name,
    status: "active",
  });

  //Save ticket
  await ticket.save();
  res.status(200).json({
    message: "Ticket created successfully",
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
    res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
});

//Get ticket by Id
router.get("/:ticketId", async (req, res) => {
  const check = await CheckAuth(req, res);

  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", auth: false });
  }

  try {
    const ticket = await create_ticket.findById(req.params.ticketId);
    if (ticket.requester == check.data._id) {
      res.status(200).json(ticket);
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
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
      await create_ticket.deleteOne({ _id: req.params.ticketId });
      res.status(200).json({ message: "Ticket deleted successfully" });
    } else {
      res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
});

module.exports = router;
