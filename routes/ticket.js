const express = require('express');
const router = express.Router();
const create_ticket = require('./../models/ticket');
const {ticket_field} = require('./../validation/field_validate');
const path = require('path');

router.post("/",ticket_field,  async(req, res) => {
 try {
    if(!req.files ){
        return res.status(400).json({message: "No file uploaded"});
    }
    else{
        //Use the name of the input field (i.e. "avatar") to retrieve the uploaded file
        let image_link1 = req.files.image_link;
               //Use the mv() method to place the file in upload directory (i.e. "uploads")
               image_link1.mv('./uploads/' + image_link1.name);
               console.log(image_link1.name);
    
    
    const {brand, requester, assignee, cc, form, type, priority, type_of_issue, type_of_issue_country, impact, subject, image,image_link, description, status} = req.body;
    const ticket = new create_ticket({
        brand: brand,
        requester: requester,
        assignee: assignee,
        cc: cc,
        form: form,
        type: type,
        priority: priority,
        type_of_issue: type_of_issue,
        type_of_issue_country: type_of_issue_country,
        impact: impact,
        subject: subject,
        image: image_link1.name,
        image_link:req.protocol+"://"+req.get("host")+"/"+ image_link1.name,
        description: description,
        status: status
    });
    await ticket.save();
    res.status(200).json({
        message: "Ticket created successfully"
    });}
    

 } catch (error) {
    res.status(500).json({ error: error.message, message:"something went wrong" });
 }
});

//get all tickets
router.get("/", async(req, res) => {
    try {
        const tickets = await create_ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
});

//get single ticket
router.get("/:id", async(req, res) => {
    try {
        const ticket = await create_ticket.findById(req.params.id);
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
});

// get ticket where status is unresolved
router.get("/unresolved", async(req, res) => {
    try {
        const ticket = await create_ticket.findOne({status: "unresolved"});
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
});



//update status of ticket
router.put("/:id", async(req, res) => {
    try {
        const ticket = await create_ticket.findById(req.params.id);
        ticket.status = req.body.status;
        await ticket.save();
        res.status(200).json({message: "Ticket status updated successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
});

//delete ticket
router.delete("/:id", async(req, res) => {
    try {   
        const ticket = await create_ticket.findById(req.params.id);
        await ticket.remove();
        res.status(200).json({message: "Ticket deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
});

//delete all tickets
router.delete("/delete-all", async(req, res) => {
    try {   
        const ticket = await create_ticket.deleteMany();
        res.status(200).json({message: "All tickets deleted successfully"});
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
});

module.exports = router;    