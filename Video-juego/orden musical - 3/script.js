let paises = [];
let paisesDesordenados = [];
let posJuegoActual = 0;
let cantidadAcertados = 0;
let tiempoRestante = 15;
let idInterval;
let timerPaused = false;

// Nueva función para mostrar el historial del juego
function mostrarHistorial() {
    // Obtener las respuestas guardadas
    const respuestas = JSON.parse(localStorage.getItem('respuestas')) || [];

    if (respuestas.length === 0) {
        Swal.fire({
            title: 'Sin Historial',
            text: 'Aún no has jugado ninguna ronda',
            icon: 'info',
            background: '#DBEAFE', // Fondo azul claro
            color: '#000000',     // Texto negro
            timer: 4000,          // Tiempo antes de cerrar automáticamente
            showConfirmButton: false
        });
        return;
    }

    // Calcular estadísticas
    const totalIntentos = respuestas.length;
    const respuestasCorrectas = respuestas.filter(r => r.acertado).length;
    const tiempoTotal = respuestas.reduce((sum, r) => sum + parseFloat(r.tiempo), 0).toFixed(2);

    // Mostrar solo el resumen general
    Swal.fire({
        title: 'Resumen Final',
        html: `
            <div style="text-align: left;">
                <p><strong>Total de Palabras:</strong> ${totalIntentos}</p>
                <p><strong>Respuestas Correctas:</strong> ${respuestasCorrectas}</p>
                <p><strong>Tiempo Total:</strong> ${tiempoTotal} segundos</p>
            </div>
        `,
        icon: 'info',
        background: '#DB55D2', // Fondo morado
        color: '#000000',     // Texto negro
        timer: 4000,          // Tiempo antes de cerrar automáticamente
        showConfirmButton: false
    }).then(() => {
        // Redirigir al siguiente nivel o página
        window.location.href = "../orden musical - 4/orden musical.html"; // Cambiar por la URL deseada
    });
}

// Función para limpiar historial
function limpiarHistorial() {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción borrará todo tu historial de juego",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar',
        cancelButtonText: 'Cancelar',
        background: '#DB55D2',
        color: '#000000'
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem('respuestas');
            Swal.fire(
                'Historial Borrado',
                'Se ha eliminado todo el historial de juego',
                'success'
            );
        }
    });
}

// Modificación en mostrarPantallaFinal: mostrar el historial al final
function mostrarPantallaFinal() {
    clearInterval(idInterval);
    document.getElementById("pantalla-juego").style.display = "none";
    document.getElementById("pantalla-final").style.display = "flex";
    document.getElementById("acertadas").innerHTML = cantidadAcertados;

    // Mostrar el historial del juego
    mostrarHistorial();
}

// Modificación: Agregamos evento de tecla Enter para comparar
document.getElementById('paisIngresado').addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        comparar();
    }
});

fetch('../php/palabras/conexion3.php')
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            Swal.fire('Error', data.error, 'error');
        } else {
            paises = data.paises;
            comenzarJuego();
        }
    })
    .catch(error => {
        console.error('Error:', error);
        Swal.fire('Error', 'No se pudieron cargar los datos', 'error', {
            background: '#DB55D2',
            color: '#000000'
        });
    });

function desordenarPaises() {
    paisesDesordenados = [];
    for (let i = 0; i < paises.length; i++) {
        let pais = paises[i];
        pais = pais.split('');
        let paisDesordenado = pais.sort(() => Math.random() - 0.5);
        paisDesordenado = paisDesordenado.join('');
        paisesDesordenados.push(paisDesordenado);
    }
}

function mostrarNuevoPais() {
    if (posJuegoActual >= paisesDesordenados.length) {
        mostrarPantallaFinal();
        return;
    }

    let contenedorPais = document.getElementById("pais");
    contenedorPais.innerHTML = "";
    let pais = paisesDesordenados[posJuegoActual];
    pais = pais.split('');

    for (let i = 0; i < pais.length; i++) {
        let div = document.createElement("div");
        div.className = "letra";
        div.innerHTML = pais[i];
        contenedorPais.appendChild(div);
    }

    iniciarBarraDeTiempo();
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
    let tiempoUsado = 15 - tiempoRestante;
    respuestas.push({
        paisOriginal: paises[posJuegoActual],
        paisIngresado: paisIngresado,
        tiempo: tiempoUsado.toFixed(2),
        acertado: acertado
    });
    localStorage.setItem('respuestas', JSON.stringify(respuestas));
}

function iniciarBarraDeTiempo() {
    let barra = document.getElementById("myBar");
    let tiempoTexto = document.getElementById("tiempoRestante");
    barra.style.width = "100%";
    tiempoRestante = 15;

    clearInterval(idInterval);

    if (!timerPaused) {
        idInterval = setInterval(() => {
            tiempoRestante--;
            let progreso = (tiempoRestante / 15) * 100;
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
}

function comenzarJuego() {
    localStorage.clear();
    paisesDesordenados = [];
    posJuegoActual = 0;
    cantidadAcertados = 0;
    tiempoRestante = 15;
    desordenarPaises();
    document.getElementById("pantalla-inicio").style.display = "none";
    document.getElementById("pantalla-juego").style.display = "block";
    document.getElementById("pantalla-final").style.display = "none";
    mostrarNuevoPais();
    document.getElementById("contador").innerHTML = 0;
    document.getElementById("paisIngresado").focus();
    document.getElementById("tiempoRestante").innerHTML = tiempoRestante + "s";
}

// Modificar el modal inicial para incluir tiempo y eliminar historial
window.addEventListener('load', () => {
    timerPaused = true;

    Swal.fire({
        title: "¡Empecemos!",
        icon: "success",
        html: `<div style="text-align: center;">
                  <p>ESTAS SERAN LAS SIGUIENTES PALABRAS QUE APARECERAN</p>
              
                  <ul style="list-style: none; padding: 0;">
                      <li>GUITARRA</li>
                      <li>TAMBOR</li>
                      <li>CLARINETE</li>
                      <li>ORGANO</li>
                      <li>TROMBON</li>
                  </ul>
               </div>`,
        background: '#DB55D2',
        color: '#000000',
        timer: 4000, // Tiempo de 4 segundos antes de cerrar automáticamente
        showConfirmButton: false, // Ocultar botón de confirmación
        didClose: () => {
            timerPaused = false;
            iniciarBarraDeTiempo();
        }
    });
});

