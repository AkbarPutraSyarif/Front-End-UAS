angular.module('authApp', [])
.controller('LoginController', function ($scope, $http) {
    $scope.email = '';
    $scope.password = '';
    $scope.modalMessage = ''; 

    // Munculin modal atau message
    $scope.showModal = function (message) {
        $scope.modalMessage = message;
        const modalElement = new bootstrap.Modal(document.getElementById('messageModal'));
        modalElement.show();
    };

    // Login auth
    $scope.login = function () {
        if (!$scope.email || !$scope.password) {
            $scope.showModal('Please fill in both fields!');
            return;
        }

        const userData = {
            email: $scope.email,
            password: $scope.password
        };

        $http.post('http://localhost:5000/api/login', userData)
            .then(function (response) {
                if (response.data.success) {
                    $scope.showModal('Login successful!');
                    setTimeout(() => {
                        window.location.href = '/home';
                    }, 2000); 
                } else {
                    $scope.showModal('Login failed: ' + response.data.message);
                }
            })
            .catch(function (error) {
                $scope.showModal('Error: ' + error.message);
            });
    };
});
