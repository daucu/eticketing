const express = require("express");
const router = express.Router();
const create_ticket = require("./../models/ticket_schema");
const path = require("path");
const CheckAuth = require("./../functions/check_auth");

//Get all ticket
router.get("/all", async (req, res) => {
  try {
    const tickets = await create_ticket.find().populate({
      path: "requester",
      select: "name email full_name",
    });
    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
});

//Get ticket by ID
router.get("/:id", async (req, res) => {
  try {
    const ticket = await create_ticket.findById(req.params.id).populate({
      path: "requester",
      select: "name email full_name",
    });
    res.status(200).json(ticket);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
});

//Create ticket route
router.post("/", async (req, res) => {
  var uploaded_file;

  //Check file upload
  if (!req.files) {
    //Set uploaded file to null
    uploaded_file = null;
  } else {
    //Set uploaded file to file name
    uploaded_file = req.files.attachment.name;

    let attachment1 = req.files.attachment;
    //Remove old name and give new string name to file
    attachment1.name = Date.now() + path.extname(attachment1.name);
    attachment1.mv("./uploads/" + attachment1.name);
  }

  const check = await CheckAuth(req, res);

  if (check.auth === false) {
    return res.status(401).json({ message: "Unauthorized", auth: false });
  }

  //Generate ticket number
  const ticket_no = Math.floor(Math.random() * 1000000000);

  //Get ticket fields
  const ticket = new create_ticket({
    ticket_no: ticket_no,
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
    attachment: uploaded_file,
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

//Get all ticket
router.get("/", async (req, res) => {
  try {
    const check = await CheckAuth(req, res);

    if (check.auth === false) {
      return res.status(401).json({ message: "Unauthorized", auth: false });
    }

    if (check.data.role !== "super_admin") {
      return res
        .status(401)
        .json({ message: "You Are Not Super Admin", auth: false });
    }

    const tickets = await create_ticket.find().populate({
      path: "requester",
      select: "name email full_name",
    });
    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
});

//Get ticket by status
router.get("/status/:status", async (req, res) => {
  try {
    const check = await CheckAuth(req, res);

    if (check.auth === false) {
      return res.status(401).json({ message: "Unauthorized", auth: false });
    }

    if (check.data.role !== "super_admin") {
      return res
        .status(401)
        .json({ message: "You Are Not Super Admin", auth: false });
    }

    const tickets = await create_ticket.find({ status: req.params.status });
    res.status(200).json(tickets);
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
});

//Update ticket status
router.put("/status/:ticketId", async (req, res) => {
  //Check if status is not available
  if (req.body.status !== "closed") {
    return res.status(400).json({ message: "Invalid status" });
  }

  try {
    const check = await CheckAuth(req, res);

    if (check.auth === false) {
      return res.status(401).json({ message: "Unauthorized", auth: false });
    }

    if (check.data.role !== "super_admin") {
      return res
        .status(401)
        .json({ message: "You Are Not Super Admin", auth: false });
    }

    const ticket = await create_ticket.findById(req.params.ticketId);
    if (ticket) {
      await create_ticket.updateOne(
        { _id: req.params.ticketId },
        { $set: { status: req.body.status } }
      );
    } else {
      res.status(404).json({ message: "Ticket not found" });
    }

    res.status(200).json({ message: "Ticket status updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: error.message, message: "something went wrong" });
  }
});

module.exports = router;
