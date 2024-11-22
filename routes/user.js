const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/user.js');
const router = express.Router();

// Registration 
router.post('/register', async (req, res) => {
    const { username ,email, password } = req.body;

    if ( !username ||!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already registered' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(200).json({ success: true, message: 'User registered successfully' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Login 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email and password are required' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }

        res.status(200).json({ success: true, message: 'Login successful' });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// liat user registrasi
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find(); 
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error retrieving users' });
    }
});

// hapus user registrasi
router.delete('/deleteUser/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

module.exports = router;
