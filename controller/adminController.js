const app = angular.module('authApp', []);

app.controller('adminController', function($scope) {
    // Email dan password admin 
    const adminCredentials = {
        email: 'admin@gmail.com',
        password: 'admin123'
    };

    $scope.email = '';
    $scope.password = '';

    // Fungsi login
    $scope.login = function() {
        if (!$scope.email || !$scope.password) {
            alert('Email dan password harus diisi!');
            return;
        }
        if ($scope.email === adminCredentials.email && $scope.password === adminCredentials.password) {
            alert('Login berhasil! Selamat datang Admin.');
            window.location.href = '/admin/homeAdmin.html';
        } else {
            alert('Email atau password salah!');
        }
    };
});
