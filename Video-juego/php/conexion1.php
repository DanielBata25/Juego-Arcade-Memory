<?php

$host = 'localhost';
$db = 'jugar';
$user = 'root';
$pass = '';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json'); // Establecer el tipo de contenido como JSON

try {
    $conn = new PDO("mysql:host=$host;dbname=$db;charset=utf8", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $conn->prepare("SELECT secuencia FROM patrones_musicales2");
    $stmt->execute();

    $patronesMusicales = $stmt->fetchAll(PDO::FETCH_COLUMN);

    if (empty($patronesMusicales)) {
        http_response_code(404);
        echo json_encode(["error" => "No hay patrones musicales disponibles."]);
    } else {
        echo json_encode(["patronesMusicales" => $patronesMusicales]);
    }
} catch (PDOException $e) {
    http_response_code(500); // Error interno del servidor
    echo json_encode(["error" => "Error al conectarse a la base de datos."]);
}
?>
