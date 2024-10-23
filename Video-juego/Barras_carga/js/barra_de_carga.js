const progressBar = document.getElementById('progressBar');
let progreso = 0;

progressBar.style.width = '0%';

const interval = setInterval(() => {
    if (progreso >= 100) {
        clearInterval(interval);
        // Redirigir a otra página
        window.location.href = '../Play2.html'; // Cambia esto si es necesario
    } else {
        progreso++;
        progressBar.style.width = progreso + '%';
    }
}, 41); // Ajusta el tiempo aquí para acelerar o desacelerar la carga


const numero = document.querySelector('.numero-cargar')

let segundo  = [34,34,34,34]

let contedorNumero =[]



function lectitud(valor){
    let numeroAleatorio= Math.floor(Math.random()*segundo.length)  
    setTimeout(()=>{

        if(valor>100){
            
            return numero.textContent = '100';
        }{
            numero.textContent = valor
            setInterval(lectitud(valor+1),150)

        }
    },segundo[numeroAleatorio])
}

lectitud(1)