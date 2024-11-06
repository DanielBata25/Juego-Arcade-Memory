<?php
$host = "localhost";
$usuario = "usuario";
$contraseña = "contraseña";
$nombre_base_datos = "personas";

// Conectar a la base de datos
$conn = mysqli_connect($host, $usuario, $contraseña, $nombre_base_datos);

// Verificar la conexión
if (!$conn) {
    die("Conexión fallida: " . mysqli_connect_error());
}

// Procesar los datos del formulario
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);

if ($data) {
    $nombre = trim($data["nombre"]);
    $apellido = trim($data["apellido"]);
    $email = trim($data["email"]);

    $errores = [];

    if (empty($nombre)) {
        $errores[] = "El nombre es obligatorio.";
    }
    if (empty($apellido)) {
        $errores[] = "El apellido es obligatorio.";
    }
    if (empty($email)) {
        $errores[] = "El correo electrónico es obligatorio.";
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errores[] = "El formato del correo electrónico no es válido.";
    }

    if (!empty($errores)) {
        echo json_encode(["message" => "Errores de validación", "errores" => $errores]);
        exit;
    }

    // Comprobar si el usuario ya está registrado
    $sql_check = "SELECT * FROM personas WHERE email = '$email'";
    $result = mysqli_query($conn, $sql_check);

    if (mysqli_num_rows($result) > 0) {
        echo json_encode(["message" => "Usuario ya registrado"]);
    } else {
        // Insertar los datos si el usuario no está registrado
        $sql = "INSERT INTO personas (nombre, apellido, email) VALUES ('$nombre', '$apellido', '$email')";
        
        if (mysqli_query($conn, $sql)) {
            echo json_encode(["message" => "Registro exitoso!"]);
        } else {
            echo json_encode(["message" => "Error al registrar: " . mysqli_error($conn)]);
        }
    }
} else {
    echo json_encode(["message" => "Datos no válidos."]);
}

mysqli_close($conn);
?>
