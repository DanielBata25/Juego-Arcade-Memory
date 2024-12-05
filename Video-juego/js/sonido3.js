const audio = document.getElementById('audio');
const volumeControl = document.getElementById('volume');
const playPauseBTN = document.getElementById('playPauseBTN');

// Configurar el volumen inicial
audio.volume = volumeControl.value;

// Evento para ajustar el volumen
volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

// Guardar el estado del audio en localStorage
function saveAudioState() {
    localStorage.setItem('audioState', JSON.stringify({
        currentTime: audio.currentTime,
        isPlaying: !audio.paused
    }));
}

// Recuperar el estado del audio
function loadAudioState() {
    const savedState = localStorage.getItem('audioState');
    if (savedState) {
        const { currentTime, isPlaying } = JSON.parse(savedState);
        audio.currentTime = currentTime; // Restaurar el tiempo
        if (isPlaying) {
            audio.play(); // Reproducir si estaba sonando
            playPauseBTN.src = '../../img/normal.png';
        }
    }
}

// Escuchar eventos para guardar el estado continuamente
audio.addEventListener('timeupdate', saveAudioState);

// Función para reproducir o pausar
function playPause() {
    if (audio.paused) {
        audio.play();
        playPauseBTN.src = '../../img/normal.png'; // Cambia a imagen de pausa
    } else {
        audio.pause();
        playPauseBTN.src = '../../img/mute.png'; // Cambia a imagen de play
    }
    saveAudioState(); // Guardar el estado tras el cambio
}

// Cargar el estado del audio al abrir la página
window.addEventListener('DOMContentLoaded', loadAudioState);
