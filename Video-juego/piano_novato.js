const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    pressedKeys = [],
    audio = new Audio(),
    flagActiveGame = true,
    teclasHabilitadas = true,
    tecladoDeshabilitado = false,
    score = 0;

let patronesMusicales = [],
    patronActual = [],
    patronIndex = 0,
    tiempoLimite;

// Inicializar el historial en localStorage si no existe
if (!localStorage.getItem("historialTeclas")) {
    localStorage.setItem("historialTeclas", JSON.stringify([]));
}

const desbloquearAudio = () => {
    audio.play().catch(() => {});
    document.removeEventListener("click", desbloquearAudio);
};

document.addEventListener("click", desbloquearAudio);

// Funciones para deshabilitar y habilitar teclas
const deshabilitarTeclas = () => {
    teclasHabilitadas = false;
    pianoKeys.forEach((key) => {
        key.classList.add("disabled");
    });
};

const habilitarTeclas = () => {
    teclasHabilitadas = true;
    pianoKeys.forEach((key) => {
        key.classList.remove("disabled");
    });
    iniciarTemporizador();
};


const iniciarTemporizador = () => {
    tiempoLimite = setTimeout(() => {
        if (pressedKeys.length < patronActual.length) {
            mostrarAlert("¡Tiempo agotado!", "No completaste el patrón a tiempo.", "warning", () => {
                pressedKeys = [];
                verificarUltimoPatron();
            });
        }
    }, 8000); 
};

// Función para detener el temporizador
const detenerTemporizador = () => clearTimeout(tiempoLimite);



// Función para reproducir la nota
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play().catch((error) => console.error('Error al reproducir audio:', error));

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => clickedKey.classList.remove("active"), 150);
    }
};

// Agregar evento de clic a las teclas del piano
pianoKeys.forEach((key) => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => {
        if (flagActiveGame && teclasHabilitadas && !tecladoDeshabilitado) {
            playTune(key.dataset.key);
            agregarTecla(key.dataset.key);
        }
    });
});

// Función para agregar teclas presionadas
const agregarTecla = (key) => {
    pressedKeys.push(key);
    console.log(`Teclas presionadas: ${pressedKeys}`);
    compareKeys();
};

// Compara teclas presionadas con el patrón
const compareKeys = () => {
    if (teclasHabilitadas && pressedKeys.length === patronActual.length) {
        detenerTemporizador();
        const isCorrect = pressedKeys.every((key, index) => key === patronActual[index]);

        if (isCorrect) {
            score += pressedKeys.length;
            mostrarAlert("¡Correcto!", "Has tocado el patrón correctamente.", "success", () => {
                verificarUltimoPatron();
            });
        } else {
            mostrarAlert("¡Incorrecto!", "El patrón no coincide. Pasando al siguiente patrón.", "error", () => {
                verificarUltimoPatron();
            });
        }

        guardarIntento(patronActual, pressedKeys, isCorrect);
        pressedKeys = [];
    }
};

// Verifica si es el último patrón y proceder
const verificarUltimoPatron = () => {
    if (patronIndex === patronesMusicales.length - 1) {
        flagActiveGame = false;
        teclasHabilitadas = false;

        // Reiniciar el historial de teclas en localStorage
        localStorage.setItem("historialTeclas", JSON.stringify([])); // Reinicia el historial

        swal({
            title: "¡Felicidades!",
            text: "Has completado todos los patrones.",
            icon: "success",
            button: "Continuar"
        }).then(() => {
            redirigirPagina();
        });
    } else {
        patronIndex++;
        avanzarPatron();
    }
};
// Avanza al siguiente patrón
const avanzarPatron = () => {
    patronActual = patronesMusicales[patronIndex];
    
    // Mostrar el alert antes de cada patrón (incluido el primero)
    mostrarAlert(`Patrón ${patronIndex + 1}`, `Vas a escuchar el patrón ${patronIndex + 1}.`, "info", () => {
        // Establecer un intervalo antes de reproducir el siguiente patrón
        setTimeout(() => {
            playSecuencia();
        }, 1500); 
    });
};

// Redirigir a la página final
const redirigirPagina = () => {
    window.location.href = "http://localhost/Juego-Arcade-Memory/Video-juego/play.html";
};

// Cargar patrones musicales desde PHP
const cargarPatronMusical = () => {
    fetch("php/conexion1.php")
    .then(response => {
        if (!response.ok) throw new Error("Error en la carga de patrones musicales");
        return response.text();
    })
    .then(text => {
        try {
            const data = JSON.parse(text);
            if (data.error) return;

            patronesMusicales = data.patronesMusicales;
            if (patronesMusicales.length > 0) {
                patronActual = patronesMusicales[0];

                // Mostrar el alert antes de comenzar el primer patrón
                mostrarAlert(`Patrón 1`, `Vas a escuchar el patrón 1.`, "info", () => {
                    // Luego de que el usuario vea el alert, iniciar la secuencia del primer patrón
                    playSecuencia();
                });
            }
        } catch (e) {
            console.error("Error al parsear JSON:", e, "Respuesta:", text);
        }
    })
    .catch(error => console.error("Error al cargar el patrón musical:", error));
};

// Reproducir secuencia de notas
const playSecuencia = () => {
    deshabilitarTeclas();
    let index = 0;
    const playNextNote = () => {
        if (index < patronActual.length) {
            const key = patronActual[index];
            playTune(key);

            // Resaltar la tecla correspondiente
            const clickedKey = document.querySelector(`[data-key="${key}"]`);
            if (clickedKey) {
                clickedKey.classList.add("active"); // Agregar clase para resaltar
                setTimeout(() => clickedKey.classList.remove("active"), 150); // Remover clase después de 150ms
            }

            index++;
            setTimeout(playNextNote, 600); // Reproducir siguiente nota después de 600ms
        } else {
            habilitarTeclas(); // Habilitar teclas después de que termine la secuencia
        }
    };
    playNextNote();
};


// Guardar el intento en el historial
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
    const existe = historial.some(entry =>
        JSON.stringify(entry.patron) === JSON.stringify(patron) &&
        JSON.stringify(entry.teclasPresionadas) === secuenciaStr
    );

    if (!existe) {
        historial.push(intento);
        localStorage.setItem("historialTeclas", JSON.stringify(historial));
    }
};

// Función para mostrar alertas
const mostrarAlert = (titulo, mensaje, icono, callback) => {
    tecladoDeshabilitado = true;
    swal({
        title: titulo,
        text: mensaje,
        icon: icono,
        timer: 3000,
        buttons: false
    }).then(() => {
        tecladoDeshabilitado = false;
        if (callback) callback();
    });
};

// Función para detectar teclas presionadas en el teclado
const pressedKey = (e) => {
    if (allKeys.includes(e.key) && flagActiveGame && teclasHabilitadas && !tecladoDeshabilitado) {
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
