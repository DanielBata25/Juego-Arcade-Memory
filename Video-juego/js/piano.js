const pianoKeys = document.querySelectorAll(".piano-keys .key"),
volumeSlider = document.querySelector(".volume-slider input"),
keysCheckbox = document.querySelector(".keys-checkbox input");


let allKeys = [],
audio = new Audio("tunes/a.wav"); 
//por defecto, audio src es "una" melodía

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`;  //pasando audio src basado en la tecla presionada
    audio.play(); //reproduciendo audio
  

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active"); //agregando clase al elemento clave clickked
    setTimeout(() => {//eliminando la clase activa después de 150 ms del elemento clave en el que se hizo clic
         clickedKey.classList.remove("active");
        },150);
}

pianoKeys.forEach(key => {
    allKeys.push(key.dataset.key)//adding data-key value to the allKeys array
    //calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const handleVolume =(e) =>{
    audio.volume = e.target.value; //agregando valor de clave de datos a la matriz allKeys
}

const showHideKeys = () => {//alternar ocultar clase de cada tecla en la casilla de verificación, hacer clic
    pianoKeys.forEach(key => key.classList.toggle("hide"));
}


const pressedKey = (e) => {
//Si la tecla presionada está en la matriz allKeys, solo llama a la función playtune
    if(allKeys.includes(e.key)) playTune(e.key);
}

keysCheckbox.addEventListener("click", showHideKeys);
volumeSlider.addEventListener("input", handleVolume);
document.addEventListener("keydown", pressedKey);
