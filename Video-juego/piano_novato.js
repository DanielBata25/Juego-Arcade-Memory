const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider"),
    keysCheckbox = document.querySelector(".keys-checkbox input"),
    temporizador = document.getElementById("temporizador"),
    tiempoRestanteSpan = document.getElementById("tiempo-restante");

let cuentaRegresiva,
    allKeys = [],
    pressedKeys = [],
    patronesMusicales = [],
    patronActual = [],
    patronIndex = 0,
    tiempoLimite = 8,
    teclasHabilitadas = true,
    tecladoDeshabilitado = false,
    score = 0,
    flagActiveGame = true,
    audio = new Audio();

// Inicializar historial en localStorage
if (!localStorage.getItem("historialTeclas")) {
    localStorage.setItem("historialTeclas", JSON.stringify([]));
}

// Desbloquear el audio en el primer clic
const desbloquearAudio = () => {
    audio.play().catch(() => {});
    document.removeEventListener("click", desbloquearAudio);
};
document.addEventListener("click", desbloquearAudio);

// Habilitar/deshabilitar teclas
const habilitarTeclas = () => {
    teclasHabilitadas = true;
    pianoKeys.forEach(key => key.classList.remove("disabled"));
    iniciarTemporizador(tiempoLimite);
};
const deshabilitarTeclas = () => {
    teclasHabilitadas = false;
    pianoKeys.forEach(key => key.classList.add("disabled"));
};

// Temporizador
const iniciarTemporizador = (duracion) => {
    let tiempoRestante = duracion;
    tiempoRestanteSpan.textContent = tiempoRestante;
    temporizador.style.display = "block";

    cuentaRegresiva = setInterval(() => {
        tiempoRestante--;
        tiempoRestanteSpan.textContent = tiempoRestante;

        if (tiempoRestante <= 0) {
            detenerTemporizador();
            mostrarAlert("¡Tiempo agotado!", "No completaste el patrón a tiempo.", "warning", () => {
                pressedKeys = [];
                verificarUltimoPatron();
            });
        }
    }, 1000);
};
const detenerTemporizador = () => {
    clearInterval(cuentaRegresiva);
    temporizador.style.display = "none";
};

// Reproducir notas
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    audio.play().catch(err => console.error('Error al reproducir audio:', err));

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => clickedKey.classList.remove("active"), 150);
    }
};

// Agregar tecla sin repetir consecutivamente
const agregarTecla = (key) => {
    if (pressedKeys[pressedKeys.length - 1] !== key) {
        pressedKeys.push(key);
        console.log(`Teclas presionadas: ${pressedKeys}`);
        compareKeys();
    }
};

// Comparar teclas con el patrón actual
const compareKeys = () => {
    const isPartialMatch = patronActual.slice(0, pressedKeys.length).every((key, index) => key === pressedKeys[index]);

    if (!isPartialMatch) {
        mostrarAlert("¡Incorrecto!", "Te equivocaste en el patrón. Vuelve a intentarlo.", "error", () => {
            pressedKeys = [];
        });
        return;
    }

    if (pressedKeys.length === patronActual.length) {
        detenerTemporizador();
        mostrarAlert("¡Correcto!", "Has tocado el patrón correctamente.", "success", () => {
            score += pressedKeys.length;
            verificarUltimoPatron();
        });
        guardarIntento(patronActual, pressedKeys, true);
        pressedKeys = [];
    }
};

// Verificar último patrón o avanzar
const verificarUltimoPatron = () => {
    if (patronIndex === patronesMusicales.length - 1) {
        flagActiveGame = false;
        teclasHabilitadas = false;
        localStorage.setItem("historialTeclas", JSON.stringify([]));

        swal({
            title: "¡Felicidades!",
            text: "Has completado todos los patrones.",
            icon: "success",
            button: "Continuar"
        }).then(() => redirigirPagina());
    } else {
        patronIndex++;
        avanzarPatron();
    }
};
const avanzarPatron = () => {
    patronActual = patronesMusicales[patronIndex];
    mostrarAlert(`Patrón ${patronIndex + 1}`, `Vas a escuchar el patrón ${patronIndex + 1}.`, "info", () => {
        setTimeout(playSecuencia, 1500);
    });
};

// Secuencia musical
const playSecuencia = () => {
    deshabilitarTeclas();
    let index = 0;

    const playNextNote = () => {
        if (index < patronActual.length) {
            playTune(patronActual[index]);
            index++;
            setTimeout(playNextNote, 600);
        } else {
            habilitarTeclas();
        }
    };
    playNextNote();
};

// Cargar patrones desde servidor
const cargarPatronMusical = () => {
    fetch("php/conexion1.php")
        .then(response => response.json())
        .then(data => {
            patronesMusicales = data.patronesMusicales || [];
            if (patronesMusicales.length) {
                patronActual = patronesMusicales[0];
                avanzarPatron();
            }
        })
        .catch(error => console.error("Error al cargar patrones:", error));
};

// Guardar intentos en localStorage
const guardarIntento = (patron, teclasPresionadas, esCorrecto) => {
    let historial = JSON.parse(localStorage.getItem("historialTeclas")) || [];
    const intento = {
        patron,
        teclasPresionadas,
        resultado: esCorrecto ? "Correcto" : "Incorrecto",
        puntuacion: esCorrecto ? teclasPresionadas.length : 0,
        timestamp: new Date().toISOString()
    };

    if (!historial.some(entry => JSON.stringify(entry) === JSON.stringify(intento))) {
        historial.push(intento);
        localStorage.setItem("historialTeclas", JSON.stringify(historial));
    }
};

// Mostrar alertas
const mostrarAlert = (titulo, mensaje, icono, callback) => {
    tecladoDeshabilitado = true;
    swal({ title: titulo, text: mensaje, icon: icono, timer: 3000, buttons: false })
        .then(() => {
            tecladoDeshabilitado = false;
            if (callback) callback();
        });
};

// Detectar teclas presionadas
document.addEventListener("keydown", (e) => {
    if (allKeys.includes(e.key) && teclasHabilitadas && !tecladoDeshabilitado) {
        playTune(e.key);
        agregarTecla(e.key);
    }
});

// Configuración inicial
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => {
        if (teclasHabilitadas && !tecladoDeshabilitado) {
            playTune(key.dataset.key);
            agregarTecla(key.dataset.key);
        }
    });
});
keysCheckbox.addEventListener("click", () => pianoKeys.forEach(key => key.classList.toggle("hide")));
volumeSlider.addEventListener("input", (e) => audio.volume = e.target.value);
document.addEventListener("DOMContentLoaded", cargarPatronMusical);