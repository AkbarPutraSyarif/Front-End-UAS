angular.module('authApp', [])
.controller('LoginController', function ($scope, $http) {
    $scope.email = '';
    $scope.password = '';

    $scope.login = function () {
        if (!$scope.email || !$scope.password) {
            alert('Please fill in both fields!');
            return;
        }

        const userData = {
            email: $scope.email,
            password: $scope.password
        };

        $http.post('http://localhost:5000/api/login', userData)
            .then(function (response) {
                if (response.data.success) {
                    alert('Login successful!');
                    window.location.href = '/home';
                } else {
                    alert('Login failed: ' + response.data.message);
                }
            })
            .catch(function (error) {
                alert('Error: ' + error.message);
            });
    };
});