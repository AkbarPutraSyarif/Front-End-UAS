const app = angular.module('contactAdminApp', []);

app.controller('contactAdminController', function ($scope, $http) {
    $scope.messages = [];

    // Fungsi untuk mengambil pesan dari backend
    const fetchMessages = function () {
        $http.get('/api/contact/messages')
            .then(function (response) {
                console.log('Messages fetched:', response.data); // Debugging
                $scope.messages = response.data;
            })
            .catch(function (error) {
                console.error('Error fetching messages:', error);
                alert('Error fetching messages from the server.');
            });
    };

    $scope.deleteMessage = function (id) {
    if (confirm('Are you sure you want to delete this message?')) {
        $http.delete(`/api/contact/messages/${id}`)
            .then(function (response) {
                console.log('Message deleted:', response.data);
                alert(response.data.message);
                fetchMessages(); // Perbarui daftar pesan setelah penghapusan
            })
            .catch(function (error) {
                console.error('Error deleting message:', error);
                alert(error.data.message || 'Error deleting the message.');
            });
    }
};


    // Panggil fungsi saat halaman dimuat
    fetchMessages();
});
