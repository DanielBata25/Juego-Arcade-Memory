const mensajesMotivadores = [
  { mensaje: "¡Vamoss!" },
  { mensaje: "Cree en ti mismo" },
  { mensaje: "¡Tu puedes!" },
];

// Selecciona el contenedor para el mensaje
const mensajeContenedor = document.getElementById('mensaje-motivador');

// Función para mostrar un mensaje aleatorio
function mostrarMensajeAleatorio() {
  const mensajeAleatorio = mensajesMotivadores[Math.floor(Math.random() * mensajesMotivadores.length)];
  mensajeContenedor.innerHTML = mensajeAleatorio.mensaje;
}

// Muestra un mensaje inmediatamente y luego cada 5 segundos
mostrarMensajeAleatorio(); // Mostrar un mensaje al cargar la página
setInterval(mostrarMensajeAleatorio, 900); // Cambiar mensaje cada 5 segundos