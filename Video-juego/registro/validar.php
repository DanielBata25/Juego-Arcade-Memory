<?php
$email = $_POST['email'] ?? '';
$password = $_POST['contrasena'] ?? '';

$conexion = mysqli_connect("localhost", "root", "", "jugar");

if (!$conexion) {
    die(json_encode(["status" => "error", "message" => "Error de conexión a la base de datos."]));
}

$consulta = "SELECT * FROM persona_registro WHERE email = ? AND contrasena = ?";
$stmt = mysqli_prepare($conexion, $consulta);

mysqli_stmt_bind_param($stmt, "ss", $email, $password);
mysqli_stmt_execute($stmt);
$resultado = mysqli_stmt_get_result($stmt);

$response = [];

if (mysqli_num_rows($resultado) > 0) {
    $user = mysqli_fetch_assoc($resultado);  
    $response = [
        "status" => "success",
        "message" => "Inicio de sesión exitoso.",
        "nombre" => $user['nombre'],  
    ];
} else {
    $response = ["status" => "error", "message" => "El usuario no se encuentra registrado."];
}

mysqli_free_result($resultado);
mysqli_close($conexion);


header('Content-Type: application/json');
echo json_encode($response);
?>

