<?php

// Definir los mensajes motivadores
$mensajesMotivadores = [
    ["mensaje" => "¡Vamoss!"],
    ["mensaje" => "Cree en ti mismo"],
    ["mensaje" => "¡Tu puedes!"],
    ["mensaje" => "Sigue adelante!"],
    ["mensaje" => "Eres increíble!"]
];

// Devolver los mensajes en formato JSON
header(header: 'Content-Type: application/json');
echo json_encode(value: $mensajesMotivadores);
?>