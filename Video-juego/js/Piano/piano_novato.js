const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    pressedKeys = new Set(),
    audio = new Audio(), 
    flagActiveGame = true;

let patron_musical = [],
    patronMusicalIndex = 0;

// Reproducir la nota y animar la tecla
const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;
    
    audio.play().catch(error => {
        console.error('Error al reproducir audio:', error);
    });

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    if (clickedKey) {
        clickedKey.classList.add("active");
        setTimeout(() => clickedKey.classList.remove("active"), 150);
    } else {
        console.warn(`No se encontró la tecla con data-key="${key}"`);
    }
};

// Asignar eventos a las teclas del piano
pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key);
    key.addEventListener("click", () => {
        if (flagActiveGame) {
            playTune(key.dataset.key);
            pressedKeys.add(key.dataset.key);
            console.log(Array.from(pressedKeys));
            compareKeys();
        } else {
            console.log("El piano ya no se puede tocar.");
        }
    });
});

////////////////////////////////////////////////////////////////////////////////////////////7//
const handleVolume = (e) => {
    audio.volume = e.target.value;
};


const showHideKeys = () => {
    pianoKeys.forEach(key => key.classList.toggle("hide"));
};
////////////////////////////////////////////////////////////////////////////////////////////7//
// Detectar y reproducir teclas desde el teclado físico
const pressedKey = (e) => {
    if (allKeys.includes(e.key) && flagActiveGame) {
        playTune(e.key);
        pressedKeys.add(e.key);
        console.log(Array.from(pressedKeys));
        compareKeys();
    } else {
        console.log("El piano ya no se puede tocar.");
    }
};

// Comparar teclas presionadas con el patrón musical
const compareKeys = () => {
    if (pressedKeys.size === patron_musical.length) {
        const isCorrect = Array.from(pressedKeys).every(
            (key, index) => key === patron_musical[index]
        );

        if (isCorrect) {
            modalMsg("¡Felicidades! Has completado el patrón.");
        } else {
            modalMsg2("Patrón incorrecto. Inténtalo de nuevo.");
        }

        flagActiveGame = false;
        guardarDatos();
    }
};

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
////////////////////////////////////////////////////////////////////////////////////////////7//
// Cargar patrón musical desde JSON

const cargarPatronMusical = () => {
    fetch('./datos.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Red no válida');
            }
            return response.json();
        })
        .then(data => {
            if (data && data.patronMusical) {
                patron_musical = data.patronMusical;
                console.log('Patrón musical cargado:', patron_musical);
                playSecuencia(); // Iniciar la secuencia automáticamente al cargar el patrón
            } else {
                console.error('Patrón musical no encontrado.');
                patron_musical = [];
            }
        })
        .catch(error => {
            console.error('Error al cargar el patrón musical:', error);
            patron_musical = [];
        });
};

const playSecuencia = () => {
    if (patron_musical.length === 0) return;

    if (patronMusicalIndex < patron_musical.length) {
        playTune(patron_musical[patronMusicalIndex]);
        patronMusicalIndex++;
        setTimeout(playSecuencia, 500);
    } else {
        patronMusicalIndex = 0;
    }
};

window.addEventListener("DOMContentLoaded", cargarPatronMusical);

function modalMsg(textMsg) {
    let modal = new bootstrap.Modal(document.getElementById('alert'));
    let msg = document.querySelector('#alert .modal-body');
    msg.innerHTML = textMsg;
    modal.show();
}

function modalMsg2(textMsg2) {
    let modal = new bootstrap.Modal(document.getElementById('alert2'));
    let msg = document.querySelector('#alert2 .modal-body');
    msg.innerHTML = textMsg2;
    modal.show();
}

////////////////////////////////////////////////////////////////////////////////////////////7//

const guardarDatos = () => {
    const data = {
        patronMusical: patron_musical,
        teclasPresionadas: Array.from(pressedKeys) // Asegurando que se almacenan sin duplicados
    };

    fetch('./guardar.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => console.log('Éxito:', data))
    .catch(error => console.error('Error:', error));
};