const mongoose = require('mongoose');

const cookingClassSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required']
    },
    date: {
        type: Date,
        required: [true, 'Date is required']
    },
    time: {
        type: String,
        required: [true, 'Time is required'],
    }
});

module.exports = mongoose.model('CookingClass', cookingClassSchema);
