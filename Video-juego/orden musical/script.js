function guardarPalabrasEnBD(palabras) {
  fetch('../conexion4pala.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ palabras: palabras })
  })
  .then(response => response.json())
  .then(data => console.log(data.status))
  .catch(error => console.error('Error:', error));
}

window.addEventListener('load', () => {
  Swal.fire({
      title: "Empecemos!",
      icon: "success",
      html: `<div style="text-align: center;">
                  <p>ESTAS SERÁN LAS SIGUIENTES PALABRAS QUE APARECERÁN:</p>
                  <p>GUITARRA</p>
                  <p>TROMPETA</p>
                  <p>ACORDEÓN</p>
                  <p>VIOLÍN</p>
                  <p>PIANO</p>
                  <p>FLAUTA</p>
                  <p>CLARINETE</p>
                  <p>MARACAS</p>  
                  <p>ARPA</p>
                  <p>BATERÍA</p>
             </div>`,
      background: '#DB55D2',
      color: '#000000',
      confirmButtonText: 'Aceptar'
  });

  // Lista de palabras a guardar en la base de datos
  const palabras = ['GUITARRA', 'TROMPETA', 'ACORDEÓN', 'VIOLÍN', 'PIANO', 'FLAUTA', 'CLARINETE', 'MARACAS', 'ARPA', 'BATERÍA'];
  
  // Almacena las palabras en la base de datos al cargar el juego
  guardarPalabrasEnBD(palabras);
});
