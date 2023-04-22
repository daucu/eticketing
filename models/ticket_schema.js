require('dotenv').config();
const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
    brand: {
        type: String,
        required: true
    },
    requester: {
        type: String,
        required: true
    },
    assignee: {
        type: String,
        required: true
    },
    form: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        required: true
    },
    type_of_issue: {
        type: String,
        required: true
    },
    impact: {
        type: String,
    },
    subject: {
        type: String,
        required: true
    },
    image: {
        type: String,
    },
    image_link: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['unresolved', 'resolved', 'unassigned'],
        default: 'unassigned'
    },

}, { timestamps: true });
module.exports = mongoose.model('tickets', ticketSchema);