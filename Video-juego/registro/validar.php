<?php
$email = $_POST['email'] ?? '';
$password = $_POST['contrasena'] ?? '';

$conexion = mysqli_connect("localhost", "root", "", "jugar");

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

$consulta = "SELECT * FROM persona_registro WHERE email = ? AND contrasena = ?";
$stmt = mysqli_prepare($conexion, $consulta);

mysqli_stmt_bind_param($stmt, "ss", $email, $password);


mysqli_stmt_execute($stmt);
$resultado = mysqli_stmt_get_result($stmt);

if (mysqli_num_rows($resultado) > 0) {
    header("Location: ../Jugar_multi.html");
    exit(); 
} else {
    echo "Error de autenticación.";
}

// Liberar memoria y cerrar la conexión
mysqli_free_result($resultado);
mysqli_close($conexion);
?>