document.getElementById('registro-form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    const usuario = {
        nombre: nombre,
        correo: correo,
        contraseña: contraseña
    };

    // Enviar los datos al servidor utilizando fetch
    fetch('php/registro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            alert('Usuario registrado correctamente');
        } else {
            alert('Error al registrar el usuario: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un error al registrar el usuario');
    });
});