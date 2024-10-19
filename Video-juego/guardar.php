<?php
$data = json_decode(file_get_contents('php://input'), true);

// Ruta del archivo JSON
$jsonFilePath = 'datos.json';

// Leer el contenido actual del archivo JSON
$jsonData = json_decode(file_get_contents($jsonFilePath), true);

// Agregar el nuevo resultado
$jsonData['resultados'][] = [
    'patron' => $data['patron'],
    'teclasPresionadas' => $data['teclasPresionadas'],
    'resultado' => $data['resultado'],
    'puntuacion' => $data['puntuacion']  // Agregar la puntuación
];

// Guardar de nuevo el archivo JSON
file_put_contents($jsonFilePath, json_encode($jsonData, JSON_PRETTY_PRINT));

// Responder con un mensaje
echo json_encode(['mensaje' => 'Resultados guardados correctamente.']);
?>