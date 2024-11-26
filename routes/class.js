const express = require('express');
const CookingClass = require('../model/class');
const User = require('../model/user');
const { isAuthenticated } = require('../middleware/authMiddleware');
const router = express.Router();

// Create: Mendaftar kelas memasak
router.post('/', isAuthenticated, async (req, res) => {
    const { name, email, date, time } = req.body;

    try {
        // Validasi email user terdaftar
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email not registered' });
        }

        // Buat kelas
        const cookingClass = new CookingClass({
            userId: req.user._id,
            name,
            email,
            date,
            time
        });
        await cookingClass.save();

        res.status(201).json({ success: true, message: 'Cooking class registered', cookingClass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Read: Melihat kelas yang sudah didaftarkan user
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const classes = await CookingClass.find({ userId: req.user._id });
        res.status(200).json({ success: true, classes });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Update: Mengganti jadwal kelas
router.put('/:id', isAuthenticated, async (req, res) => {
    const { date, time } = req.body;

    try {
        const cookingClass = await CookingClass.findById(req.params.id);

        if (!cookingClass || cookingClass.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        cookingClass.date = date || cookingClass.date;
        cookingClass.time = time || cookingClass.time;
        await cookingClass.save();

        res.status(200).json({ success: true, message: 'Class updated', cookingClass });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete: Menghapus jadwal kelas
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const cookingClass = await CookingClass.findById(req.params.id);

        if (!cookingClass || cookingClass.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ success: false, message: 'Class not found' });
        }

        await cookingClass.deleteOne();
        res.status(200).json({ success: true, message: 'Class deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
