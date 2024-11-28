const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title: { 
        type: String, 
        required: true 
    },
    image: { 
        type: String, 
        required: true
    },
    rating: { 
        type: Number, 
        required: true,
        min: [1, 'Rating must be at least 1'], 
        max: [5, 'Rating must be at most 5'],    
    },
    description: { 
        type: String, 
        required: true 
    },
    category: { 
        type: String, 
        required: true 
    },
    url: { 
        type: String, 
        required: true 
    },
});

module.exports = mongoose.model('Food', foodSchema);
