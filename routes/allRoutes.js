const express = require('express');
const path = require('path');
const router = express.Router();

router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/landing_page.html'));
});

router.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, '../login.html'));
});

router.get("/registrasi", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/registrasi.html'));
});

router.get("/home", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/home.html'));
});

router.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/about.html'));
});

router.get("/class_cooking", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/class_cooking.html'));
});

router.get("/contact", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/contact.html'));
});

router.get("/food", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/food.html'));
});

router.get("/profile", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/profile.html'));
});

router.get("/admin", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/admin/admin.html'));
});

router.get("/homeAdmin", (req, res) => {
    res.sendFile(path.join(__dirname, '../view/admin/homeAdmin.html'));
});

module.exports = router;
