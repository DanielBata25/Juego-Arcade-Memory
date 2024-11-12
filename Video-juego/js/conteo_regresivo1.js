let countdown = 3;
const countdownElement = document.getElementById("countdown");
const messageElement = document.getElementById("message");

const intervalId = setInterval(() => {
    countdownElement.textContent = countdown; 
    countdownElement.style.animation = 'none'; 
    setTimeout(() => countdownElement.style.animation = '', 0); 

    countdown--;

    if (countdown < 0) {
        clearInterval(intervalId); 
        countdownElement.style.display = "none"; // Oculta el contador
        showMessage(); 
    }
}, 1500);

function showMessage() {
   
    messageElement.classList.add("show-message");
    messageElement.textContent = "¡Let's go!"; 
    
    setTimeout(() => {
        window.location.href = "../piano_novato.html"; 
    }, 3000);
}
