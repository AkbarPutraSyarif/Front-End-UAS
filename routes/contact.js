const express = require('express');
const Contact = require('../model/contact.js'); // model
const { authenticateUser } = require('../middleware/authuser.js'); // middleware
const router = express.Router();

router.post('/send', authenticateUser, async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ success: false, message: 'Nama dan message diperlukan' });
        }

        const email = req.user.email;

        const newMessage = new Contact({ name, email, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: 'berhasil terkirim' });
    } catch (error) {
        console.error('Terjadi error saat menyimpan data', error);
        res.status(500).json({ success: false, message: 'Terjadi kesalahan server' });
    }
});

// Ambil pesan 
router.get('/messages', authenticateUser, async (req, res) => {
    try {
        const messages = await Contact.find({ email: req.user.email }).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Terjadi error saat fetch di contact ', error });
    }
});

// Update message 
router.put('/update/:id', authenticateUser, async (req, res) => {
    try {
        const messageId = req.params.id;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message diperlukan' });
        }

        const updatedMessage = await Contact.findOneAndUpdate(
            { _id: messageId, email: req.user.email }, 
            { message },
            { new: true } 
        );

        if (!updatedMessage) {
            return res.status(404).json({ success: false, message: 'Message tidak ditemukan' });
        }

        res.status(200).json({ success: true, message: 'Berhasil diupdate', data: updatedMessage });
    } catch (error) {
        console.error('Error dalam update message', error);
        res.status(500).json({ success: false, message: 'Server terjadi error' });
    }
});

//Delete Message
router.delete('/delete/:id', authenticateUser, async (req, res) => {
    try {
        const messageId = req.params.id;

      
        const deletedMessage = await Contact.findOneAndDelete({
            _id: messageId,
            email: req.user.email, 
        });

        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: 'Message tidak ditemukan' });
        }

        res.status(200).json({ success: true, message: 'Berhasil menghapus message' });
    } catch (error) {
        console.error('Terjadi kesalahan saat menghapus', error);
        res.status(500).json({ success: false, message: 'Server terjadi error' });
    }
});


module.exports = router;
