<?php
include('../conexion/conexion.php');
include('persona.php');

class Registrar extends Persona {
    private $sqlInsert;

    public function registro() {
        $conexion = new Conexion();

        // Query para insertar los datos en la base de datos
        $this->sqlInsert = "INSERT INTO persona_registro (nombre, email, contrasena) 
                            VALUES (:nombre, :email, :password)";

        // Asignando los valores que se usarán en la consulta
        $valores = [
            ':nombre'   => $this->getNombrePersona(),
            ':email'    => $this->getEmailPersona(),
            ':password' => $this->getPasswordPersona(), // Ahora guarda la contraseña sin cifrar
        ];

        // Ejecutar la consulta con los valores proporcionados
        $conexion->ejecutar($this->sqlInsert, $valores);
    }
}
?>