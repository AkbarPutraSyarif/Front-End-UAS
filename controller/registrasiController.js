angular.module('authApp', [])
.controller('AuthController', function ($scope, $http) {
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.passwordConfirm = '';
    $scope.modalMessage = '';
 
    // Munculin modal atau message
    $scope.showModal = function (message) {
        $scope.modalMessage = message;
        const modalElement = new bootstrap.Modal(document.getElementById('messageModal'));
        modalElement.show();
    };
 
    // Fungsi register
    $scope.register = function () {
        if (!$scope.username || !$scope.email || !$scope.password || !$scope.passwordConfirm) {
            $scope.showModal('Please fill in all fields!');
            return;
        }
       
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($scope.email)) {
            $scope.showModal('Please enter a valid email address!');
            return;
        }
   
        if ($scope.password.length < 3) {
            $scope.showModal('Password must be at least 3 characters long!');
            return;
        }
   
        if ($scope.password !== $scope.passwordConfirm) {
            $scope.showModal('Passwords do not match!');
            return;
        }
   
        const userData = {
            username: $scope.username,
            email: $scope.email,
            password: $scope.password,
        };
   
        $http.post('http://localhost:5000/api/register', userData)
            .then(function (response) {
                if (response.data.success) {
                    $scope.showModal('Registration successful!');
                    setTimeout(() => {
                        window.location.href = '/';
                    },3000);
                } else {
                    $scope.showModal('Registration failed: ' + response.data.message);
                }
            })
            .catch(function (error) {
                $scope.showModal('Error: ' + error.message);
            });
    };
});