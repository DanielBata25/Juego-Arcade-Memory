<?php

$host = 'localhost';
$db = 'jugar';
$user = 'root';
$pass = '';

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

try {
   
    $conn = new PDO("mysql:host=$host;dbname=$db", $user, $pass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

   
    $stmt = $conn->prepare("SELECT secuencia FROM patrones_musicales");
    $stmt->execute();

  
    $patronesMusicales = $stmt->fetchAll(PDO::FETCH_COLUMN);

   
    if (empty($patronesMusicales)) {
        echo json_encode(["error" => "No hay patrones musicales disponibles."]);
    } else {
        // Devolver los patrones en formato JSON
        echo json_encode(["patronesMusicales" => $patronesMusicales]);
    }

} catch (PDOException $e) {
    // Mensaje de error en caso de fallo en la conexión o consulta
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
}
?>