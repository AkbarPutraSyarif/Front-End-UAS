angular.module('adminApp', [])
.controller('AdminController', function($scope, $http) {
    $scope.users = [];
    $scope.modalMessage = '';
    $scope.userToEdit = {}; 

    // Munculin modal atau message
    $scope.showModal = function(message) {
        $scope.modalMessage = message;
        const modalElement = new bootstrap.Modal(document.getElementById('messageModal'));
        modalElement.show();
    };

    // Mengambil data
    $http.get('/api/getUsers')
        .then(function(response) {
            $scope.users = response.data.users;
        })
        .catch(function(error) {
            console.error('Error saat fetch data user:', error);
            $scope.showModal('Error saat fetch data user');
        });

    // Update data
    $scope.editUser = function(user) {
        $scope.userToEdit = angular.copy(user);
        $scope.userToEdit.password = ''; // Kosongkan password saat membuka modal
        const modalElement = new bootstrap.Modal(document.getElementById('editUserModal'));
        modalElement.show();
    };
    
    // Edit user 
    $scope.updateUser = function() {
        const userId = $scope.userToEdit._id;
        const updatedUser = {
            username: $scope.userToEdit.username,
            email: $scope.userToEdit.email,
        };
    
        // Password harus diisi
        if ($scope.userToEdit.password) {
            updatedUser.password = $scope.userToEdit.password;
        }
    
        $http.put('/api/updateUser/' + userId, updatedUser)
            .then(function(response) {
                if (response.data.success) {
                    window.location.href = '/admin/loginUser.html';
                    const index = $scope.users.findIndex(user => user._id === userId);
                    if (index !== -1) {
                        $scope.users[index] = response.data.user;
                    }
                } else {
                    $scope.showModal('Error saat update user: ' + response.data.message);
                }
            })
            .catch(function(error) {
                console.error('Error updating user:', error);
                $scope.showModal('Error updating user');
            });
    };
    

    // Menghapus pengguna
    $scope.deleteUser = function(userId) {
        const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
        $scope.confirmDelete = function() {
            $http.delete('/api/deleteUser/' + userId)
                .then(function(response) {
                    if (response.data.success) {
                        window.location.href = '/admin/loginUser.html'
                        $scope.users = $scope.users.filter(user => user._id !== userId);
                    } else {
                        $scope.showModal('Error deleting user: ' + response.data.message);
                    }
                })
                .catch(function(error) {
                    console.error('Error deleting user:', error);
                    $scope.showModal('Error deleting user');
                });
        };
        confirmModal.show();
    };
});
