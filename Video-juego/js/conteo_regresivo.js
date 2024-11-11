let countdown = 3;
const countdownElement = document.getElementById("countdown");
const messageElement = document.getElementById("message");

const intervalId = setInterval(() => {
    countdownElement.textContent = countdown; // Actualiza el texto del contador
    countdownElement.style.animation = 'none'; // Reinicia la animación
    setTimeout(() => countdownElement.style.animation = '', 0); // Aplica la animación nuevamente

    countdown--;

    if (countdown < 0) {
        clearInterval(intervalId); // Detiene la cuenta regresiva
        countdownElement.style.display = "none"; // Oculta el contador
        showMessage(); // Muestra el mensaje después del conteo
    }
}, 1500);

function showMessage() {
    // Aplica la clase que hace visible el mensaje
    messageElement.classList.add("show-message");
    messageElement.textContent = "¡Let's go!"; // Muestra el mensaje
    // Redirige al juego del piano después de un pequeño retraso
    setTimeout(() => {
        window.location.href = "piano_novato.html"; // Cambia esta URL por la de tu juego
    }, 3000); // Retraso de 1 segundo antes de redirigir
}
