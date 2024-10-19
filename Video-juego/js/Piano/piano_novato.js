const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    pressedKeys = [],
    audio = new Audio(),
    flagActiveGame = true,
    teclasHabilitadas = true,
    score = 0;  // Puntuación inicial

let patronesMusicales = [], 
    patronActual = [], 
    patronIndex = 0;

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play().catch((error) => console.error('Error al reproducir audio:', error));

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => clickedKey.classList.remove("active"), 150);
    }
};

pianoKeys.forEach((key) => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => {
        if (flagActiveGame && teclasHabilitadas) {
            playTune(key.dataset.key);
            agregarTecla(key.dataset.key);
        }
    });
});

const agregarTecla = (key) => {
    pressedKeys.push(key);
    console.log(`Teclas presionadas: ${pressedKeys}`);
    compareKeys();
};

const compareKeys = () => {
    if (pressedKeys.length === patronActual.length) {
        const isCorrect = pressedKeys.every((key, index) => key === patronActual[index]);

        if (isCorrect) score += pressedKeys.length;  // Incrementar la puntuación

        teclasHabilitadas = false;
        enviarResultados(isCorrect);
        mostrarModal(isCorrect, () => {
            if (patronIndex === patronesMusicales.length - 1) {
                mostrarModalFinal();
            } else {
                avanzarPatron();
            }
        });

        pressedKeys = [];
    }
};

const mostrarModal = (isCorrect, callback) => {
    const modalId = isCorrect ? "alert" : "alert2";
    let modal = new bootstrap.Modal(document.getElementById(modalId));
    let msg = document.querySelector(`#${modalId} .modal-body`);
    msg.innerHTML = isCorrect ? "¡Correcto!" : "¡Incorrecto!";
    modal.show();

    setTimeout(() => {
        modal.hide();
        callback();
    }, 3000);
};

const enviarResultados = (isCorrect) => {
    const data = {
        patron: patronActual,
        teclasPresionadas: pressedKeys,
        puntuacion: {
            correctas: isCorrect ? pressedKeys.length : 0,
            incorrectas: isCorrect ? 0 : pressedKeys.length
        }
    };

    fetch('guardar.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => {
                console.error('Error en la respuesta del servidor:', text);
                throw new Error('Respuesta no válida del servidor');
            });
        }
        return response.json();
    })
    .then(responseData => console.log(responseData.mensaje || responseData.error))
    .catch(error => console.error('Error al enviar datos:', error));
};

const avanzarPatron = () => {
    patronIndex++;
    setTimeout(() => {
        patronActual = patronesMusicales[patronIndex];
        console.log(`Siguiente patrón: ${patronActual}`);
        teclasHabilitadas = true;
        playSecuencia();
    }, 2000);
};

const mostrarModalFinal = () => {
    let modal = new bootstrap.Modal(document.getElementById("alert"));
    let msg = document.querySelector("#alert .modal-body");
    msg.innerHTML = `¡Felicidades! Has completado todos los patrones. Puntuación final: ${score} puntos.`;
    modal.show();

    setTimeout(() => {
        modal.hide();
        redirigirPagina();
    }, 3000);
};

const redirigirPagina = () => {
    window.location.href = "http://localhost/Video-juego/Admin/tables.html";
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
                playSecuencia();
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

const pressedKey = (e) => {
    if (allKeys.includes(e.key) && flagActiveGame && teclasHabilitadas) {
        playTune(e.key);
        agregarTecla(e.key);
    }
};

keysCheckbox.addEventListener("click", () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
});

volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

document.addEventListener("keydown", pressedKey);

window.addEventListener("DOMContentLoaded", cargarPatronMusical);
