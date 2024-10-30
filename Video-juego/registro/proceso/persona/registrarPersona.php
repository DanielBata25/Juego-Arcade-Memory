<?php
include('registrar.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $nombre = $_POST['nombre'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['contrasena'] ?? '';

    $persona = new Registrar();
    $persona->setNombrePersona($nombre);
    $persona->setEmailPersona($email);
    $persona->setPasswordPersona($password);
    $persona->registro();

    // Redirigir al usuario al formulario de inicio de sesión
    header('Location: ../../login.php');
    exit(); // Asegura que se detenga la ejecución después de redirigir
} else {
    echo "Método no permitido.";
}
?>