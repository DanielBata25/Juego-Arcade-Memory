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

    // Verificar si el email ya está registrado
    if ($persona->verificarEmail($email)) {
        // Si el correo ya está registrado, mostrar alerta y redirigir al formulario de registro
        echo "<script type='text/javascript'>
                alert('El correo electrónico ya está registrado.');
                window.location.href='../../login.php'; // Cambia esto por la URL de tu formulario
              </script>";
    } else {
        // Si el correo no está registrado, proceder con la inserción
        $persona->registro();
        
        // Mostrar alerta de registro exitoso y redirigir al inicio de sesión
        echo "<script type='text/javascript'>
                alert('Registro exitoso.');
                window.location.href='../../login.php'; // Cambia esto por la página de inicio de sesión o éxito
              </script>";
    }
    exit(); // Asegura que se detenga la ejecución después de redirigir
} else {
    echo "Método no permitido.";
}
?>