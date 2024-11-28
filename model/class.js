const mongoose = require('mongoose');

const cookingClassSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: String, required: true }, 
    time: { type: String, required: true }  
});

const CookingClass = mongoose.model('CookingClass', cookingClassSchema);

module.exports = CookingClass;
