// fungsi untuk merubah item card makanan
function getRandomItems(array, count) {
    const shuffled = array.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

async function fetchAndRenderFoods() {
    try {
        // Mengambil dari database food
        const response = await fetch('/api/food'); 
        const foods = await response.json();
        // Melakukan pengacakan gambar
        const randomFoods = getRandomItems(foods, 3);
        // Mengambil berdasarkan id 
        const foodCardsContainer = document.getElementById('foodCards');
        foodCardsContainer.innerHTML = ''; 
        
        randomFoods.forEach(food => {
            const cardHTML = `
                <div class="col">
                    <div class="card h-100 shadow-sm">
                        <img src="${food.image}" class="card-img-top" alt="${food.title}" ">
                        <div class="card-body">
                            <h5 class="card-title">${food.title}</h5>
                            <p class="card-text">${food.description}</p>
                            <a href="${food.url}" class="btn btn-danger w-100">Read More</a>
                        </div>
                    </div>
                </div>
            `;
            foodCardsContainer.innerHTML += cardHTML;
        });
    } catch (error) {
        console.error('Error fetching foods:', error);
    }
}

document.addEventListener('DOMContentLoaded', fetchAndRenderFoods);
