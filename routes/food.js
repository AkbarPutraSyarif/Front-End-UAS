const express = require('express');
const router = express.Router();
const Food = require('../model/food');

// POST: Tambahin Food
router.post('/', async (req, res) => {
    const { title, image, rating,description, category, url } = req.body;

    try {
        const newFood = new Food({ title, image, rating, description, category, url });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (err) {
        res.status(400).json({ error: 'Failed to add food', details: err });
    }
});

// Get: Lihat Food
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch foods', details: err });
    }
});

// PUT: Update Food
router.put('/:id', async (req, res) => {
    try {
        const updatedFood = await Food.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(updatedFood);
    } catch (err) {
        res.status(400).json({ error: 'Failed to update food', details: err });
    }
});

// DELETE: Delete food
router.delete('/:id', async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ message: 'Food deleted successfully' });
    } catch (err) {
        res.status(500).json({ error: 'Failed to delete food', details: err });
    }
});


module.exports = router;
