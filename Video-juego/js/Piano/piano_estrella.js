const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    pressedKeys = [], 
    audio = new Audio("tunes/a.wav"),
    flagActiveGame = true; // Controla si el usuario puede seguir tocando

/////////////////////////////////////////////////////////////////////////////////////////////////////

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play();

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active");
    setTimeout(() => {
        clickedKey.classList.remove("active");
    }, 150);
}

/////////////////////////////////////////////////////////////////////////////////////////////////////
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => {
        if (flagActiveGame) { 
            playTune(key.dataset.key);
            pressedKeys.push(key.dataset.key); // Almacenar la tecla presionada en el array
            console.log(pressedKeys);
            compareKeys(); 
        } else {
            console.log("El piano ya no se puede tocar."); // Mensaje cuando está bloqueado
        }
    });
});

//////////////////////////////////////////////////////////////////////////////////////////////////////
const handleVolume = (e) => {
    audio.volume = e.target.value;
}

const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

const pressedKey = (e) => {
    if (allKeys.includes(e.key) && flagActiveGame) { 
        playTune(e.key);
        pressedKeys.push(e.key); // Almacenar la tecla presionada en el array
        console.log(pressedKeys); 
        compareKeys(); 
    } else {
        console.log("El piano ya no se puede tocar."); // Mensaje cuando está bloqueado
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
const compareKeys = () => {
    if (pressedKeys.length === patron_musical.length) {
        if (pressedKeys.every((element, index) => element === patron_musical[index])) {
            modalMsg("");  
        } else {
            modalMsg2("");
        }
        flagActiveGame = false;  // Desactivar el piano después de comprobar el patrón
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);

// Secuencia de notas predefinida
const patron_musical = ["w", "s","e", "d", "t","g"]; // const patron_musical = ["w", "s", "e", "d", "t","g", "e", "d", "t", "g","k", "j", "d","g", "j","u"];

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

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const iniciarModoSecuencia = () => {
    patronMusicalInterval = setInterval(playSecuencia, 500); // Intervalo de 500 ms entre notas
}

const pararModoSecuencia = () => {
    clearInterval(patronMusicalInterval);
    patronMusicalIndex = 0; // Resetear índice cuando se detiene
}

// Iniciar la secuencia automáticamente al cargar la página
window.addEventListener("DOMContentLoaded", () => {
    iniciarModoSecuencia(); // Iniciar la secuencia cuando la página esté completamente cargada
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function modalMsg(textMsg){
    let modal = new bootstrap.Modal(document.getElementById('alert'));
    let msg = document.querySelector('#alert .modal-body'); // Sección del modal en HTML
    msg.innerHTML = textMsg; // Cambiar el texto del modal
    modal.show(); // Mostrar el modal
}

function modalMsg2(textMsg2){
    let modal = new bootstrap.Modal(document.getElementById('alert2'));
    let msg = document.querySelector('#alert2 .modal-body'); // Sección del modal en HTML
    msg.innerHTML = textMsg2; // Cambiar el texto del modal
    modal.show(); // Mostrar el modal
}