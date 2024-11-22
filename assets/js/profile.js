const profilePicture = document.getElementById('profile-picture');
        const uploadPhoto = document.getElementById('upload-photo');

        uploadPhoto.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    profilePicture.src = e.target.result;
                };
                reader.readAsDataURL(file);
            }
        });

        function resetPhoto() {
            profilePicture.src = "https://bootdey.com/img/Content/avatar/avatar1.png";
            uploadPhoto.value = "";
        }