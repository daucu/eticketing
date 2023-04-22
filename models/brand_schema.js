const mongoose = require("mongoose");

//Schema
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
    },
    description: {
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
        unique: true,
    },
    country: {
        type: String,
    },
}, { timestamps: true });

module.exports = mongoose.model("brand", BrandSchema);
