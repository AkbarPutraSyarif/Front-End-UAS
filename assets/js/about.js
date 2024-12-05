// Carousel untuk ubah ubah gambar setiap 3 detik
document.addEventListener('DOMContentLoaded', () => {
        const chefCarousel = document.querySelector('#chefCarousel');
        new bootstrap.Carousel(chefCarousel, {
            interval: 3000, 
            wrap: true 
        });
    });