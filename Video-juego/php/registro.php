<?php
  $servername = "your_server_name";
  $username = "your_username";
  $password = "your_password";
  $dbname = "your_database_name";

  $conn = new mysqli($servername, $username, $password, $dbname);

  if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
  }

  $datos = json_decode(file_get_contents('php://input'), true);

  $nombre = $datos['nombre'];
  $correo = $datos['correo'];
  $contraseña = $datos['contraseña'];

  $hashed_password = password_hash($contraseña, PASSWORD_DEFAULT);

  $sql = "INSERT INTO usuarios (nombre, correo, contraseña) VALUES ('$nombre', '$correo', '$hashed_password')";
  $conn->query($sql);

  $asunto = 'Confirmación de registro';
  $mensaje = 'Hola ' . $nombre . ', gracias por registrarte.';
  $cabeceras = 'From: tu-correo-electronico@example.com';
  mail($correo, $asunto, $mensaje, $cabeceras);

  $conn->close();

  echo json_encode(array('message' => 'Registro exitoso'));
?>