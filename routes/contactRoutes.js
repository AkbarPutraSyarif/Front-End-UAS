const express = require('express');
const Contact = require('../model/contact');
const { authenticateUser } = require('../middleware/authuser.js');
const router = express.Router();

router.post('/send', authenticateUser, async (req, res) => {
    try {
        const { name, message } = req.body;

        if (!name || !message) {
            return res.status(400).json({ success: false, message: 'Name and message are required.' });
        }

        const email = req.user.email;

        const newMessage = new Contact({ name, email, message });
        await newMessage.save();

        res.status(201).json({ success: true, message: 'Your message has been sent successfully.' });
    } catch (error) {
        console.error('Error in saving contact message:', error);
        res.status(500).json({ success: false, message: 'Server error while saving message.' });
    }
});

// Ambil pesan 
router.get('/messages', authenticateUser, async (req, res) => {
    try {
        const messages = await Contact.find({ email: req.user.email }).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your messages', error });
    }
});

// Update message 
router.put('/update/:id', authenticateUser, async (req, res) => {
    try {
        const messageId = req.params.id;
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ success: false, message: 'Message content is required.' });
        }

        const updatedMessage = await Contact.findOneAndUpdate(
            { _id: messageId, email: req.user.email }, 
            { message },
            { new: true } 
        );

        if (!updatedMessage) {
            return res.status(404).json({ success: false, message: 'Message not found or unauthorized.' });
        }

        res.status(200).json({ success: true, message: 'Message updated successfully.', data: updatedMessage });
    } catch (error) {
        console.error('Error updating message:', error);
        res.status(500).json({ success: false, message: 'Server error while updating message.' });
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
            return res.status(404).json({ success: false, message: 'Message not found or unauthorized.' });
        }

        res.status(200).json({ success: true, message: 'Message deleted successfully.' });
    } catch (error) {
        console.error('Error deleting message:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting message.' });
    }
});


module.exports = router;
