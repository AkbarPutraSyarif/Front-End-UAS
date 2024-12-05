const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../model/user.js'); // model ke user.js
const jwt = require('jsonwebtoken');
const router = express.Router();
require('dotenv').config();

// Post: Login 
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ success: false, message: 'Email dan password dibutuhkan' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: 'Email atau password tidak ditemukan' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ success: false, message: 'Password salah' });
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

        
        return res.status(200).json({ success: true, message: 'Login berhasil', token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Post: Registration 
router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Harus diisi semua' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ success: false, message: 'Validasi email salah' });
    }

    if (password.length < 3) {
        return res.status(400).json({ success: false, message: 'Password minimal 3 karakter' });
    }

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Coba email lain' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();
        res.status(200).json({ success: true, message: 'Berhasil registrasi' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Get: Lihat data user
router.get('/getUsers', async (req, res) => {
    try {
        const users = await User.find(); 
        res.json({ users });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error memunculkan user' });
    }
});

// Put: Update data user
router.put('/updateUser/:id', async (req, res) => {
    const userId = req.params.id;
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ success: false, message: 'Username and email dibutuhkan' });
    }

    if (password.length < 3) {
        return res.status(400).json({ success: false, message: 'Password minimal 3 karakter' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
        }

        user.username = username;
        user.email = email;

        // Update password hanya jika diisi
        if (password && password.trim() !== '') {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.status(200).json({ success: true, message: 'User berhasil di update', user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// Delete: Hapus data user
router.delete('/deleteUser/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User tidak ditemukan' });
        }

        res.status(200).json({ success: true, message: 'Berhasil menghapus user' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});


module.exports = router;
