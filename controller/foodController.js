const app = angular.module('foodApp', []);

app.controller('foodController', function ($scope, $http) {
    $scope.foods = [];
    $scope.categories = ['Vegan', 'Kalori', 'Gluten-Free', 'Vitamin', 'Rendah Lemak', 'Protein'];
    $scope.newCategory = '';
    $scope.selectedCategory = ''; 
    $scope.sortOrder = '';

    // Select category
    $scope.addCategory = function () {
        if ($scope.newCategory) {
            console.log('Pilih kategori:', $scope.newCategory);
        }
    };

    // Tambahin Food
    $scope.addFood = function () {
        const newFood = {
            title: $scope.newTitle,
            image: $scope.newImage,
            rating: $scope.newRating,
            description: $scope.newDescription,
            category: $scope.newCategory,
            url: $scope.newUrl,
        };

        $http.post('/api/food', newFood)
            .then(response => {
                $scope.foods.push(response.data);
                $scope.newTitle = $scope.newDescription = $scope.newCategory = $scope.newImage = $scope.newRating = $scope.newUrl = '';
            })
            .catch(error => {
                console.error('Terjadi salah penambahan makanan', error);
            });
    };

    // Ambil data makanan
    $scope.getFoods = function () {
        $http.get('/api/food')
            .then(response => {
                $scope.foods = response.data;
            })
            .catch(error => {
                console.error('Error saat fetch mengambil data food', error);
            });
    };

    // Update data 
    $scope.editFood = function (food) {
        $scope.editData = angular.copy(food);
        const editModal = new bootstrap.Modal(document.getElementById('editModal'));
        editModal.show();
    };

    $scope.updateFood = function () {
        $http.put(`/api/food/${$scope.editData._id}`, $scope.editData)
            .then(response => {
                const index = $scope.foods.findIndex(food => food._id === response.data._id);
                if (index !== -1) {
                    $scope.foods[index] = response.data;
                }
                const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
                editModal.hide();
            })
            .catch(error => {
                console.error('Error saat update food:', error);
            });
    };

    // Delete Food dan Modal message
    $scope.deleteFood = function (id) {
        $scope.foodToDeleteId = id;
        const deleteModal = new bootstrap.Modal(document.getElementById('deleteModal'));
        deleteModal.show();
    };

    $scope.confirmDelete = function () {
        if ($scope.foodToDeleteId) {
            $http.delete(`/api/food/${$scope.foodToDeleteId}`)
                .then(() => {
                    $scope.foods = $scope.foods.filter(food => food._id !== $scope.foodToDeleteId);
                    $scope.foodToDeleteId = null;
                    const deleteModal = bootstrap.Modal.getInstance(document.getElementById('deleteModal'));
                    deleteModal.hide();
                })
                .catch(error => {
                    console.error('Error saat delete food:', error);
                });
        }
    };

    // Urutin Foods
    $scope.sortFoods = function (order) {
        $scope.sortOrder = order;
    };

    // Fillter untuk kategori food 
    $scope.filterByCategory = function (category) {
        $scope.selectedCategory = category;
    };

    // Ambil kategori
    $scope.filteredFoods = function () {
        let filtered = $scope.foods;

        // Munculin kategori
        if ($scope.selectedCategory) {
            filtered = filtered.filter(food => food.category === $scope.selectedCategory);
        }

        // Urutin sesuai nama food
        if ($scope.sortOrder === 'asc') {
            filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
        } else if ($scope.sortOrder === 'desc') {
            filtered = filtered.sort((a, b) => b.title.localeCompare(a.title));
        }

        return filtered;
    };

    $scope.getFoods();
});
