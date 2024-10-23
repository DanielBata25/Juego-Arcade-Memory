<?php
    include('../conexion.conexion.php');
    include('persona.php')

    class Registar extends Persona{
        public function registro(){
            $conexion=new Conexion();
            $this->sqInsert="INSERT INTO public.persona(nombre_persona, email_persona)
                             VALUES (:nombre, :email);";
            $valores=[
                ':nombre' => $this->getNombrePersona
                ':email' => $this->getEmailPersona
            ];

            $conexion->ejecutar($this->sqlInsert, $valores);
            return $this->sqlInsert;

        }
    }

?>