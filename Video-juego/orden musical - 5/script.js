let paises = [];
let paisesDesordenados = [];
let posJuegoActual = 0;
let cantidadAcertados = 0;
let tiempoRestante = 7;
let idInterval;


fetch('../php/palabras/conexion5.php') 
  .then(response => response.json())
  .then(data => {
    if (data.error) {
        alert(data.error);
    } else {
        paises = data.paises; 
        comenzarJuego();
    }
  })
  .catch(error => console.error('Error:', error));


function desordenarPaises() {
    paisesDesordenados = []; 
    for (let i = 0; i < paises.length; i++) {
        let pais = paises[i];
        pais = pais.split('');
        let paisDesordenado = pais.sort(() => Math.random() - 0.5); 
        paisDesordenado = paisDesordenado.join(''); // Convertir el arreglo a string
        paisesDesordenados.push(paisDesordenado); 
    }
}


function mostrarNuevoPais() {
    if (posJuegoActual >= paisesDesordenados.length) {
        mostrarPantallaFinal();
        return;
    }

    let contenedorPais = document.getElementById("pais");
    contenedorPais.innerHTML = ""; // Limpiar el contenedor
    let pais = paisesDesordenados[posJuegoActual];
    pais = pais.split(''); // Convertir el país en arreglo de letras

    // Mostrar las letras del país
    for (let i = 0; i < pais.length; i++) {
        let div = document.createElement("div");
        div.className = "letra";
        div.innerHTML = pais[i];
        contenedorPais.appendChild(div);
    }

    // Reiniciar la barra de progreso
    iniciarBarraDeTiempo();
}


function mostrarPantallaFinal() {
    clearInterval(idInterval);
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "flex";
    document.getElementById("acertadas").innerHTML = cantidadAcertados;
}


function comparar() {
    let paisOrdenado = paises[posJuegoActual];
    let paisIngresado = document.getElementById("paisIngresado").value;
    paisIngresado = paisIngresado.toUpperCase();

    if (paisOrdenado === paisIngresado) {
        guardarResultado(paisIngresado, true);
        posJuegoActual++;
        cantidadAcertados++;
        document.getElementById("contador").innerHTML = cantidadAcertados;
        document.getElementById("paisIngresado").value = "";
        mostrarNuevoPais();
    } else if (paisIngresado.length >= paisOrdenado.length) {
        guardarResultado(paisIngresado, false);
    }
}


function guardarResultado(paisIngresado, acertado) {
    let respuestas = JSON.parse(localStorage.getItem('respuestas')) || [];
    let tiempoUsado = 7 - tiempoRestante; // Calcular el tiempo usado
    respuestas.push({
        paisOriginal: paises[posJuegoActual],
        paisIngresado: paisIngresado,
        tiempo: tiempoUsado.toFixed(2),
        acertado: acertado
    });
    localStorage.setItem('respuestas', JSON.stringify(respuestas));
}

// Función para iniciar la barra de tiempo
function iniciarBarraDeTiempo() {
    let barra = document.getElementById("myBar");
    let tiempoTexto = document.getElementById("tiempoRestante");
    barra.style.width = "100%";
    tiempoRestante = 7;

    clearInterval(idInterval);
    idInterval = setInterval(() => {
        tiempoRestante--;
        let progreso = (tiempoRestante / 7) * 100;
        barra.style.width = progreso + "%";
        tiempoTexto.innerHTML = tiempoRestante + "s";

        if (tiempoRestante <= 0) {
            clearInterval(idInterval);
            guardarResultado("", false);
            posJuegoActual++;
            mostrarNuevoPais();
        }
    }, 1000);
}

// Función para comenzar el juego
function comenzarJuego() {
    localStorage.clear(); 
    paisesDesordenados = [];
    posJuegoActual = 0;
    cantidadAcertados = 0;
    tiempoRestante = 7; // Reiniciar el tiempo
    desordenarPaises();
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    document.getElementById("pantalla-final").style.display = "none";
    mostrarNuevoPais();
    document.getElementById("contador").innerHTML = 0;
    document.getElementById("paisIngresado").focus();
    document.getElementById("tiempoRestante").innerHTML = tiempoRestante + "s"; // Mostrar tiempo inicial
}


window.addEventListener('load', () => {
    Swal.fire({
        title: "¡Empecemos!",
        icon: "success",
        html: `<div style="text-align: center;">
                  <p>ESTAS SERAN LAS SIGUIENTES PALABRAS QUE APARECERAN</p>
              
                  <ul style="list-style: none; padding: 0;">
                      <li>SAXOFON</li>
                      <li>ARMONICA</li>
                      <li>MARIMBA</li>
                      <li>MANDOLINA</li>
                      <li>PICCOLO</li>
                  </ul>
               </div>`,
        background: '#DB55D2',
        color: '#000000',
        confirmButtonText: 'Aceptar'
    });
});
