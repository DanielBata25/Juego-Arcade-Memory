const mensajesMotivadores = [
  { mensaje: "La perseverancia es la clave del éxito" },
  { mensaje: "No te rindas, sigue adelante" },
  { mensaje: "La motivación es la fuerza que te impulsa a alcanzar tus metas" },
  { mensaje: "Cree en ti mismo y en tus habilidades" },
  { mensaje: "El éxito es el resultado de la dedicación y el esfuerzo" }
];

const modal = document.getElementById('Mensajes');

modal.addEventListener('show.bs.modal', function (event) {

  const mensajeAleatorio = mensajesMotivadores[Math.floor(Math.random() * mensajesMotivadores.length)];

  document.getElementById('mensaje-motivador').innerHTML = mensajeAleatorio.mensaje;
});
