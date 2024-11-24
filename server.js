const express = require('express');
const mongoose = require('mongoose');
const generalRoutes = require('./routes/allRoutes.js'); // Rute semua
const userRoutes = require('./routes/user.js'); // Rute user
const middleware = require('./middleware/middleware.js'); // Middleware
const app = express();

// Middleware kustom
middleware(app);

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registration')
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database connection error:', err));

// Gunakan rute
app.use('/', generalRoutes);
app.use('/api', userRoutes);

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname + '/controller'));
app.use(express.static(__dirname + '/view'));

// Jalanin server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
