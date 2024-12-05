const express = require('express');
const CookingClass = require('../model/class'); // model
const router = express.Router();

// Mengambil semua kelas masak
router.get('/classes', async (req, res) => {
    try {
        const classes = await CookingClass.find().sort({ createdAt: -1 }); 
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cooking classes', error });
    }
});

// Menghapus kelas masak
router.delete('/delete/:id', async (req, res) => {
    try {
        const classId = req.params.id;
        const deletedClass = await CookingClass.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({ message: 'Class not found' });
        }

        res.status(200).json({ message: 'Class deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting class', error });
    }
});

module.exports = router;
