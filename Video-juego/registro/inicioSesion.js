document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#formulario-login");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío tradicional del formulario

        const formData = new FormData(formulario);

        // Enviar datos al servidor con fetch
        fetch("validar.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json()) // Convertir la respuesta a JSON
            .then((data) => {
                if (data.status === "success") {
                    // Si es exitoso, redirige
                    window.location.href = "../Jugar_multi.html";
                } else {
                    // Mostrar alerta si no es exitoso
                    Swal.fire({
                        icon: "error",
                        title: "Error de autenticación",
                        text: data.message,
                    });
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "Hubo un problema al procesar la solicitud.",
                });
            });
    });
});

