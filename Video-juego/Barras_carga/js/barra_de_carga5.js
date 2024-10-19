const progressBar = document.getElementById('progressBar');
let progreso = 0;

progressBar.style.width = '0%';

const interval = setInterval(() => {
    if (progreso >= 100) {
        clearInterval(interval);
        // Redirigir a otra página
        window.location.href = '../../Video-juego/Inicio_deJuegos/numeros/novatoejr1.html'; // Cambia esto si es necesario
    } else {
        progreso++;
        progressBar.style.width = progreso + '%';
    }
}, 41); // Ajusta el tiempo aquí para acelerar o desacelerar la carga