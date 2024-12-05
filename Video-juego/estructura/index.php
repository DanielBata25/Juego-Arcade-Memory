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
                    <div class="row-2 forma color0"data-bs-toggle="modal" data-bs-target="#exampleModal">
                        <h1>Daniel</h1>
                    </div>
                    <div class="canal">
                        <div class="row-2 forma color0">
                            <h1>Javi</h1>
                        </div>
                        <div class="canal">
                            <div class="row-2 forma color0">
                                <h1>Duvi</h1>
                            </div>
                        </div>
                        <div class="canal">
                            <div class="row-2 forma color0">
                                <h1>Sofia</h1>
                            </div>
                        </div>
                        <div class="canal2">
                            <div class="row-2 forma color0">
                                <h1>Carlitos</h1>
                            </div>
                        </div>
                        <div class="canal1">
                            <div class="row-2 forma color0">
                                <h1>Juan</h1>
                            </div>
                        </div>
                        <div class="canal3">
                            <div class="row-2 forma color0">
                                <h1>Andres</h1>
                            </div>
                        </div>
                        <div class="canal3">
                            <div class="row-2 forma color0">
                                <h1>Jhon</h1>
                            </div>
                        </div>
                        <div class="canal3">
                            <div class="row-2 forma color0">
                                <h1>Juancho</h1>
                            </div>
                        </div>
                        <div class="canal3">
                            <div class="row-2 forma color0">
                                <h1>Daniel</h1>
                            </div>
                        </div>
                        <div id="piano">
                            <h4><img src="../img/sala.png" alt="cerebro" class="img-mediana"></h4>
                        </div>
                        
                </div>
            </div>
        </div>
    </div>

    <div class="numeros text-center">
        <a class="boton_numeros" href="../piano.html" role="button">Empezar Juego</a>
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
<script src="../../../../bootstrap/js/bootstrap.bundle.js"></script>
<script src="https://cdn.socket.io/4.5.0/socket.io.min.js"></script>
<script src="assets/script.js"></script>
<script src="assets/lobby.js"></script>
<script src="/path/to/bootstrap.bundle.js"></script>

</body>
</html>