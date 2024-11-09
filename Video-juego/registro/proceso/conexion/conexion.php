<?php
class Conexion {
    private $pdo;

    public function __construct() {
        $host = 'localhost';
        $dbname = 'jugar';
        $user = 'root';
        $password = '';

        $dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

        try {
            $this->pdo = new PDO($dsn, $user, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            echo "Error en la conexión: " . $e->getMessage();
        }
    }

    // Método para obtener el objeto PDO
    public function getPdo() {
        return $this->pdo;
    }

    public function ejecutar($sql, $valores) {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($valores);
    }
}
?>
