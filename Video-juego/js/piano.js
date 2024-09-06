const pianoKeys = document.querySelectorAll(".piano-keys .key");

let audio = new Audio("tunes/a.wav"); //by default, audio src is "a" tune

const playTune = (key) => {
    audio.src = `tunes/${key}.wav`; //passing audio src based on key pressed
    audio.play(); //playing audio

    const clickedKey = document.querySelector(`[data-key="${key}"]`);
    clickedKey.classList.add("active"); //adding class to the clkickked key element
    setTimeout(() => {//removing active class after 150 ms the clicked key element 
         clickedKey.classList.remove("active");
        },150);
}

pianoKeys.forEach(key => {
    //calling playTune function with passing data-key value as an argument
    key.addEventListener("click", () => playTune(key.dataset.key));
});

const pressedkey = (e) => {
    playTune(e.key);
}
document.addEventListener("keydown", pressedkey);
