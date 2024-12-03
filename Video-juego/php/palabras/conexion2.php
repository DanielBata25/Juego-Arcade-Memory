<?php

$host = 'localhost';
$db = 'jugar';
$user = 'root';
$pass = '';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
    // Establecer la conexión con la base de datos
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Recuperar los países ordenados desde la base de datos
    $stmt = $conn->prepare("SELECT palabra FROM adivinar_palabras2 ORDER BY palabra ASC");
    $stmt->execute();
    $paises = $stmt->fetchAll(PDO::FETCH_COLUMN);

    // Si no hay países, enviar un error
    if (empty($paises)) {
        echo json_encode(["error" => "No hay palabras disponibles."]);
    } else {
        echo json_encode(["paises" => $paises]);
    }

} catch (PDOException $e) {
    // Manejo de errores
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
}
?>
