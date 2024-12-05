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

// Evento para mostrar/ocultar letras de las teclas
keysCheckbox.addEventListener('change', (e) => {
    pianoKeys.forEach((key) => {
        key.classList.toggle('hide-letters', !e.target.checked);
    });
});

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

// Iniciar temporizador dinámico
const iniciarTemporizador = () => {
    const tiempoPorNota = 1500; 
    const tiempoParaPatron = patronActual.length * tiempoPorNota; 

    tiempoLimite = setTimeout(() => {
        if (pressedKeys.length < patronActual.length) {
            mostrarAlert("¡Tiempo agotado!", "No completaste el patrón a tiempo.", "warning", () => {
                pressedKeys = [];
                verificarUltimoPatron();
            });
        }
    }, tiempoParaPatron); 
};

// Función para detener el temporizador
const detenerTemporizador = () => clearTimeout(tiempoLimite);

// Función para reproducir la nota
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play().catch((error) => console.error("Error al reproducir audio:", error));

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => clickedKey.classList.remove("active"), 150);
    }
};

// Modificar los event listeners de las teclas del piano
pianoKeys.forEach((key) => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => {
        if (flagActiveGame && teclasHabilitadas && !tecladoDeshabilitado) {
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
    if (teclasHabilitadas && pressedKeys.length === patronActual.length) {
        detenerTemporizador();
        
        // Contar cuántas teclas acertó el usuario
        let teclasCorrectas = 0;
        pressedKeys.forEach((key, index) => {
            if (key === patronActual[index]) {
                teclasCorrectas++;
            }
        });

        const isCorrect = teclasCorrectas === patronActual.length;

        if (isCorrect) {
            score += pressedKeys.length;
            mostrarAlert(
                "¡Correcto!",
                `Has tocado el patrón correctamente\n Teclas Acertadas: ${teclasCorrectas} de ${patronActual.length}.`,
                "success",
                () => {
                    verificarUltimoPatron();
                }
            );
        } else {
            mostrarAlert(
                "¡Incorrecto!",
                `El patrón no coincide\n Teclas Acertadas: ${teclasCorrectas} de ${patronActual.length}\n. Pasando al siguiente patrón.`,
                "error",
                () => {
                    verificarUltimoPatron();
                }
            );
        }

        // Guardar el intento en el historial
        guardarIntento(patronActual, pressedKeys, isCorrect);
        pressedKeys = [];
    }
};

const verificarUltimoPatron = () => {
    if (patronIndex === patronesMusicales.length - 1) {
        flagActiveGame = false;
        teclasHabilitadas = false;

        mostrarResumenHistorial();
    } else {
        patronIndex++;
        avanzarPatron();
    }
};

// Mostrar resumen del historial
const mostrarResumenHistorial = () => {
    const historial = JSON.parse(localStorage.getItem("historialTeclas")) || [];
    const aciertos = historial.filter((intento) => intento.resultado === "Correcto").length;
    const tiempoTotal = historial.reduce(
        (total, intento) => total + intento.puntuacion * 2,
        0
    );

    swal({
        title: "¡Juego Terminado!",
        text: `Total de Patrones: 4\n Patrones Acertados: ${aciertos}\nTiempo total: ${tiempoTotal} segundos`,
        icon: "success",
        button: "Finalizar",
    }).then(() => {
        // Reiniciar el historial al finalizar el juego
        localStorage.removeItem("historialTeclas");
        redirigirPagina();
    });
};

// Avanza al siguiente patrón
const avanzarPatron = () => {
    patronActual = patronesMusicales[patronIndex];

    mostrarAlert(
        `Patrón ${patronIndex + 1}`,
        `Vas a escuchar el patrón ${patronIndex + 1}.`,
        "info",
        () => {
            setTimeout(() => {
                playSecuencia();
            }, 1500);
        }
    );
};

// Redirigir a la página final
const redirigirPagina = () => {
    window.location.href =
        "http://localhost/Juego-Arcade-Memory/Video-juego/dificultad/piano.html";
};

const cargarPatronMusical = () => {
    fetch("php/conexion1.php")
        .then((response) => {
            if (!response.ok) throw new Error("Error en la carga de patrones musicales");
            return response.text();
        })
        .then((text) => {
            try {
                const data = JSON.parse(text);
                if (data.error) return;

                patronesMusicales = data.patronesMusicales;
                if (patronesMusicales.length > 0) {
                    patronActual = patronesMusicales[0];

                    mostrarAlert(
                        `Patrón 1`,
                        `Vas a escuchar el patrón 1.`,
                        "info",
                        () => {
                            playSecuencia();
                        }
                    );
                }
            } catch (e) {
                console.error("Error al parsear JSON:", e, "Respuesta:", text);
            }
        })
        .catch((error) => console.error("Error al cargar el patrón musical:", error));
};

// Reproducir secuencia de notas
const playSecuencia = () => {
    tecladoDeshabilitado = true; // Deshabilitar completamente las teclas
    deshabilitarTeclas();
    let index = 0;
    const playNextNote = () => {
        if (index < patronActual.length) {
            const key = patronActual[index];
            playTune(key);

            const clickedKey = document.querySelector(`[data-key="${key}"]`);
            if (clickedKey) {
                clickedKey.classList.add("active");
                setTimeout(() => clickedKey.classList.remove("active"), 150);
            }

            index++;
            setTimeout(playNextNote, 600);
        } else {
            tecladoDeshabilitado = false; // Habilitar teclas después de reproducir patrón
            habilitarTeclas();
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
        timestamp: new Date().toISOString(),
    };

    const secuenciaStr = JSON.stringify(teclasPresionadas);
    const existe = historial.some(
        (entry) =>
            JSON.stringify(entry.patron) === JSON.stringify(patron) &&
            JSON.stringify(entry.teclasPresionadas) === secuenciaStr
    );

    if (!existe) {
        historial.push(intento);
        localStorage.setItem("historialTeclas", JSON.stringify(historial));
    }
};

const mostrarAlert = (titulo, mensaje, icono, callback) => {
    tecladoDeshabilitado = true;
    swal({
        title: titulo,
        text: mensaje,
        icon: icono,
        timer: 3000,
        buttons: false,
    }).then(() => {
        tecladoDeshabilitado = false;
        if (callback) callback();
    });
};

// Función para detectar teclas presionadas en el teclado
const detectarTeclaTeclado = (evento) => {
    if (!tecladoDeshabilitado) {
        const tecla = evento.key.toLowerCase();
        if (allKeys.includes(tecla)) {
            playTune(tecla);
            agregarTecla(tecla);
        }
    }
};

document.addEventListener("keydown", detectarTeclaTeclado);

cargarPatronMusical();
