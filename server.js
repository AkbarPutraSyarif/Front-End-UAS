const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/user.js'); // Import authentication routes
const middleware = require('./middleware/middleware.js'); // Import the middleware module

// Initialize Express app
const app = express();

// Apply middleware
middleware(app); // Apply the middleware functions

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registration', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Use authentication routes
app.use('/api', authRoutes); // This will prefix the routes with /api

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
