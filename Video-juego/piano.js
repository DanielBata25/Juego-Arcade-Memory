
const mensajeContenedor = document.getElementById('mensaje-motivador');


function mostrarMensajeAleatorio(mensajesMotivadores) {
  const mensajeAleatorio = mensajesMotivadores[Math.floor(Math.random() * mensajesMotivadores.length)];
  mensajeContenedor.innerHTML = mensajeAleatorio.mensaje;
}


function obtenerMensajesMotivadores() {
  fetch('php/mensajes.php')
    .then(response => response.json())
    .then(data => {
 
      mostrarMensajeAleatorio(data); 
      setInterval(() => mostrarMensajeAleatorio(data), 900); 
    })
    .catch(error => console.error('Error al obtener los mensajes:', error));
}

obtenerMensajesMotivadores();