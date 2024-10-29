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

    echo "Registro exitoso.";
} else {
    echo "Método no permitido.";
}
?>