// Ruta inicial del avatar por defecto
let defaultAvatar = '../img/profile.png'; // Imagen predeterminada

// Carga del avatar al cargar la página
document.addEventListener("DOMContentLoaded", () => {
    const avatar = document.getElementById("avatar"); // Avatar en el botón de perfil
    const selectedAvatar = document.getElementById("selected-avatar"); // Avatar en el offcanvas

    // Obtener el avatar guardado desde localStorage o usar el predeterminado
    const savedAvatar = localStorage.getItem("selectedAvatar") || defaultAvatar;

    // Establecer el avatar por defecto o el guardado
    if (avatar) avatar.src = savedAvatar;
    if (selectedAvatar) selectedAvatar.src = savedAvatar;
});

// Selección de un avatar
function selectAvatar(newAvatar) {
    const avatar = document.getElementById("avatar"); // Avatar en el botón de perfil
    const selectedAvatar = document.getElementById("selected-avatar"); // Avatar en el offcanvas

    // Actualizar el avatar en la interfaz
    if (avatar) avatar.src = newAvatar;
    if (selectedAvatar) selectedAvatar.src = newAvatar;

    // Guardar el nuevo avatar en localStorage
    localStorage.setItem("selectedAvatar", newAvatar);
}

// Guardado del avatar seleccionado
function saveAvatar() {
    const selectedAvatar = document.getElementById("selected-avatar");
    if (selectedAvatar) {
        const avatarSrc = selectedAvatar.src;

        // Guardar el avatar en localStorage
        localStorage.setItem("selectedAvatar", avatarSrc);

        // Confirmación al usuario
        Swal.fire({
            title: "Avatar guardado",
            text: "Tu avatar ha sido actualizado correctamente.",
            icon: "success",
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "No se seleccionó ningún avatar.",
            icon: "error",
        });
    }
}
