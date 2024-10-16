const audio = document.getElementById('audio');
const volumeControl = document.getElementById('volume');


audio.volume = volumeControl.value;


volumeControl.addEventListener('input', () => {
    audio.volume = volumeControl.value;
});

function playPause() {
    if (audio.paused) {
        audio.play();
        document.getElementById('playPauseBTN').src = '../img/normal.png '; 
    } else {
        audio.pause();
        document.getElementById('playPauseBTN').src = '../img/mute.png'; 
    }
}