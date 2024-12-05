const express = require('express');
const CookingClass = require('../model/class'); // model
const router = express.Router();

// Mengambil semua kelas masak
router.get('/classes', async (req, res) => {
    try {
        const classes = await CookingClass.find().sort({ createdAt: -1 }); 
        res.status(200).json(classes);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi error saat fetch di cooking class', error });
    }
});

// Menghapus kelas masak
router.delete('/delete/:id', async (req, res) => {
    try {
        const classId = req.params.id;
        const deletedClass = await CookingClass.findByIdAndDelete(classId);

        if (!deletedClass) {
            return res.status(404).json({ message: 'Class cooking tidak ditemukan' });
        }

        res.status(200).json({ message: 'Berhasil menghapus jadwal' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan dalam menghapus', error });
    }
});

module.exports = router;
