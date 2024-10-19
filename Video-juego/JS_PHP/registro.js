document.getElementById('registroForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar el envío del formulario

    const formData = {
        nombre: document.getElementById('nombre').value,
        apellido: document.getElementById('apellido').value,
        email: document.getElementById('email').value,
        telefono: document.getElementById('telefono').value
    };

    fetch('registro.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('resultado').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
    });
});