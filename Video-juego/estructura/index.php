<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Sala de Espera - Chat</title>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link rel="stylesheet" href="assets/styles.css">
    <link href="https://fonts.googleapis.com/css2?family=Pirata+One&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="../../../bootstrap/css/bootstrap.css">
    <link rel="stylesheet" href="../bootstrap-5.1.3-dist/css/bootstrap.css">
    <link rel="stylesheet" href="../css/sala.css">
    <link rel="stylesheet" href="/path/to/bootstrap.css">
</head>
<body>
    <div class="container text-center">
        <div class="row">
            <div id="general">
                <h3>Lobby</h3>
            </div>
        </div>
    
        <div class="contenedor">
            <div class="tarjeta-1">
                <div class="canal">
                    <div class="row-2 forma color0" data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <h1><span id="nombre-usuario"></span></h1>
                    </div>
                </div>
            </div>
        </div>

        <div id="usuarios-conectados">
            <h4>Usuarios Conectados:</h4>
            <ul id="lista-usuarios"></ul>
        </div>
    </div>

    <div class="numeros text-center">
        <a class="boton_numeros" href="../Guias_juego/musica/Guia musica1.html" role="button">Empezar Juego</a>
    </div>

    <div id="chat-container" class="fixed bottom-4 right-4 z-10 w-30">
        <div id="chat-toggle" class="bg-blue-0 text-white px-4 py-1 rounded-lg cursor-pointer">
            <img src="../img/burbuja-de-chat.png" alt="Icono de chat" class="w-14 h-14" />
        </div>

        <div id="chat-window" class="hidden bg-white border rounded-lg shadow-xl mt-2">
            <div id="login-section" class="p-4">
                <input type="text" id="username" placeholder="Ingresa tu nombre" 
                    class="w-full px-3 py-2 border rounded-lg mb-2">
                <button id="login-btn" class="w-full bg-green-500 text-white py-2 rounded-lg">
                    Entrar al Sala
                </button>
            </div>

            <div id="chat-section" class="hidden">
                <div id="messages" class="h-96 overflow-y-auto p-4"></div>
                <div class="border-t p-2 flex">
                    <input type="text" id="message-input" placeholder="Escribe un mensaje" 
                        class="flex-grow px-3 py-2 border rounded-l-lg">
                    <button id="send-btn" class="bg-blue-500 text-white px-4 py-2 rounded-r-lg">
                        Enviar
                    </button>
                </div>
            </div>
        </div>
    </div>

    <script src="js/sala.js"></script>
    <script src="../../../bootstrap/js/bootstrap.js"></script>
    <script src="js/avatar.js"></script>
    <script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>
    <script src="assets/script.js"></script>
    <script src="assets/lobby.js"></script>
    <script src="/path/to/bootstrap.bundle.js"></script>
    <script src="../registro/iniciarSesion.js"></script>     
    
    <script>
        // Recuperar el nombre del usuario desde localStorage
        document.addEventListener('DOMContentLoaded', () => {
            const usuario = localStorage.getItem('usuario'); // Obtiene el nombre del usuario desde localStorage
            const nombreUsuarioElement = document.getElementById('nombre-usuario');
            const listaUsuariosElement = document.getElementById('lista-usuarios');

            // Establecer el nombre del usuario en el elemento correspondiente
            if (usuario && nombreUsuarioElement) {
                nombreUsuarioElement.textContent = usuario;
            }

            // Función para obtener y mostrar los usuarios conectados
            function cargarUsuarios() {
                fetch('usuarios.php') // Hace una solicitud GET al archivo usuarios.php
                    .then(response => response.json()) // Convierte la respuesta en formato JSON
                    .then(data => {
                        listaUsuariosElement.innerHTML = ''; // Limpia la lista antes de agregar los nuevos usuarios
                        data.forEach(username => {
                            const li = document.createElement('li');
                            li.textContent = username; // Muestra el nombre de usuario
                            listaUsuariosElement.appendChild(li);
                        });
                    })
                    .catch(error => console.error('Error al cargar los usuarios:', error));
            }

            cargarUsuarios(); // Cargar la lista de usuarios cuando la página se cargue

            // Función para ingresar al chat y guardar el nombre del usuario en localStorage
            const loginBtn = document.getElementById('login-btn');
            const usernameInput = document.getElementById('username');
            const chatSection = document.getElementById('chat-section');
            const loginSection = document.getElementById('login-section');

            loginBtn.addEventListener('click', () => {
                const username = usernameInput.value.trim();
                if (username) {
                    localStorage.setItem('usuario', username); // Guarda el nombre del usuario en localStorage
                    loginSection.classList.add('hidden'); // Oculta el formulario de login
                    chatSection.classList.remove('hidden'); // Muestra el área de chat

                    // Aquí podrías enviar al servidor que un usuario se ha conectado
                    fetch('usuarios.php', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ action: 'add', username: username })
                    }).then(() => cargarUsuarios()); // Vuelve a cargar la lista de usuarios
                }
            });
        });
    </script>
</body>
</html>
