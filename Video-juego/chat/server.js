const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app); // Servidor HTTP para videojuego y chat
const io = socketIo(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Servir el videojuego desde la ruta /Juego-Arcade-Memory
app.use('/Juego-Arcade-Memory', express.static(__dirname + '/Juego-Arcade-Memory'));

// Ruta para la interfaz del chat (opcional)
app.get('/chat', (req, res) => {
    res.sendFile(__dirname + '/indexchat.html'); // Ajusta el path si es necesario
});

// Lógica del chat
const usuarios = new Map();

io.on('connection', (socket) => {
    console.log('Usuario conectado:', socket.id);

    socket.on('nuevo-usuario', (nombre) => {
        usuarios.set(socket.id, nombre);
        io.emit('usuario-conectado', nombre);
    });

    socket.on('chat', (mensaje) => {
        const nombre = usuarios.get(socket.id);
        io.emit('chat', { nombre, mensaje });
    });

    socket.on('escribiendo', (escribiendo) => {
        const nombre = usuarios.get(socket.id);
        socket.broadcast.emit('escribiendo', { nombre, escribiendo });
    });

    socket.on('disconnect', () => {
        const nombre = usuarios.get(socket.id);
        if (nombre) {
            io.emit('usuario-desconectado', nombre);
            usuarios.delete(socket.id);
        }
    });
});

// Iniciar el servidor en el puerto 80
server.listen(80, () => {
    console.log('Servidor corriendo en http://localhost/Juego-Arcade-Memory/');
    console.log('Chat disponible en http://localhost/chat (si usas una interfaz)');
});
