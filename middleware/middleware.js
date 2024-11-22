const express = require('express');

module.exports = (app) => {
    // Middleware untuk parsing JSON
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // Tambahkan middleware lainnya jika diperlukan
};
