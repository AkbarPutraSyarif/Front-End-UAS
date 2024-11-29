const jwt = require('jsonwebtoken');
const User = require('../model/user');

const isAuthenticated = async (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, 'your_secret_key');
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ success: false, message: 'Unauthorized' });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ success: false, message: 'Unauthorized' });
    }
};

module.exports = { isAuthenticated };
