angular.module('adminApp', [])
.controller('AdminController', function($scope, $http) {
    // Ngambil user
    $http.get('/api/getUsers')
        .then(function(response) {
            $scope.users = response.data.users;
        })
        .catch(function(error) {
            console.error('Error fetching user data:', error);
        });

    // menghapus user
    $scope.deleteUser = function(userId) {
        if (confirm('Are you sure you want to delete this user?')) {
            $http.delete('/api/deleteUser/' + userId)
                .then(function(response) {
                    if (response.data.success) {
                        alert('User deleted successfully');
                        // Menghapus user dari tampilan
                        $scope.users = $scope.users.filter(user => user._id !== userId);
                    } else {
                        alert('Error deleting user: ' + response.data.message);
                    }
                })
                .catch(function(error) {
                    console.error('Error deleting user:', error);
                    alert('Error deleting user');
                });
        }
    };
});
