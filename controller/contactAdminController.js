angular.module('contactApp', [])
    .controller('contactAdminController', function($scope, $http) {
        // Mengambil data contact
        $http.get('/api/contactAdmin/contacts')
            .then(function(response) {
                $scope.contacts = response.data; 
            })
            .catch(function(error) {
                console.error('Error mengembalikan data contacts:', error);
            });

        $scope.contactToDelete = null;

        // Konfirmasi delete
        $scope.confirmDelete = function(contactId) {
            $scope.contactToDelete = contactId;
            const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            modal.show();
        };

        // Fungsi untuk menghapus kontak
        $scope.deleteContact = function() {
            if ($scope.contactToDelete) {
                $http.delete('/api/contactAdmin/delete/' + $scope.contactToDelete)
                    .then(function(response) {
                        $scope.contacts = $scope.contacts.filter(contact => contact._id !== $scope.contactToDelete);
                        $scope.modalMessage = 'Contact berhasil dihapus';
                        const modalResponse = new bootstrap.Modal(document.getElementById('modalResponse'));
                        modalResponse.show();
                        const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                        confirmModal.hide();
                    })
                    .catch(function(error) {
                        console.error('Error deleting contact:', error);
                        $scope.modalMessage = 'Terjadi kesalahan saat menghapus';
                        const modalResponse = new bootstrap.Modal(document.getElementById('modalResponse'));
                        modalResponse.show();
                    });
            }
        };
    });
