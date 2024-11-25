const express = require('express');
const Contact = require('../model/contact');

const router = express.Router();

router.post('/send', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        console.log('Received data:', req.body); // Debug data dari frontend

        if (!name || !email || !message) {
            console.log('Validation failed: Missing fields'); // Debug validasi
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const newMessage = new Contact({ name, email, message });
        await newMessage.save();

        console.log('Message saved successfully'); // Debug penyimpanan
        res.status(201).json({ success: true, message: 'Your message has been sent successfully.' });
    } catch (error) {
        console.error('Error:', error); // Debug error lainnya
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});

router.get('/messages', async (req, res) => {
    try {
        const messages = await Contact.find().sort({ createdAt: -1 }); // Urutkan dari terbaru
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching contact messages', error });
    }
});

router.delete('/messages/:id', async (req, res) => {
    try {
        const { id } = req.params; // ID dari parameter URL

        console.log('Deleting message with ID:', id); // Debug ID pesan

        const deletedMessage = await Contact.findByIdAndDelete(id); // Hapus berdasarkan ID

        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: 'Message not found.' });
        }

        console.log('Message deleted successfully'); // Debug keberhasilan
        res.json({ success: true, message: 'Message deleted successfully.' });
    } catch (error) {
        console.error('Error deleting message:', error); // Debug error
        res.status(500).json({ success: false, message: 'Server error.' });
    }
});



module.exports = router;
