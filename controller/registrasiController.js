angular.module('authApp', [])
.controller('AuthController', function ($scope, $http) {
    $scope.email = '';
    $scope.username = '';
    $scope.password = '';
    $scope.passwordConfirm = '';

    $scope.register = function () {
        if ( !$scope.username ||!$scope.email || !$scope.password || !$scope.passwordConfirm) {
            alert('Please fill in all fields!');
            return;
        }

        if ($scope.password !== $scope.passwordConfirm) {
            alert('Passwords do not match!');
            return;
        }

        const userData = {
            username: $scope.username,
            email: $scope.email,
            password: $scope.password
        };

        $http.post('http://localhost:5000/api/register', userData)
            .then(function (response) {
                if (response.data.success) {
                    alert('Registration successful!');
                    window.location.href = '/login';
                } else {
                    alert('Registration failed: ' + response.data.message);
                }
            })
            .catch(function (error) {
                alert('Error: ' + error.message);
            });
    };

});