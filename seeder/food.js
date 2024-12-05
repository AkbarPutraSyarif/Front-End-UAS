const mongoose = require('mongoose');
const Food = require('../model/food.js'); 

// Masukin ke mongodb
mongoose.connect('mongodb://localhost:27017/Lifestyle', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('Database connection error:', err));

// Seeder
const foods = [
    {
        title: "Sup brokoli & kacang",
        image: "/images/protein.jpg",
        rating: 4,
        description: "Sup brokoli dan kacang adalah hidangan sederhana namun bergizi tinggi yang cocok untuk menu diet sehat.",
        category: "Protein",
        url: "https://www.bbcgoodfood.com/recipes/broccoli-stilton-soup",
    },
    {
        title: "Penne tomat & alpukat",
        image: "/images/kalori.jpg",
        rating: 4,
        description: "Penne tomat & alpukat adalah hidangan pasta segar yang memadukan cita rasa Italia dengan sentuhan tropis yang ringan.",
        category: "Kalori",
        url: "https://www.bbcgoodfood.com/recipes/mexican-penne-avocado",
    },
    {
        title: "Penne bayam pesto",
        image: "/images/lemak.jpg",
        rating: 5,
        description: "Penne al dente dilapisi saus pesto hijau dari bayam, basil, bawang putih, kacang pinus, keju parmesan, dan minyak zaitun yang di-blend hingga halus.",
        category: "Lemak",
        url: "https://www.bbcgoodfood.com/recipes/pesto-spinach-penne",
    },
    {
        title: "Salad Tex-Mex Ubi Jalar",
        image: "/images/gluten.jpg",
        rating: 3,
        description: "Salad Tex-Mex Ubi Jalar adalah hidangan segar dan penuh warna yang menggabungkan potongan ubi jalar panggang yang manis dengan bahan-bahan khas Tex-Mex seperti jagung, kacang hitam, paprika, dan tomat ceri.",
        category: "Gluten-Free",
        url: "https://www.bbcgoodfood.com/recipes/sweet-potato-tex-mex-salad",
    },
    {
        title: "Vegan Roti Pisang",
        image: "/images/vegan.jpg",
        rating: 4,
        description: "Vegan Roti Pisang adalah roti lembut dan harum yang terbuat tanpa bahan hewani, sempurna untuk camilan sehat atau sarapan.",
        category: "Vegan",
        url: "https://www.bbcgoodfood.com/recipes/vegan-banana-bread",
    },
    {
        title: "Ayam Jalapeño",
        image: "/images/vitamin.jpg",
        rating: 5,
        description: "Ayam Jalapeño adalah hidangan pedas dan gurih yang menonjolkan potongan ayam empuk yang dimasak bersama paprika jalapeño segar.",
        category: "Vitamin",
        url: "https://www.bbcgoodfood.com/recipes/spicy-chicken-mango-jalapeno-salad",
    },
];

// Tambahin data ke database
const seedFoods = async () => {
    try {
        await Food.deleteMany(); 
        await Food.insertMany(foods); 
        console.log('Berhasil dimasukkan ke database');
        mongoose.connection.close(); 
    } catch (error) {
        console.error('Error saat seeding:', error);
        mongoose.connection.close();
    }
};

// Run server
seedFoods();
