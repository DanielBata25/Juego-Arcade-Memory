const audio = document.getElementById('audio');
const volumeControl = document.getElementById('volume');

// Configurar el volumen inicial
audio.volume = volumeControl.value;

// Evento para ajustar el volumen
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

function playPause() {
    if (audio.paused) {
        audio.play();
        document.getElementById('playPauseBTN').src = 'img/sonido abierto.png'; // Cambia a imagen de pausa
    } else {
        audio.pause();
        document.getElementById('playPauseBTN').src = 'img/sonido con X.png'; // Cambia a imagen de play
    }
}
