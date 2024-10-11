let currentAvatar = 'img/avatarraper.png'; // Avatar inicial
let cambiarAvatar =  document.getElementById('avatar');

        function selectAvatar(avatarSrc) {
            currentAvatar = avatarSrc; // Actualiza el avatar seleccionado
            const selectedAvatar = document.getElementById('selected-avatar');
            selectedAvatar.src = avatarSrc; // Muestra el avatar seleccionado
        }

        function saveAvatar() {
            const selectedAvatar = document.getElementById('selected-avatar');
            // Solo actualiza el avatar mostrado si se ha guardado
            selectedAvatar.src = currentAvatar; // Guarda el avatar actual
            cambiarAvatar.src = currentAvatar; // Muestra el avatar guardado
        }