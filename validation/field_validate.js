const tickets= require('../models/ticket');

exports.ticket_field= async (req, res,next) => {
    const {brand, requester, assignee, cc, form, type, priority, type_of_issue, type_of_issue_country, impact, subject, image, description, status} = req.body;

    try {
        if(!brand){
            return res.status(400).json({message: "Brand is required"});
        }
        if(!requester){
            return res.status(400).json({message: "Requester is required"});
        }
        if(!assignee){
            return res.status(400).json({message: "Assignee is required"});
        }
        if(!form){
            return res.status(400).json({message: "Form is required"});
        }
        if(!type){
            return res.status(400).json({message: "Type is required"});
        }
        if(!priority){
            return res.status(400).json({message: "Priority is required"});
        }
        if(!type_of_issue){
            return res.status(400).json({message: "Type of issue is required"});
        }
        if(!type_of_issue_country){
            return res.status(400).json({message: "Type of issue country is required"});
        }
        if(!subject){
            return res.status(400).json({message: "Subject is required"});
        }
        if(!description){
            return res.status(400).json({message: "Description is required"});
        }
        next();
    } catch (error) {
        res.status(500).json({ error: error.message, message:"something went wrong" });
    }
}
