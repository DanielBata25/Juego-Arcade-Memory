document.getElementById("registroForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const formData = new FormData(this);

    fetch("proceso/persona/registrarPersona.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            swal({
                title: "Registro exitoso",
                text: data.message,
                icon: "success"
            }).then(() => {
                window.location.href = '../../login.php';
            });
        } else {
            swal({
                title: "Error",
                text: data.message,
                icon: "error"
            });
        }
    })
    .catch(error => {
        console.error("Error en el registro:", error);
        swal({
            title: "Error inesperado",
            text: "Hubo un problema al procesar la solicitud.",
            icon: "error"
        });
    });
});
