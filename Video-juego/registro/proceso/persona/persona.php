<?php
class Persona {
    private $nombrePersona;
    private $emailPersona;
    private $passwordPersona;

    public function setNombrePersona($nombrePersona) {
        $this->nombrePersona = $nombrePersona;
    }

    public function getNombrePersona() {
        return $this->nombrePersona;
    }

    public function setEmailPersona($emailPersona) {
        $this->emailPersona = $emailPersona;
    }

    public function getEmailPersona() {
        return $this->emailPersona;
    }

    public function setPasswordPersona($passwordPersona) {
        // Almacenando la contraseña sin cifrar (solo para pruebas)
        $this->passwordPersona = $passwordPersona;
    }

    public function getPasswordPersona() {
        return $this->passwordPersona;
    }
}
?>