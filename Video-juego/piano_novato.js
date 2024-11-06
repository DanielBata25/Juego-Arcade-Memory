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

document.addEventListener("click", desbloquearAudio);

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
    if (teclasHabilitadas && pressedKeys.length === patronActual.length) {
        console.log("Longitud de pressedKeys coincide con patronActual.");
        const isCorrect = pressedKeys.every((key, index) => key === patronActual[index]);

        if (isCorrect) {
            score += pressedKeys.length;
            console.log("Patrón correcto.");
            swal({
                title: "¡Correcto!",
                text: "Has tocado el patrón correctamente.",
                icon: "success",
                timer: 1500,
                buttons: false
            }).then(() => {
                verificarUltimoPatron();
            });
        } else {
            console.log("Patrón incorrecto.");
            swal({
                title: "¡Incorrecto!",
                text: "El patrón no coincide. Pasando al siguiente patrón.",
                icon: "error",
                timer: 2000,
                buttons: false
            }).then(() => {
                verificarUltimoPatron();
            });
        }

        guardarIntento(patronActual, pressedKeys, isCorrect);
        pressedKeys = [];
    }
};

const verificarUltimoPatron = () => {
    if (patronIndex === patronesMusicales.length - 1) {
        console.log("Último patrón alcanzado.");
        flagActiveGame = false;
        teclasHabilitadas = false;
        
        swal({
            title: "¡Felicidades!",
            text: "Has completado todos los patrones.",
            icon: "success",
            button: "Continuar"
        }).then(() => {
            redirigirPagina(); // Redirige después de que el usuario cierre el mensaje
        });
    } else {
        patronIndex++;
        avanzarPatron();
    }
};

const avanzarPatron = () => {
    teclasHabilitadas = false; // Deshabilitar teclas antes de reproducir el patrón
    patronActual = patronesMusicales[patronIndex];
    playSecuencia();

    // Reactivar teclas después de que termine la secuencia
    setTimeout(() => {
        teclasHabilitadas = true;
        console.log("Teclas habilitadas para el siguiente patrón.");
    }, patronActual.length * 1000); // Ajusta el tiempo si la secuencia es más rápida o lenta
};

const redirigirPagina = () => {
    console.log("Redirigiendo a la página final...");
    window.location.href = "http://localhost/Juego-Arcade-Memory/Video-juego/play.html";
};


const cargarPatronMusical = () => {
    fetch("php/conexion.php")
    .then(response => {
        console.log("Estado de la respuesta:", response.status);
        if (!response.ok) throw new Error("Error en la carga de patrones musicales");
        return response.text(); 
    })
    .then(text => {
        try {
            const data = JSON.parse(text); 
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
        console.log("Intento guardado en el historial.");
    } else {
        console.log("La secuencia ya existe en el historial. No se agregó para evitar duplicados.");
    }
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
