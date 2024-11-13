<?php
include('../conexion/conexion.php');
include('persona.php');

class Registrar extends Persona {
    private $conexion;
    private $sqlInsert;

    public function __construct() {
        $this->conexion = new Conexion(); // Inicializa la conexión a la base de datos
    }

    public function registro() {
        // Consulta de inserción
        $this->sqlInsert = "INSERT INTO persona_registro (nombre, email, contrasena) 
                            VALUES (:nombre, :email, :password)";

        $valores = [
            ':nombre'   => $this->getNombrePersona(),
            ':email'    => $this->getEmailPersona(),
            ':password' => $this->getPasswordPersona(), // Guardar sin encriptación
        ];

        // Ejecutar la consulta
        $stmt = $this->conexion->getPdo()->prepare($this->sqlInsert);
        return $stmt->execute($valores); // Retorna true si se ejecutó correctamente, false si no
    }

    public function verificarEmail($email) {
        $sql = "SELECT COUNT(*) FROM persona_registro WHERE email = :email";
        $stmt = $this->conexion->getPdo()->prepare($sql);
        $stmt->execute(['email' => $email]);
        $count = $stmt->fetchColumn();

        return $count > 0;
    }
}
?>
