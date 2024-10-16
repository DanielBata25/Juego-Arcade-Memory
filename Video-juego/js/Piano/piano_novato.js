const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    pressedKeys = [],
    audio = new Audio(),
    flagActiveGame = true;

let patronesMusicales = [], 
    patronActual = [], 
    patronIndex = 0; // Índice del patrón actual


const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play().catch((error) => console.error('Error al reproducir audio:', error));

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => clickedKey.classList.remove("active"), 150);
    }
};

// Asignar eventos a las teclas del piano
pianoKeys.forEach((key) => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => {
        if (flagActiveGame) {
            playTune(key.dataset.key);
            pressedKeys.push(key.dataset.key);
            console.log(pressedKeys);
            compareKeys();
        }
    });
});


const compareKeys = () => {
    if (pressedKeys.length === patronActual.length) {
        const isCorrect = pressedKeys.every((key, index) => key === patronActual[index]);

        mostrarModal(isCorrect);
        
        // Reiniciar teclas presionadas
        pressedKeys = []; 
    }
};


const mostrarModal = (isCorrect) => {
    const modalId = isCorrect ? "alert" : "alert2"; 
    let modal = new bootstrap.Modal(document.getElementById(modalId));
    let msg = document.querySelector(`#${modalId} .modal-body`);
    msg.innerHTML = isCorrect ? "" : "";
    modal.show();

    setTimeout(() => {
        modal.hide(); 
        avanzarPatron(isCorrect); // Avanzar al siguiente patrón después de cerrar el modal
    }, 3000); 
};

// Avanzar al siguiente patrón musical
const avanzarPatron = (isCorrect) => {
    patronIndex++;

    if (patronIndex < patronesMusicales.length) {
        setTimeout(() => {
            patronActual = patronesMusicales[patronIndex];
            console.log(`Siguiente patrón: ${patronActual}`);
            playSecuencia(); 
        }, 2000); 
    } else {
        mostrarModalFinal(); // Mostrar modal final
    }
};


const mostrarModalFinal = () => {
    let modal = new bootstrap.Modal(document.getElementById("alert"));
    let msg = document.querySelector("#alert .modal-body");
    msg.innerHTML = "¡Felicidades! Has completado todos los patrones.";
    modal.show();

    setTimeout(() => {
        modal.hide(); 
        
        window.location.href = "http://localhost/Video-juego/Admin/tables.html"; 
    }, 3000); 
};

const cargarPatronMusical = () => {
    fetch("./datos.json")
        .then((response) => {
            if (!response.ok) throw new Error("Red no válida");
            return response.json();
        })
        .then((data) => {
            patronesMusicales = data.patronesMusicales;
            if (patronesMusicales.length > 0) {
                patronActual = patronesMusicales[0];
                console.log(`Patrón inicial: ${patronActual}`);
                playSecuencia(); // Iniciar reproducción del primer patrón
            } else {
                console.error("No hay patrones musicales disponibles.");
            }
        })
        .catch((error) => console.error("Error al cargar el patrón musical:", error));
};


const playSecuencia = () => {
    let index = 0;
    const playNextNote = () => {
        if (index < patronActual.length) {
            playTune(patronActual[index]);
            index++;
            setTimeout(playNextNote, 500);
        }
    };
    playNextNote();
};

// Detectar teclas desde el teclado físico
const pressedKey = (e) => {
    if (allKeys.includes(e.key) && flagActiveGame) {
        playTune(e.key);
        pressedKeys.push(e.key);
        console.log(pressedKeys);
        compareKeys();
    }
};

// Manejar eventos
keysCheckbox.addEventListener("click", () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
});
volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});
document.addEventListener("keydown", pressedKey);


window.addEventListener("DOMContentLoaded", cargarPatronMusical);