document.addEventListener("DOMContentLoaded", () => {
    const cerrarSesionButton = document.querySelector("#cerrarSesionButton");

    cerrarSesionButton.addEventListener("click", () => {
        // Cerrar el offcanvas
        const offcanvas = document.querySelector("#offcanvasExample");
        const offcanvasInstance = bootstrap.Offcanvas.getInstance(offcanvas);
        offcanvasInstance.hide();

        // Mostrar el SweetAlert después de cerrar el offcanvas
        setTimeout(() => {
            Swal.fire({
                title: "¿Estás seguro?",
                text: "¿Deseas cerrar sesión?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Sí, cerrar sesión",
                cancelButtonText: "Cancelar",
            }).then((result) => {
                if (result.isConfirmed) {
                    // Eliminar datos del localStorage
                    localStorage.removeItem("usuario");
                    localStorage.removeItem("selectedAvatar"); // Eliminar el avatar guardado

                    // Mostrar mensaje de confirmación
                    Swal.fire({
                        title: "Sesión cerrada",
                        text: "Has cerrado sesión exitosamente.",
                        icon: "success",
                    }).then(() => {
                        console.log("Redirigiendo a index.php...");
                        window.location.href = "http://localhost/Juego-Arcade-Memory/Video-juego/Play.html";
                    });
                }
            });
        }, 1000);
    });
});

