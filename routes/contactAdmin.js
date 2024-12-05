const express = require('express');
const Contact = require('../model/contact'); // model
const router = express.Router();

// Mengambil semua kontak
router.get('/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: -1 });
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contacts', error });
    }
});

// Menghapus kontak 
router.delete('/delete/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await Contact.findByIdAndDelete(contactId);
        
        if (!deletedContact) {
            return res.status(404).json({ message: 'Contact not found' });
        }

        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting contact', error });
    }
});

module.exports = router;
