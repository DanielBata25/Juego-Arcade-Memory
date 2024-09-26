const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    audio = new Audio("tunes/a.wav");

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; 
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

const pressedKey = (e) => {
    if (allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

// Secuencia de notas predefinida
const patron_musical = ["w","e","t","y","u","o","p",];

// Variables para la secuencia
let patronMusicalIndex = 0;
let patronMusicalInterval;

// Función para reproducir la secuencia
const playSecuencia = () => {
    if (patronMusicalIndex >= patron_musical.length) {
        clearInterval(patronMusicalInterval);
        patronMusicalIndex = 0; // Resetear índice para permitir reproducción de la secuencia nuevamente
        return;
    }
    playTune(patron_musical[patronMusicalIndex]);
    patronMusicalIndex++;
}

// Función para iniciar el modo de secuencia
const iniciarModoSecuencia = () => {
    patronMusicalInterval = setInterval(playSecuencia, 500); // Intervalo de 500 ms entre notas
}

// Función para detener el modo de secuencia
const pararModoSecuencia = () => {
    clearInterval(patronMusicalInterval);
    patronMusicalIndex = 0; // Resetear índice cuando se detiene
}

// Seleccionar el botón de secuencia
const sequenceButton = document.querySelector("#start-sequence");
sequenceButton.addEventListener("click", () => {
    if (patronMusicalInterval) {
        pararModoSecuencia();
        sequenceButton.textContent = "Iniciar Secuencia";
    } else {
        iniciarModoSecuencia();
        sequenceButton.textContent = "Detener Secuencia";
    }
});