function submitLogin(event) {
    event.preventDefault();  

    const formulario = event.target;  
    const formData = new FormData(formulario);  

    fetch("validar.php", {
        method: "POST",
        body: formData,  
    })
        .then((response) => response.json())  
        .then((data) => {
            if (data.status === "success") {
                
                localStorage.setItem("usuario", data.nombre);

                
                Swal.fire({
                    icon: "success",
                    title: "Inicio de sesión exitoso",
                    text: `Bienvenido, ${data.nombre}`,
                }).then(() => {
                    window.location.href = "../Jugar_multi.html";  
                });
            } else {
                
                Swal.fire({
                    icon: "error",
                    title: "Error de autenticación",
                    text: data.message,
                }).then(() => {
                    window.location.href = "index.php";  
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
}


document.addEventListener("DOMContentLoaded", () => {
    const nombreUsuarioElement = document.getElementById("nombreUsuario");

    if (nombreUsuarioElement) {
        // Recuperar el nombre del usuario desde localStorage
        const usuario = localStorage.getItem("usuario");

        if (usuario) {
            // Establecer el nombre del usuario en el elemento del offcanvas
            nombreUsuarioElement.textContent = usuario;
        }
    }
});
