const express = require('express');
const CookingClass = require('../model/class');
const { authenticateUser } = require('../middleware/authuser.js');
const router = express.Router();
 
// Pembuatan post book
router.post('/book', authenticateUser, async (req, res) => {
    const { name, date, time } = req.body;

    if (!name || !date || !time) {
        return res.status(400).json({ success: false, message: 'All fields are required.' });
    }

    if (!/^([01]\d|2[0-3]):([0-5]\d)$/.test(time)) {
        return res.status(400).json({ success: false, message: 'Time format is invalid.' });
    }
    
    const email = req.user.email;
    const newClass = new CookingClass({ name, email, date, time });
    await newClass.save();

    res.status(201).json({ success: true, message: 'Successfully registered for the class.' });
});

 
module.exports = router;