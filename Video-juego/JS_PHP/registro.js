document.getElementById('registro-form').addEventListener('submit', function (e) {
<<<<<<< HEAD
    e.preventDefault(); 

    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const contraseña = document.getElementById('contraseña').value;

    const usuario = {
        nombre: nombre,
        correo: correo,
        contraseña: contraseña
    };
=======
  e.preventDefault(); // Evita que el formulario se envíe de la manera tradicional

  // Obtener los valores de los campos
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const contraseña = document.getElementById('contraseña').value;

  // Crear el objeto usuario
  const usuario = {
      nombre: nombre,
      correo: correo,
      contraseña: contraseña
  };
>>>>>>> 757739895ccfc7fc04bdbe8c2bde3cfb6136fe4c

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
          alert('Usuario ' + usuario.nombre + ' registrado correctamente');
      } else {
          alert('Error al registrar el usuario: ' + data.message);
      }
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Hubo un error al registrar el usuario');
  });
});