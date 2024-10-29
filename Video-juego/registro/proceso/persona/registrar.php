<?php
include('../conexion/conexion.php');
include('persona.php');

class Registrar extends Persona {
    private $sqlInsert;

    public function registro() {
        $conexion = new Conexion();
        $this->sqlInsert = "INSERT INTO persona_registro (nombre, email, contrasena) 
                            VALUES (:nombre, :email, :password)";
        $valores = [
            ':nombre'   => $this->getNombrePersona(),
            ':email'    => $this->getEmailPersona(),
            ':password' => $this->getPasswordPersona(),
        ];

        $conexion->ejecutar($this->sqlInsert, $valores);
    }
}
?>