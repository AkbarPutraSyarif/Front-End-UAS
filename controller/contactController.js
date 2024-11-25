const app = angular.module('contactApp', []);
// controller/contactController.js
app.controller('contactController', function ($scope, $http) {
    $scope.contactForm = {
        name: '',
        email: '',
        message: ''
    };

    $scope.sendMessage = function () {
        $http.post('/api/contact/send', $scope.contactForm)
            .then(function (response) {
                console.log('Success:', response.data); // Debug respons backend
                alert(response.data.message);
            })
            .catch(function (error) {
                console.error('Error:', error); // Debug error frontend
                alert(error.data.message || 'An error occurred.');
            });
    };
});
