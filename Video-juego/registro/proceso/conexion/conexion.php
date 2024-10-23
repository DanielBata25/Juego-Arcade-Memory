<?php

    class Conexion{
        private $servidor;
        private $usuario;
        private $password;
        private $puerto;
        private $baseDatos;

        public function __construct(){
            $this->servidor="localhost";
            $this->usuario="postgres";
            $this->password="bata12345";
            $this->puerto="5432";
            $this->baseDatos="arcade_memory";
        }

        public function conectar(){
            try {
                $dsn = "pgsql:host=$this->servidor;port=$this->puerto;dbname=$this->baseDatos";
                $pdo = new PDO($dsn, $this->usuario, $this->password, [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Mostrar errores
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC // Establecer el modo de fetch a asociativo
                ]);
            
                echo "Conexión exitosa a PostgreSQL";
            
            } catch (PDOException $e) {
                echo 'Error en la conexión: ' . $e->getMessage();
            }
            return $pdo;
        }

        public function ejecutar($sql, $valores){
            $pdo=$this->conectar();
            // Preparar la consulta
            $stmt = $pdo->prepare($sql);
            // Ejecutar la consulta con los valores directamente en execute()
            $stmt->execute($valores);
        }

    }


?>