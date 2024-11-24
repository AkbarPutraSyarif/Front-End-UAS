const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    url: { type: String, required: true },
});

module.exports = mongoose.model('Food', foodSchema);
