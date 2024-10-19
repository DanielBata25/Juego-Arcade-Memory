<<<<<<< HEAD
=======
<?php
error_reporting(E_ALL);
ini_set('display_errors', 1); // Mostrar errores en la salida

$archivo = 'datos.json'; // Ruta al archivo JSON

if (!file_exists($archivo)) {
    echo json_encode(["error" => "Archivo JSON no encontrado."]);
    exit;
}

$jsonActual = file_get_contents($archivo);
$datosJuego = json_decode($jsonActual, true);

if ($datosJuego === null) {
    echo json_encode(["error" => "Error al decodificar JSON."]);
    exit;
}

// Obtener los datos enviados por el cliente
$nuevosDatos = json_decode(file_get_contents("php://input"), true);

if ($nuevosDatos === null) {
    echo json_encode(["error" => "Datos recibidos no son JSON válido."]);
    exit;
}

// Actualizar las teclas presionadas y la puntuación
$datosJuego['teclas_presionadas'] = $nuevosDatos['teclasPresionadas'];
$datosJuego['puntuacion']['correctas'] += $nuevosDatos['puntuacion']['correctas'];
$datosJuego['puntuacion']['incorrectas'] += $nuevosDatos['puntuacion']['incorrectas'];

// Guardar los cambios en el JSON
if (file_put_contents($archivo, json_encode($datosJuego, JSON_PRETTY_PRINT))) {
    echo json_encode(["mensaje" => "Datos guardados correctamente"]);
} else {
    echo json_encode(["error" => "No se pudo guardar el archivo JSON."]);
}
?>
>>>>>>> 0786092ecb0e2b985d21c8942438b4ba25852ffc
