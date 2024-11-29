document.addEventListener("DOMContentLoaded", () => {
    const formulario = document.querySelector("#formulario-login");

    formulario.addEventListener("submit", function (e) {
        e.preventDefault(); // Evitar el envío tradicional del formulario

        const formData = new FormData(formulario);

       
        fetch("validar.php", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json()) 
            .then((data) => {
                if (data.status === "success") {
                    
                    Swal.fire({
                        icon: "success",
                        title: "Inicio de sesión exitoso",
                        text: data.message,
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
    });
});
