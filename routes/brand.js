const express = require('express');
const router = express.Router();
const BrandSchema = require('./../models/brand_schema');

router.get('/', async (req, res) => {
    try {
        const brand = await BrandSchema.find();
        res.status(200).json(brand);
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

router.post('/add', async (req, res) => {
    const brand = new BrandSchema({
        name: req.body.name,
        description: req.body.description,
        image: req.body.image,
    });
    try {
        const savedBrand = await brand.save();
        res.status(200).json({ message: "Brand added successfully" });
    } catch (error) {
        res.status(500).json({ message: error });
    }
});

module.exports = router;