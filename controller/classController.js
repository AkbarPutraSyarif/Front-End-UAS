angular.module('classCookingApp', [])
    .controller('classCookingController', function ($scope, $http) {
        $scope.cookingClassForm = {};
        $scope.userClasses = [];
        $scope.selectedClass = {};
        $scope.modalMessage = "";
        $scope.confirmAction = null;
        $scope.confirmModalTitle = "";

        $scope.showNotificationModal = function (message) {
            $scope.modalMessage = message;

            const modalElement = document.getElementById('notificationModal');
            if (modalElement) {
                const notificationModal = new bootstrap.Modal(modalElement);
                notificationModal.show();
            } else {
                console.error("Modal element with ID 'notificationModal' not found.");
            }
        };

        $scope.registerClass = function () {
            const token = localStorage.getItem('authToken');
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }

            if (!$scope.cookingClassForm.name || !$scope.cookingClassForm.date || !$scope.cookingClassForm.time) {
                $scope.showNotificationModal("Harap isi semua kolom pendaftaran.");
                return;
            }

            const data = {
                name: $scope.cookingClassForm.name,
                date: $scope.cookingClassForm.date,
                time: $scope.cookingClassForm.time 
            };

            $http.post('/api/classCooking/book', data, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(function (response) {
                $scope.showNotificationModal("Kelas berhasil didaftarkan.");
                $scope.cookingClassForm = {}; 
            }).catch(function (error) {
                console.error("Error registering class:", error);
                $scope.showNotificationModal(error.data.message || "Gagal mendaftarkan kelas.");
            });
        };
    });
