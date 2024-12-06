const express = require('express');
const Contact = require('../model/contact'); // model
const router = express.Router();

// Mengambil semua kontak
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi error saat fetch di contacts', error });
    }
});

// Menghapus kontak 
router.delete('/delete/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await Contact.findByIdAndDelete(contactId);
        
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact tidak ditemukan' });
        }

        res.status(200).json({ message: 'Berhasil menghapus contact' });
    } catch (error) {
        res.status(500).json({ message: 'Terjadi error dalam menghapus ', error });
    }
});

module.exports = router;
