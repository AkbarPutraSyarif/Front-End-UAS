const mongoose = require('mongoose');

const cookingClassSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
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
        required: [true, 'Time is required']
    }
}, { timestamps: true });

const CookingClass = mongoose.model('CookingClass', cookingClassSchema);

module.exports = CookingClass;
