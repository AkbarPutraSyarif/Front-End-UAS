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

        // Fungsi untuk menghapus kontak
        $scope.deleteContact = function(contactId) {
            if (confirm('Are you sure you want to delete this contact?')) {
                $http.delete('/api/contact/delete/' + contactId)
                    .then(function(response) {
                        // Menghapus kontak yang dihapus dari daftar di UI
                        $scope.contacts = $scope.contacts.filter(contact => contact._id !== contactId);
                        alert('Contact deleted successfully!');
                    })
                    .catch(function(error) {
                        console.error('Error deleting contact:', error);
                        alert('Error deleting contact.');
                    });
            }
        };
    });
