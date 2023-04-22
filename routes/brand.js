const express = require('express');
const router = express.Router();
const BrandSchema = require('./../models/brand_schema');
const CheckAuth = require("./../functions/check_auth");

router.get('/', async (req, res) => {
    try {
        const brand = await BrandSchema.find();
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post('/', async (req, res) => {

    const check = await CheckAuth(req, res);

    if (check.auth === false) {
        return res.status(401).json({ message: "Unauthorized", auth: false });
    }

    if (check.data.role !== "admin") {
        return res.status(401).json({ message: "You Are Not Admin", auth: false });
    }

    const brand = new BrandSchema({
        name: req.body.name,
        description: req.body.description,
        logo: req.body.logo,
        address: req.body.address,
        funding_date: req.body.funding_date,
        phone: req.body.phone,
        country: req.body.country,
    });
    try {
        const savedBrand = await brand.save();
        res.status(200).json({ message: "Brand added successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

module.exports = router;