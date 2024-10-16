<?php
// Configuration
$db_host = 'localhost';
$db_username = 'your_username';
$db_password = 'your_password';
$db_name = 'your_database';


$conn = new mysqli($db_host, $db_username, $db_password, $db_name);


if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}


$data = json_decode(file_get_contents('php://input'), true);


if (!isset($data['nombre']) || !isset($data['correo']) || !isset($data['contraseña'])) {
    echo json_encode(array('status' => 'error', 'message' => 'Invalid data'));
    exit;
}


$nombre = $conn->real_escape_string($data['nombre']);
$correo = $conn->real_escape_string($data['correo']);
$contraseña = $conn->real_escape_string($data['contraseña']);


$hashed_contraseña = password_hash($contraseña, PASSWORD_DEFAULT);


$query = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES ('$nombre', '$correo', '$hashed_contraseña')";
if ($conn->query($query) === TRUE) {
    echo json_encode(array('status' => 'success', 'message' => 'Usuario registrado correctamente'));
} else {
    echo json_encode(array('status' => 'error', 'message' => 'Error al registrar el usuario'));
}


$conn->close();
?>