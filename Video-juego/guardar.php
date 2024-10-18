<?php

$archivo = 'resultados.json';


$contenido = file_get_contents('php://input');
$data = json_decode($contenido, true);

if ($data) {

    $resultados = file_exists($archivo) 
        ? json_decode(file_get_contents($archivo), true) 
        : [];

    
    $resultados[] = $data;


    file_put_contents($archivo, json_encode($resultados, JSON_PRETTY_PRINT));

   
    echo json_encode(['mensaje' => 'Datos guardados con éxito']);
} else {
    
    echo json_encode(['error' => 'No se recibieron datos válidos']);
}
?>