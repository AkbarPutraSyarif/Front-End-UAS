angular.module('cookingClassApp', [])
    .controller('cookingClassController', function($scope, $http) {
        // Mengambil data dari user
        $http.get('/api/cookingClass/classes')
            .then(function(response) {
                $scope.classes = response.data; 
            })
            .catch(function(error) {
                console.error('Error saat mengembalikan data class cooking:', error);
            });

        $scope.classToDelete = null;

        // Konfirmasi delete
        $scope.confirmDelete = function(classId) {
            $scope.classToDelete = classId;
            const modal = new bootstrap.Modal(document.getElementById('confirmDeleteModal'));
            modal.show();
        };

        // Menghapus data
        $scope.deleteClass = function() {
            if ($scope.classToDelete) {
                $http.delete('/api/cookingClass/delete/' + $scope.classToDelete)
                    .then(function(response) {
                        // Menghapus kelas yang daftar di UI
                        $scope.classes = $scope.classes.filter(cookingClass => cookingClass._id !== $scope.classToDelete);
                        $scope.modalMessage = 'Jadwal class cooking berhasil dihapus';
                        const modalResponse = new bootstrap.Modal(document.getElementById('modalResponse'));
                        modalResponse.show();
                        // Menutup modal konfirmasi 
                        const confirmModal = bootstrap.Modal.getInstance(document.getElementById('confirmDeleteModal'));
                        confirmModal.hide();
                    })
                    .catch(function(error) {
                        console.error('Error deleting class:', error);
                        $scope.modalMessage = 'Terjadi error saat menghapus';
                        const modalResponse = new bootstrap.Modal(document.getElementById('modalResponse'));
                        modalResponse.show();
                    });
            }
        };
    });
