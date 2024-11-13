<?php
include('registrar.php');


header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Recoge los datos enviados por el formulario
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['contrasena'] ?? '';


    $persona = new Registrar();
    $persona->setNombrePersona($nombre);
    $persona->setEmailPersona($email);
    $persona->setPasswordPersona($password);

    try {
        // Verificar si el correo ya está registrado
        if ($persona->verificarEmail($email)) {
            // Si el correo ya existe, responde con un mensaje de error
            echo json_encode([
                "success" => false,
                "message" => "El correo electrónico ya está registrado."
            ]);
        } else {
            // Procede con el registro
            if ($persona->registro()) {
                // Responde con un mensaje de éxito
                echo json_encode([
                    "success" => true,
                    "message" => "Registro exitoso."
                ]);
            } else {
                // Error en la inserción de datos
                echo json_encode([
                    "success" => false,
                    "message" => "Hubo un problema al registrar el usuario."
                ]);
            }
        }
    } catch (Exception $e) {
        // Maneja cualquier excepción y responde con un error
        echo json_encode([
            "success" => false,
            "message" => "Ocurrió un error en el servidor: " . $e->getMessage()
        ]);
    }
} else {
    // Método no permitido
    echo json_encode([
        "success" => false,
        "message" => "Método no permitido."
    ]);
}
?>