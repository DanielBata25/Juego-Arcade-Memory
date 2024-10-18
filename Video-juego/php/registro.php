<?php
$host = "localhost"; 
$usuario = "usuario"; // Usuario de la base de datos
$contraseña = "contraseña"; // Contraseña del usuario
$nombre_base_datos = "personas"; // Nombre de la base de datos

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
    // Obtener los datos del formulario
    $nombre = trim($data["nombre"]);
    $apellido = trim($data["apellido"]);
    $email = trim($data["email"]);
    $telefono = trim($data["telefono"]);

    // Validaciones
    $errores = [];

    // Validar que los campos no estén vacíos
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
    if (empty($telefono)) {
        $errores[] = "El teléfono es obligatorio.";
    }

    // Si hay errores, devolverlos
    if (!empty($errores)) {
        echo json_encode(["message" => "Errores de validación", "errores" => $errores]);
        exit;
    }

    // Insertar los datos en la base de datos
    // Nota: Para mayor seguridad, considera usar sentencias preparadas
    $sql = "INSERT INTO personas (nombre, apellido, email, telefono) VALUES ('$nombre', '$apellido', '$email', '$telefono')";
    
    if (mysqli_query($conn, $sql)) {
        echo json_encode(["message" => "Registro exitoso!"]);
    } else {
        echo json_encode(["message" => "Error al registrar: " . mysqli_error($conn)]);
    }
} else {
    echo json_encode(["message" => "Datos no válidos."]);
}

// Cerrar la conexión
mysqli_close($conn);
?>