let progress = 0;
const progressBar = document.getElementById("progressBar");
const progressText = document.getElementById("progressText");

const loadingInterval = setInterval(() => {
    if (progress >= 100) {
        clearInterval(loadingInterval);
        // Aquí podrías redirigir a otra página, si es necesario
        // window.location.href = "../Play2.html";
    } else {
        progress++;
        progressBar.style.width = progress + "%"; // Aumenta el ancho de la barra
        progressText.textContent = progress + "%"; // Actualiza el texto
    }
}, 100); // Cambia 100 por el tiempo que desees entre cada aumento


