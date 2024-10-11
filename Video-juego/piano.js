// Selecciona el contenedor para el mensaje
const mensajeContenedor = document.getElementById('mensaje-motivador');

// Función para mostrar un mensaje aleatorio
function mostrarMensajeAleatorio(mensajesMotivadores) {
  const mensajeAleatorio = mensajesMotivadores[Math.floor(Math.random() * mensajesMotivadores.length)];
  mensajeContenedor.innerHTML = mensajeAleatorio.mensaje;
}

// Función para obtener los mensajes motivadores desde PHP
function obtenerMensajesMotivadores() {
  fetch('php/mensajes.php')
    .then(response => response.json())
    .then(data => {
 
      mostrarMensajeAleatorio(data); 
      setInterval(() => mostrarMensajeAleatorio(data), 900); // Cambiar mensaje cada 5 segundos
    })
    .catch(error => console.error('Error al obtener los mensajes:', error));
}

obtenerMensajesMotivadores();