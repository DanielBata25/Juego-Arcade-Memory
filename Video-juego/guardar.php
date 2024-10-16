<?php
// Archivo donde se guardarán los resultados
$archivo = 'resultados.json';

// Obtener los datos recibidos desde JavaScript
$contenido = file_get_contents('php://input');
$data = json_decode($contenido, true);

if ($data) {
    // Si el archivo ya existe, cargar su contenido
    $resultados = file_exists($archivo) 
        ? json_decode(file_get_contents($archivo), true) 
        : [];

    // Añadir el nuevo registro al array de resultados
    $resultados[] = $data;

    // Guardar el array actualizado en el archivo JSON
    file_put_contents($archivo, json_encode($resultados, JSON_PRETTY_PRINT));

    // Responder con éxito al cliente
    echo json_encode(['mensaje' => 'Datos guardados con éxito']);
} else {
    // Enviar error si no se recibieron datos válidos
    echo json_encode(['error' => 'No se recibieron datos válidos']);
}
?>