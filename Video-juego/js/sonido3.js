const audio = document.getElementById('audio');
const muteBTN = document.getElementById('muteBTN');
const volumeControl = document.getElementById('volume');

// Reproduce automáticamente cuando la página carga
window.onload = () => {
  audio.play().catch(error => {
    console.log("El navegador bloqueó la reproducción automática. Requiere interacción del usuario.");
  });
};

// Controlar volumen
volumeControl.addEventListener('input', () => {
  audio.volume = volumeControl.value;
});

// Alternar mute
function toggleMute() {
  audio.muted = !audio.muted; // Cambia entre mute/unmute
  muteBTN.src = audio.muted ? '../../img/mute.png' : '../../img/normal.png'; // Cambia la imagen del botón
}