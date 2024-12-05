const express = require('express');
const CookingClass = require('../model/class'); // model
const { authenticateUser } = require('../middleware/authuser'); // middleware
const router = express.Router();

// Register for a cooking class
router.post('/book', authenticateUser, async (req, res) => {
    const { name, date, time } = req.body;
 
    if (!name || !date || !time) {
        return res.status(400).json({ success: false, message: 'Harus diisi semua' });
    }
   
    const email = req.user.email;
    const newClass = new CookingClass({ name, email, date, time });
    await newClass.save();
 
    res.status(201).json({ success: true, message: 'Berhasil menambahkan jadwal class cooking' });
});

// Get user classes
router.get('/classes', authenticateUser, async (req, res) => {
    try {
        const messages = await CookingClass.find({ email: req.user.email }).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi kesalahan mengirim pesan', error });
    }
});


// Update class details
router.put('/update/:id', authenticateUser, async (req, res) => {
    try {
        const classId = req.params.id;
        const { name, date, time } = req.body;

        if (!name || !date || !time) {
            return res.status(400).json({ success: false, message: 'Harus diisi semua' });
        }

        const updatedClass = await CookingClass.findOneAndUpdate(
            { _id: classId, email: req.user.email }, 
            { name, date, time },
            { new: true }
        );
        

        if (!updatedClass) {
            return res.status(404).json({ success: false, message: 'Class cooking tidak ditemukan' });
        }
        

        res.status(200).json({ success: true, message: 'Class cooking berhasil di update', data: updatedClass });
    } catch (error) {
        console.error('Terjadi kesalahan pada update', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan dari server' });
    }
});

// Delete a class
router.delete('/delete/:id', authenticateUser, async (req, res) => {
    try {
        const classId = req.params.id;

        const deletedClass = await CookingClass.findOneAndDelete({
            _id: classId,
            userId: req.user._id,
        });

        if (!deletedClass) {
            return res.status(404).json({ success: false, message: 'Tidak ditemukan jadwal class cooking' });
        }

        res.status(200).json({ success: true, message: 'Jadwal class cooking berhasil di batalkan' });
    } catch (error) {
        console.error('Terjadi kesalahan pada delete', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan dari server' });
    }
});

module.exports = router;
