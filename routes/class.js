const express = require('express');
const CookingClass = require('../model/class');
const { authenticateUser } = require('../middleware/authuser');
const router = express.Router();

// Register for a cooking class
router.post('/book', authenticateUser, async (req, res) => {
    const { name, date, time } = req.body;
 
    if (!name || !date || !time) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
   
    const email = req.user.email;
    const newClass = new CookingClass({ name, email, date, time });
    await newClass.save();
 
    res.status(201).json({ success: true, message: 'Successfully registered for the class.' });
});

// Get user classes
router.get('/classes', authenticateUser, async (req, res) => {
    try {
        const messages = await CookingClass.find({ email: req.user.email }).sort({ createdAt: -1 });
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching your messages', error });
    }
});


// Update class details
router.put('/update/:id', authenticateUser, async (req, res) => {
    try {
        const classId = req.params.id;
        const { name, date, time } = req.body;

        if (!name || !date || !time) {
            return res.status(400).json({ success: false, message: 'All fields are required.' });
        }

        const updatedClass = await CookingClass.findOneAndUpdate(
            { _id: classId, email: req.user.email }, 
            { name, date, time },
            { new: true }
        );
        

        if (!updatedClass) {
            return res.status(404).json({ success: false, message: 'Class not found or unauthorized.' });
        }
        

        res.status(200).json({ success: true, message: 'Class updated successfully.', data: updatedClass });
    } catch (error) {
        console.error('Error updating class:', error);
        res.status(500).json({ success: false, message: 'Server error while updating class.' });
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
            return res.status(404).json({ success: false, message: 'Class not found or unauthorized.' });
        }

        res.status(200).json({ success: true, message: 'Class registration cancelled successfully.' });
    } catch (error) {
        console.error('Error deleting class:', error);
        res.status(500).json({ success: false, message: 'Server error while deleting class.' });
    }
});

module.exports = router;
