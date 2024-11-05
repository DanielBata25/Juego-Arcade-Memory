const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    pressedKeys = [], 
    audio = new Audio(),
    flagActiveGame = true,
    teclasHabilitadas = true,
    score = 0;  

let patronesMusicales = [], 
    patronActual = [], 
    patronIndex = 0;

// Inicializar el historial en localStorage si no existe
if (!localStorage.getItem("historialTeclas")) {
    localStorage.setItem("historialTeclas", JSON.stringify([]));
}


const desbloquearAudio = () => {
    audio.play().catch(() => {}); 
    document.removeEventListener("click", desbloquearAudio); // Remueve el evento una vez desbloqueado
};

// Escucha un primer clic en el documento para desbloquear el audio
document.addEventListener("click", desbloquearAudio);


const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; // Ruta del audio
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

// Función para agregar teclas presionadas y comparar
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
        mostrarModal(isCorrect, () => {
            if (patronIndex === patronesMusicales.length - 1) {
                mostrarModalFinal();
            } else {
                avanzarPatron();
            }
        });

        // Guardar intento en el historial
        guardarIntento(patronActual, pressedKeys, isCorrect);
        pressedKeys = []; // Reiniciar teclas presionadas
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
    fetch("php/conexion.php")
    .then(response => {
        console.log("Estado de la respuesta:", response.status);
        if (!response.ok) throw new Error("Error en la carga de patrones musicales");
        return response.text(); // Cambiar a text para revisar el contenido antes de parsear
    })
    .then(text => {
        try {
            const data = JSON.parse(text); // Intentar parsear a JSON
            console.log("Datos recibidos desde PHP:", data);
            if (data.error) {
                console.error("Error desde PHP:", data.error);
                return;
            }
            patronesMusicales = data.patronesMusicales;
            if (patronesMusicales.length > 0) {
                patronActual = patronesMusicales[0];
                console.log(`Patrón inicial: ${patronActual}`);
                playSecuencia();
            } else {
                console.error("No hay patrones musicales disponibles.");
            }
        } catch (e) {
            console.error("Error al parsear JSON:", e, "Respuesta:", text);
        }
    })
    .catch(error => console.error("Error al cargar el patrón musical:", error));
};

// Función para reproducir la secuencia de notas
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

// Almacenar el intento en localStorage
const guardarIntento = (patron, teclasPresionadas, esCorrecto) => {
    let historial = JSON.parse(localStorage.getItem("historialTeclas")) || [];

    const intento = {
        patron: patron,
        teclasPresionadas: teclasPresionadas,
        resultado: esCorrecto ? "Correcto" : "Incorrecto",
        puntuacion: esCorrecto ? teclasPresionadas.length : 0,
        timestamp: new Date().toISOString()
    };

    const secuenciaStr = JSON.stringify(teclasPresionadas);

    // Verificar si la secuencia ya existe en el historial
    const existe = historial.some(entry =>
        JSON.stringify(entry.patron) === JSON.stringify(patron) &&
        JSON.stringify(entry.teclasPresionadas) === secuenciaStr
    );

    // Guardar intento si no existe en el historial
    if (!existe) {
        historial.push(intento);
        localStorage.setItem("historialTeclas", JSON.stringify(historial));
        console.log("Intento guardado en el historial.");
    } else {
        console.log("La secuencia ya existe en el historial. No se agregó para evitar duplicados.");
    }
};


const pressedKey = (e) => {
    if (allKeys.includes(e.key) && flagActiveGame && teclasHabilitadas) {
        playTune(e.key);
        agregarTecla(e.key); // Almacenar tecla presionada
    }
};


keysCheckbox.addEventListener("click", () => {
    pianoKeys.forEach((key) => key.classList.toggle("hide"));
});


volumeSlider.addEventListener("input", (e) => {
    audio.volume = e.target.value;
});

// Evento de teclado para detectar teclas presionadas
document.addEventListener("keydown", pressedKey);

// Cargar los patrones musicales al iniciar la página
window.addEventListener("DOMContentLoaded", cargarPatronMusical);