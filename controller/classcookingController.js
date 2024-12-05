angular.module('cookingClassApp', [])
    .controller('cookingClassController', function($scope, $http) {
        // Mengambil data kelas masak dari server
        $http.get('/api/cookingClass/classes')
            .then(function(response) {
                $scope.classes = response.data; // Menyimpan data kelas ke $scope
            })
            .catch(function(error) {
                console.error('Error retrieving cooking classes:', error);
            });

        // Menyimpan ID kelas yang akan dihapus
        $scope.classToDelete = null;

        // Fungsi untuk mengonfirmasi penghapusan kelas
        $scope.confirmDelete = function(classId) {
            // Menyimpan ID kelas yang akan dihapus
            $scope.classToDelete = classId;
            // Menampilkan modal konfirmasi
            const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            modal.show();
        };

        // Fungsi untuk menghapus kelas
        $scope.deleteClass = function() {
            if ($scope.classToDelete) {
                $http.delete('/api/cookingClass/delete/' + $scope.classToDelete)
                    .then(function(response) {
                        // Menghapus kelas yang dihapus dari daftar di UI
                        $scope.classes = $scope.classes.filter(cookingClass => cookingClass._id !== $scope.classToDelete);
                        $scope.modalMessage = 'Class deleted successfully!';
                        const modalResponse = new bootstrap.Modal(document.getElementById('modalResponse'));
                        modalResponse.show();
                        // Menutup modal konfirmasi setelah penghapusan
                        const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                        confirmModal.hide();
                    })
                    .catch(function(error) {
                        console.error('Error deleting class:', error);
                        $scope.modalMessage = 'Error deleting class.';
                        const modalResponse = new bootstrap.Modal(document.getElementById('modalResponse'));
                        modalResponse.show();
                    });
            }
        };
    });
