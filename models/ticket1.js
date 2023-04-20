const mongoose = require('mongoose');
const ticketSchema1 = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['resolved', 'unresolved', 'unassigned', "inprogress"],
        default: 'unassigned'

    },
 
}, { timestamps: true });

module.exports = mongoose.model('users', ticketSchema1);