angular.module('authApp', [])
.controller('LoginController', function ($scope, $http) {
    $scope.email = '';
    $scope.password = '';

    $scope.login = function () {
        // Basic client-side validation
        if (!$scope.email || !$scope.password) {
            alert('Please fill in both fields!');
            return;
        }

        const userData = {
            email: $scope.email,
            password: $scope.password
        };

        // Send data to the backend via POST request
        $http.post('http://localhost:5000/api/login', userData)
            .then(function (response) {
                if (response.data.success) {
                    alert('Login successful!');
                    // Redirect to a protected page, such as dashboard
                    window.location.href = '/view/home.html';
                } else {
                    alert('Login failed: ' + response.data.message);
                }
            })
            .catch(function (error) {
                alert('Error: ' + error.message);
            });
    };
});