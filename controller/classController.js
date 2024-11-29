angular.module('classCookingApp', [])
    .controller('classCookingController', function ($scope, $http) {
        $scope.cookingClassForm = {};
        $scope.userClasses = [];
        $scope.selectedClass = {};
        $scope.modalMessage = ""; 
        $scope.confirmAction = null; 
        $scope.confirmModalTitle = ""; 

        const getToken = () => localStorage.getItem('authToken');

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
        

        $scope.showConfirmModal = function (title, message, action) {
            $scope.confirmModalTitle = title;
            $scope.modalMessage = message;
            $scope.confirmAction = action;
            const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
            confirmModal.show();
        };
        
        // Post: membuat classCooking
        $scope.registerClass = function () {
            const token = getToken();
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }
        
            if (!$scope.cookingClassForm.name || !$scope.cookingClassForm.date || !$scope.cookingClassForm.time) {
                $scope.showNotificationModal("Harap isi semua kolom pendaftaran.");
                return;
            }
        
            // Validasi format time (HH:mm)
            const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            if (!timeRegex.test($scope.cookingClassForm.time)) {
                $scope.showNotificationModal("Format waktu tidak valid. Gunakan format HH:mm (contoh: 14:30).");
                return;
            }
        
            $http.post('/api/classCooking/book', $scope.cookingClassForm, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(function (response) {
                $scope.showNotificationModal("Kelas berhasil didaftarkan.");
                $scope.cookingClassForm = {};
                $scope.getUserClasses();
            }).catch(function (error) {
                console.error("Error registering class:", error);
                $scope.showNotificationModal(error.data.message || "Gagal mendaftarkan kelas.");
            });
        };

        // Get: ambil data user
        $scope.getUserClasses = function () {
            const token = getToken();
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }
        
            $http.get('/api/classCooking/classes', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(function (response) {
                $scope.userClasses = response.data; 
            }).catch(function (error) {
                console.error("Error fetching classes:", error);
                $scope.showNotificationModal("Gagal mengambil daftar kelas.");
            });
        };     
        
        // Update: Edit data user
        $scope.openEditModal = function (classData) {
            $scope.selectedClass = angular.copy(classData);
            const editModal = new bootstrap.Modal(document.getElementById('editClassModal'));
            editModal.show();
        };
        

        $scope.editClass = function () {
            const token = getToken();
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }
        
            if (!$scope.selectedClass._id) {
                $scope.showNotificationModal("ID jadwal tidak ditemukan. Tidak dapat memperbarui.");
                return;
            }
        
            // Validasi format time (HH:mm)
            const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
            if (!timeRegex.test($scope.selectedClass.time)) {
                $scope.showNotificationModal("Format waktu tidak valid. Gunakan format HH:mm (contoh: 14:30).");
                return;
            }
        
            $http.put(`/api/classCooking/update/${$scope.selectedClass._id}`, 
                $scope.selectedClass,
                { headers: { Authorization: `Bearer ${token}` } }
            ).then(function (response) {
                $scope.showNotificationModal("Jadwal berhasil diperbarui.");
                $scope.getUserClasses();
                const editModal = bootstrap.Modal.getInstance(document.getElementById('editClassModal'));
                if (editModal) editModal.hide(); 
            }).catch(function (error) {
                console.error("Error updating class:", error);
                $scope.showNotificationModal(error.data.message || "Gagal memperbarui jadwal.");
            });
        };
        

        // Delete: menghapus data
        $scope.deleteClass = function (classId) {
            console.log("ID kelas yang akan dihapus:", classId); 
            const token = getToken();
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }
        
                $http.delete(`/api/classCooking/delete/${classId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(function (response) {
                    $scope.showNotificationModal("Kelas berhasil dibatalkan.");
                    $scope.getUserClasses();
                if (editModal) editModal.hide(); 
                }).catch(function (error) {
                    console.error("Error deleting class:", error);
                    $scope.showNotificationModal(error.data.message || "Gagal membatalkan kelas.");
                });
        };

        $scope.getUserClasses();

    });
