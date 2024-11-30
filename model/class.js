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
        validate: {
            validator: function (value) {
                // Regex for HH:mm format (24-hour clock)
                return /^([01]\d|2[0-3]):([0-5]\d)$/.test(value);
            },
            message: 'Time must be in the format HH:mm (24-hour format)'
        }
    }
});

module.exports = mongoose.model('CookingClass', cookingClassSchema);
