const express = require('express');
const mongoose = require('mongoose');
const generalRoutes = require('./routes/allRoutes.js'); // Rute semua
const userRoutes = require('./routes/user.js'); // Rute user
const foodRoutes = require('./routes/food.js'); // Rute food
const classRoutes = require('./routes/class.js'); // Rute food
const contactRoutes = require('./routes/contactRoutes'); // Rute Contact Us
const middleware = require('./middleware/middleware.js'); // Middleware
const contactAdminRoutes = require('./routes/contactAdmin.js'); // rute contact admin
const classAdminRoutes = require('./routes/classAdmin.js'); // rute class admin
const app = express();

middleware(app);

// MongoDB 
mongoose.connect('mongodb://localhost:27017/Lifestyle', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database connection error:', err));

// Route
app.use('/', generalRoutes);
app.use('/api', userRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/classCooking', classRoutes);
app.use('/api/contactAdmin', contactAdminRoutes); 
app.use('/api/cookingClass', classAdminRoutes);  


app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname + '/controller'));
app.use(express.static(__dirname + '/view'));

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});