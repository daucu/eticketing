const mongoose = require("mongoose");

//Schema
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    about: {
        type: String,
        required: true,
    },
    logo: {
        type: String,
    },
    address: {
        type: String,
    },
    funding_date: {
        type: String,
    },
    phone: {
        type: String,
    },
    country: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("brand", BrandSchema);
