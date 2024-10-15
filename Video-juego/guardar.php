<?php
header('Content-Type: application/json');

// Leer la entrada JSON
$data = json_decode(file_get_contents('php://input'), true);

// Verificar que se recibieron los datos necesarios
if (isset($data['patronMusical']) && isset($data['teclasPresionadas'])) {
    $filePath = './datos.json';

    // Leer el contenido actual del archivo JSON
    if (file_exists($filePath)) {
        $currentData = json_decode(file_get_contents($filePath), true);
    } else {
        $currentData = [];
    }

    // Actualizar los datos
    $currentData['patronMusical'] = $data['patronMusical'];
    $currentData['teclasPresionadas'] = array_values(array_unique($data['teclasPresionadas'])); // Asegurando que las teclas sean únicas

    // Guardar los datos en el archivo JSON
    file_put_contents($filePath, json_encode($currentData, JSON_PRETTY_PRINT));

    echo json_encode(['status' => 'success', 'message' => 'Datos guardados correctamente.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Datos no válidos.']);
}
?>
