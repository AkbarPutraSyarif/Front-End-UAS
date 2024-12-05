const express = require('express');
const router = express.Router();
const Food = require('../model/food');

// POST: Tambahin Food
router.post('/', async (req, res) => {
    const { title, image, rating, description, category, url } = req.body;

    try {
        const newFood = new Food({ title, image, rating, description, category, url });
        const savedFood = await newFood.save();
        res.status(201).json(savedFood);
    } catch (err) {
        if (err.name === 'ValidationError') {
            return res.status(400).json({ error: 'Validasi salah', details: err.errors });
        }
        res.status(400).json({ error: 'Gagal untuk menambahkan food', details: err });
    }
});


// Get: Lihat Food
router.get('/', async (req, res) => {
    try {
        const foods = await Food.find();
        res.json(foods);
    } catch (err) {
        res.status(500).json({ error: 'Terjadi error saat fetch di food', details: err });
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
        res.status(400).json({ error: 'Gagal mengupdate food', details: err });
    }
});

// DELETE: Delete food
router.delete('/:id', async (req, res) => {
    try {
        await Food.findByIdAndDelete(req.params.id);
        res.json({ message: 'Berhasil menghapus food' });
    } catch (err) {
        res.status(500).json({ error: 'Gagal menghapus food', details: err });
    }
});


module.exports = router;
