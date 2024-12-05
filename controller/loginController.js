angular.module('authApp', [])
    .controller('LoginController', function ($scope, $http) {
        $scope.email = '';
        $scope.password = '';
        $scope.modalMessage = '';

        // Modal untuk notifikasi
        $scope.showModal = function (message) {
            $scope.modalMessage = message;
            const modalElement = new bootstrap.Modal(document.getElementById('messageModal'));
            modalElement.show();
        };

        // Logika login
        $scope.login = function () {
            // email dan password harus diisi
            if (!$scope.email || !$scope.password) {
                $scope.showModal('Harus diisi semua');
                return;
            }

            const userData = {
                email: $scope.email,
                password: $scope.password,
            };

            $http.post('http://localhost:5000/api/login', userData)
                .then(function (response) {
                    if (response.data.success) {
                        localStorage.setItem('authToken', response.data.token);

                        $scope.showModal('Login berhasil!');
                        setTimeout(() => {
                            window.location.href = '/home';
                        }, 2000);
                    } else {
                        $scope.showModal('Login gagal: ' + response.data.message);
                    }
                })
                .catch(function (error) {
                    $scope.showModal('Error: ' + error.message);
                });
        };
    });
