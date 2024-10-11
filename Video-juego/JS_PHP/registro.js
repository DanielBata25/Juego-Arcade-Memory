// Obtener el formulario
const formulario = document.getElementById('registro-form');

// Agregar evento de envío
formulario.addEventListener('submit', (e) => {
  e.preventDefault();

  // Obtener los datos del formulario
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;

  // Crear un objeto JSON con los datos
  const datos = {
    nombre,
    correo,
    contraseña
  };

  // Enviar los datos a PHP 
  fetch('registro.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(datos)
  })
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));
});