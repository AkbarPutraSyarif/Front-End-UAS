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

        $scope.getUserClasses = function () {
            const token = getToken(); // Ambil token dari localStorage
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }
        
            // Memanggil API untuk mengambil data jadwal
            $http.get('/api/classCooking/classes', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(function (response) {
                $scope.userClasses = response.data; // Menyimpan data jadwal ke dalam scope
            }).catch(function (error) {
                console.error("Error fetching classes:", error);
                $scope.showNotificationModal("Gagal mengambil daftar kelas.");
            });
        };
        
        // Memanggil fungsi di awal
        $scope.getUserClasses();
        

        $scope.deleteClass = function (classId) {
            console.log("ID kelas yang akan dihapus:", classId); // Debugging
            const token = getToken();
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }
        
            $scope.showConfirmModal("Konfirmasi Hapus", "Apakah Anda yakin ingin membatalkan pendaftaran kelas ini?", function () {
                $http.delete(`/api/classCooking/delete/${classId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(function (response) {
                    $scope.showNotificationModal("Kelas berhasil dibatalkan.");
                    $scope.getUserClasses();
                }).catch(function (error) {
                    console.error("Error deleting class:", error);
                    $scope.showNotificationModal(error.data.message || "Gagal membatalkan kelas.");
                });
            });
        };
        

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
            
                $http.put(`/api/classCooking/update/${$scope.selectedClass._id}`, 
                    $scope.selectedClass,
                    { headers: { Authorization: `Bearer ${token}` } }
                ).then(function (response) {
                    $scope.showNotificationModal("Jadwal berhasil diperbarui.");
                    $scope.getUserClasses();
                    const editModal = bootstrap.Modal.getInstance(document.getElementById('editClassModal'));
                    if (editModal) editModal.hide(); // Tutup modal setelah sukses
                }).catch(function (error) {
                    console.error("Error updating class:", error);
                    $scope.showNotificationModal(error.data.message || "Gagal memperbarui jadwal.");
                });
            };
        };
        
        $scope.showConfirmModal = function (title, message, action) {
            $scope.confirmModalTitle = title;
            $scope.modalMessage = message;
            $scope.confirmAction = action;
        
            const modalElement = document.getElementById('confirmModal');
            if (modalElement) {
                const confirmModal = new bootstrap.Modal(modalElement);
                confirmModal.show();
            } else {
                console.error("Modal element with ID 'confirmModal' not found.");
            }
        };
        

        $scope.getUserClasses();
    });
