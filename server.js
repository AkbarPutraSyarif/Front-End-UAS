const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/user.js'); 
const middleware = require('./middleware/middleware.js'); 
const app = express();

// middleware
middleware(app); 

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/registration', )
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

app.use('/api', authRoutes); 

app.use(express.static(__dirname + '/assets'));
app.use(express.static(__dirname + '/assets/css'));
app.use(express.static(__dirname + '/controller'));
app.use(express.static(__dirname + '/view'));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/login.html"); 
});

app.get("/registrasi", (req, res) => {
    res.sendFile(__dirname + "/view/registrasi.html");
});

app.get("/home", (req, res) => {
    res.sendFile(__dirname + "/view/home.html");
});

app.get("/about", (req, res) => {
    res.sendFile(__dirname + "/view/about.html");
});

app.get("/class_cooking", (req, res) => {
    res.sendFile(__dirname + "/view/class_cooking.html");
});

app.get("/contact", (req, res) => {
    res.sendFile(__dirname + "/view/contact.html");
});

app.get("/food", (req, res) => {
    res.sendFile(__dirname + "/view/food.html");
});

app.get("/profile", (req, res) => {
    res.sendFile(__dirname + "/view/profile.html");
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});
