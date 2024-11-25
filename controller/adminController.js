const app = angular.module('authApp', []);

app.controller('adminController', function($scope) {
    // Email dan password admin 
    const adminCredentials = {
        email: 'admin@gmail.com',
        password: 'admin123'
    };

    $scope.email = '';
    $scope.password = '';
    $scope.modalMessage = ''

    $scope.showModal = function (message) {
        $scope.modalMessage = message;
        const modalElement = new bootstrap.Modal(document.getElementById('messageModal'));
        modalElement.show();
    };

    // Fungsi login
    $scope.login = function() {
        if (!$scope.email || !$scope.password) {
            $scope.showModal('Email dan password harus diisi!!');
            return;
        }
        if ($scope.email === adminCredentials.email && $scope.password === adminCredentials.password) {
            $scope.showModal('Login berhasil! Selamat datang Admin.');
            setTimeout(() => {
                window.location.href = '/admin/homeAdmin.html';
            }, 2000);
        } else {
            $scope.showModal('Email atau pw salah');
        }
    };
});
