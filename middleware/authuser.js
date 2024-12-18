const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticateUser(req, res, next) {
    const authHeader = req.headers.authorization;
    // Mengecek apakah ada token atau auth sudah dijalakan dengan benar
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.redirect('/login');
    }

    const token = authHeader.split(' ')[1];

    // Memverifikasi ada token atau tidak
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = { email: decoded.email, userId: decoded.userId };
        next();
    } catch (error) {
        return res.redirect('/login');
    }
}

module.exports = { authenticateUser };
