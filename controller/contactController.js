angular.module('contactApp', [])
    .controller('contactController', function ($scope, $http) {
        $scope.contactForm = {};
        $scope.userMessages = [];
        $scope.selectedMessage = {};
        $scope.modalMessage = "";
        $scope.confirmAction = null;
        $scope.confirmModalTitle = "";

        const getToken = () => localStorage.getItem('authToken');

        $scope.showNotificationModal = function (message) {
            $scope.modalMessage = message;
            const notificationModal = new bootstrap.Modal(document.getElementById('notificationModal'));
            notificationModal.show();
        };

        $scope.showConfirmModal = function (title, message, action) {
            $scope.confirmModalTitle = title;
            $scope.modalMessage = message;
            $scope.confirmAction = action;
            const confirmModal = new bootstrap.Modal(document.getElementById('confirmModal'));
            confirmModal.show();
        };

        // Kirim pesan
        $scope.sendMessage = function () {
            const token = getToken();
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }

            // Validasi form sebelum mengirim pesan
            if (!$scope.contactForm.name || !$scope.contactForm.message) {
                $scope.showNotificationModal("Harap isi semua kolom pesan.");
                return;
            }

            $http.post('/api/contact/send', $scope.contactForm, {
                headers: { Authorization: `Bearer ${token}` }
            }).then(function (response) {
                $scope.showNotificationModal("Pesan berhasil dikirim.");
                $scope.contactForm = {};
                $scope.getUserMessages();
            }).catch(function (error) {
                console.error("Error sending message:", error);
                $scope.showNotificationModal(error.data.message || "Gagal mengirim pesan.");
            });
        };

        // Ambil pesan user
        $scope.getUserMessages = function () {
            const token = getToken();
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }

            $http.get('/api/contact/messages', {
                headers: { Authorization: `Bearer ${token}` }
            }).then(function (response) {
                $scope.userMessages = response.data;
            }).catch(function (error) {
                console.error("Error fetching messages:", error);
                $scope.showNotificationModal("Gagal mengambil pesan.");
            });
        };

        // Update data user
        $scope.openEditModal = function (message) {
            $scope.selectedMessage = angular.copy(message);
            const editModal = new bootstrap.Modal(document.getElementById('editMessageModal'));
            editModal.show();
        };
        $scope.editMessage = function () {
            const token = getToken();
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }

            if (!$scope.selectedMessage.message) {
                $scope.showNotificationModal("Pesan tidak boleh kosong.");
                return;
            }

            $http.put(`/api/contact/update/${$scope.selectedMessage._id}`,
                { message: $scope.selectedMessage.message },
                { headers: { Authorization: `Bearer ${token}` } }
            ).then(function (response) {
                $scope.showNotificationModal("Pesan berhasil diperbarui.");
                $scope.getUserMessages();
            }).catch(function (error) {
                console.error("Error updating message:", error);
                $scope.showNotificationModal(error.data.message || "Gagal memperbarui pesan.");
            });
        };

        // Hapus pesan
        $scope.deleteMessage = function (messageId) {
            const token = getToken();
            if (!token) {
                $scope.showNotificationModal("Token tidak ditemukan. Silakan login.");
                return;
            }

            $scope.showConfirmModal("Konfirmasi Hapus", "Apakah Anda yakin ingin menghapus pesan ini?", function () {
                $http.delete(`/api/contact/delete/${messageId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                }).then(function (response) {
                    $scope.showNotificationModal("Pesan berhasil dihapus.");
                    $scope.getUserMessages();
                }).catch(function (error) {
                    console.error("Error deleting message:", error);
                    $scope.showNotificationModal(error.data.message || "Gagal menghapus pesan.");
                });
            });
        };

        $scope.getUserMessages();
    });
