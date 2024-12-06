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
        // harus diisi jika belum
        if (!$scope.username || !$scope.email || !$scope.password || !$scope.passwordConfirm) {
            $scope.showModal('Harus diisi semua');
            return;
        }
        
        // validasi harus berbentuk email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test($scope.email)) {
            $scope.showModal('Validasi email salah');
            return;
        }
        
        // validasi password dibawah 3 maka error
        if ($scope.password.length < 3) {
            $scope.showModal('Password minimal 3 karakter');
            return;
        }
        
        // validasi password harsu sama dengan password confirm
        if ($scope.password !== $scope.passwordConfirm) {
            $scope.showModal('Passwords tidak sama dengan confirm password');
            return;
        }
        
        // Masukkin data
        const userData = {
            username: $scope.username,
            email: $scope.email,
            password: $scope.password,
        };
   
        $http.post('http://localhost:5000/api/register', userData)
            .then(function (response) {
                if (response.data.success) {
                    $scope.showModal('Registration berhasil');
                    setTimeout(() => {
                        window.location.href = '/login';
                    },3000);
                } else {
                    $scope.showModal('Registration gagal: ' + response.data.message);
                }
            })
            .catch(function (error) {
                $scope.showModal('Error: ' + error.message);
            });
    };
});