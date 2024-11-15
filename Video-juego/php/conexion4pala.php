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

    // Obtener las palabras del cuerpo de la solicitud
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['palabras']) && is_array($data['palabras'])) {
        // Preparar la consulta de inserción
        $stmt = $conn->prepare("INSERT INTO palabras (palabra) VALUES (:palabra)");

        // Insertar cada palabra
        foreach ($data['palabras'] as $palabra) {
            $stmt->bindParam(':palabra', $palabra);
            $stmt->execute();
        }

        // Devolver una respuesta exitosa
        echo json_encode(["status" => "Palabras insertadas correctamente."]);
    } else {
        echo json_encode(["error" => "No se recibieron palabras válidas."]);
    }

} catch (PDOException $e) {
    // Mensaje de error en caso de fallo en la conexión o consulta
    echo json_encode(["error" => "Error de conexión: " . $e->getMessage()]);
}
?>
