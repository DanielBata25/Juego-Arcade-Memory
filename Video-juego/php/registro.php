<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Obtener el contenido del cuerpo de la solicitud POST
    $data = file_get_contents('php://input');
    $usuario = json_decode($data, true);

    if ($usuario) {
        // Leer el archivo de usuarios JSON existente
        $archivo = 'usuarios.json';
        $usuariosExistentes = [];

        if (file_exists($archivo)) {
            $usuariosExistentes = json_decode(file_get_contents($archivo), true);
        }

        // Agregar el nuevo usuario al arreglo de usuarios existentes
        $usuariosExistentes[] = $usuario;

        // Guardar todos los usuarios en el archivo JSON
        file_put_contents($archivo, json_encode($usuariosExistentes, JSON_PRETTY_PRINT));

        echo json_encode(['status' => 'success', 'message' => 'Usuario registrado correctamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Datos de usuario no válidos']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}
?>