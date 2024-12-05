angular.module('contactApp', [])
    .controller('contactAdminController', function($scope, $http) {
        // Mengambil data kontak dari server
        $http.get('/api/contact/contacts')
            .then(function(response) {
                $scope.contacts = response.data; // Menyimpan data kontak ke $scope
            })
            .catch(function(error) {
                console.error('Error retrieving contacts:', error);
            });

        // Menyimpan ID kontak yang akan dihapus
        $scope.contactToDelete = null;

        // Fungsi untuk mengonfirmasi penghapusan
        $scope.confirmDelete = function(contactId) {
            // Menyimpan ID kontak yang akan dihapus
            $scope.contactToDelete = contactId;
            // Menampilkan modal konfirmasi
            const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            modal.show();
        };

        // Fungsi untuk menghapus kontak
        $scope.deleteContact = function() {
            if ($scope.contactToDelete) {
                $http.delete('/api/contact/delete/' + $scope.contactToDelete)
                    .then(function(response) {
                        // Menghapus kontak yang dihapus dari daftar di UI
                        $scope.contacts = $scope.contacts.filter(contact => contact._id !== $scope.contactToDelete);
                        $scope.modalMessage = 'Contact deleted successfully!';
                        const modalResponse = new bootstrap.Modal(document.getElementById('modalResponse'));
                        modalResponse.show();
                        // Menutup modal konfirmasi setelah penghapusan
                        const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                        confirmModal.hide();
                    })
                    .catch(function(error) {
                        console.error('Error deleting contact:', error);
                        $scope.modalMessage = 'Error deleting contact.';
                        const modalResponse = new bootstrap.Modal(document.getElementById('modalResponse'));
                        modalResponse.show();
                    });
            }
        };
    });
