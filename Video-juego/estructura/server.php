<?php
use Ratchet\Server\IoServer;
use Ratchet\Http\HttpServer;
use Ratchet\WebSocket\WsServer;

require 'vendor/autoload.php';

class ChatServer implements \Ratchet\MessageComponentInterface {
    protected $clients;
    protected $users;

    public function __construct() {
        $this->clients = new \SplObjectStorage;
        $this->users = [];
    }

    public function onOpen(\Ratchet\ConnectionInterface $conn) {
        $this->clients->attach($conn);
    }

    public function onClose(\Ratchet\ConnectionInterface $conn) {
        // Eliminar la conexión
        $this->clients->detach($conn);

        // Si el usuario estaba registrado, enviar notificación de desconexión
        if (isset($this->users[$conn->resourceId])) {
            $username = $this->users[$conn->resourceId];
            unset($this->users[$conn->resourceId]);

            $this->broadcastToAll([
                'type' => 'usuario-desconectado',
                'username' => $username
            ]);
        }
    }

    public function onMessage(\Ratchet\ConnectionInterface $from, $msg) {
        $data = json_decode($msg, true);

        switch($data['type']) {
            case 'nuevo-usuario':
                // Almacenar el nombre de usuario
                $this->users[$from->resourceId] = $data['username'];

                // Enviar a todos los clientes la notificación de nuevo usuario
                $this->broadcastToAll([
                    'type' => 'nuevo-usuario',
                    'username' => $data['username']
                ]);
                break;

            case 'chat':
                // Enviar el mensaje de chat a todos los clientes
                $this->broadcastToAll([
                    'type' => 'chat',
                    'username' => $data['username'],
                    'content' => $data['content']
                ]);
                break;

            case 'start-game':
                // Enviar a todos los clientes el inicio del juego
                $this->broadcastToAll([
                    'type' => 'start-game',
                    'players' => $data['players']
                ]);
                break;
        }
    }

    public function onError(\Ratchet\ConnectionInterface $conn, \Exception $e) {
        echo "Ha ocurrido un error: {$e->getMessage()}\n";
        $conn->close();
    }

    protected function broadcastToAll($message) {
        foreach ($this->clients as $client) {
            $client->send(json_encode($message));
        }
    }
}

// Configuración del servidor WebSocket permanece igual
$server = IoServer::factory(
    new HttpServer(
        new WsServer(
            new ChatServer()
        )
    ),
    8080
);

$server->run();