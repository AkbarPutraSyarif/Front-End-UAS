const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { 
        type: String, 
        required: [true, 'Username is required']
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], 
        unique: true,
        validate: {
            validator: function(value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: props => `${props.value} is not a valid email address!`
        }
    },
    password: { 
        type: String, 
        required: [true, 'Password is required'],
        minlength: [3, 'Password must be at least 3 characters long']
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
