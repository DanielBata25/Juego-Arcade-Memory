const pianoKeys = document.querySelectorAll(".piano-keys .key"),
    volumeSlider = document.querySelector(".volume-slider input"),
    keysCheckbox = document.querySelector(".keys-checkbox input");

let allKeys = [],
    pressedKeys = [], 
    audio = new Audio("tunes/a.wav"),
    flagActiveGame = true;

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
            pressedKeys.push(key.dataset.key); 
            console.log(pressedKeys);
            compareKeys(); 
        } else {
            console.log("El piano ya no se puede tocar."); 
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
        pressedKeys.push(e.key); 
        console.log(pressedKeys); 
        compareKeys(); 
    } else {
        console.log("El piano ya no se puede tocar."); 
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
        flagActiveGame = false;  
    }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////
keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);


const patron_musical = ["w", "s","e", "d",];


let patronMusicalIndex = 0;
let patronMusicalInterval;


const playSecuencia = () => {
    if (patronMusicalIndex >= patron_musical.length) {
        clearInterval(patronMusicalInterval);
        patronMusicalIndex = 0; // Resetea el índice para permitir reproducción de la secuencia nuevamente
        return;
    }
    playTune(patron_musical[patronMusicalIndex]);
    patronMusicalIndex++;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////
const iniciarModoSecuencia = () => {
    patronMusicalInterval = setInterval(playSecuencia, 500); 
}

const pararModoSecuencia = () => {
    clearInterval(patronMusicalInterval);
    patronMusicalIndex = 0; 
}


window.addEventListener("DOMContentLoaded", () => {
    iniciarModoSecuencia();
});

//////////////////////////////////////////////////////////////////////////////////////////////////////////////
function modalMsg(textMsg){
    let modal = new bootstrap.Modal(document.getElementById('alert'));
    let msg = document.querySelector('#alert .modal-body'); 
    msg.innerHTML = textMsg; 
    modal.show();
}

function modalMsg2(textMsg2){
    let modal = new bootstrap.Modal(document.getElementById('alert2'));
    let msg = document.querySelector('#alert2 .modal-body');
    msg.innerHTML = textMsg2; 
    modal.show(); 
}