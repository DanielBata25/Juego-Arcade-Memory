<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Registro</title>

  <link rel="stylesheet" href="../bootstrap-5.1.3-dist/css/bootstrap.css">
  <script src="../bootstrap-5.1.3-dist/js/bootstrap.js"></script>
  <script src="https://unpkg.com/sweetalert/dist/sweetalert.min.js"></script>

  <link rel="stylesheet" href="../css/registro.css">
  <link rel="stylesheet" href="../css/styles.css">
  <link rel="stylesheet" href="registro.css">
  <link href='../https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
</head>
<body>
  <div>
    <div class="space space-1"></div>
    <div class="space space-2"></div>
    <div class="space space-3"></div>
  </div>

  <div class="container-2">
    <div class="volume-control mt-4">
      <img src="../img/normal.png" class="tamañosoni" id="playPauseBTN" onclick="playPause()">
      <div class="volu">
        <label for="volume">Volumen:</label>
      </div>
      <input type="range" id="volume" min="0" max="1" step="0.1" value="0.5">
    </div>
  </div>
  
   <!--MUSICA-->
   <audio id="audio">
    <source src="../audio/Headlands_musica.mp3" type="audio/mpeg">
  </audio>
  <!--END MUSICA-->
     
  
    <div class="container"> 
      <form id="registroForm" method="post">
        <label for="nombre" class="letraa">Nombre:</label>
        <input type="text" name="nombre" id="nombre" required>
        <br>
        <label for="email" class="letraa">Correo Electrónico:</label>
        <input type="email" name="email" id="email" required>
        <br>
        <label for="contrasena" class="letraa">Contraseña:</label>
        <input type="password" name="contrasena" id="contrasena" required>
        <br>
        <input type="submit" class="letraa" value="Registrar">
      </form>
      <p class="color letraa">¿Ya tienes una cuenta? <a href="login.php" class="letraa">Inicia sesión</a></p>
   

 
    <span style="--i: 0;"></span>
    <span style="--i: 1;"></span>
    <span style="--i: 2;"></span>
    <span style="--i: 3;"></span>
    <span style="--i: 4;"></span>
    <span style="--i: 5;"></span>
    <span style="--i: 6;"></span>
    <span style="--i: 7;"></span>
    <span style="--i: 8;"></span>
    <span style="--i: 9;"></span>
    <span style="--i: 10;"></span>
    <span style="--i: 11;"></span>
    <span style="--i: 12;"></span>
    <span style="--i: 13;"></span>
    <span style="--i: 14;"></span>
    <span style="--i: 15;"></span>
    <span style="--i: 16;"></span>
    <span style="--i: 17;"></span>
    <span style="--i: 18;"></span>
    <span style="--i: 19;"></span>
    <span style="--i: 20;"></span>
    <span style="--i: 21;"></span>
    <span style="--i: 22;"></span>
    <span style="--i: 23;"></span>
    <span style="--i: 24;"></span>
    <span style="--i: 25;"></span>
    <span style="--i: 26;"></span>
    <span style="--i: 27;"></span>
    <span style="--i: 28;"></span>
    <span style="--i: 29;"></span>
    <span style="--i: 30;"></span>
    <span style="--i: 31;"></span>
    <span style="--i: 32;"></span>
    <span style="--i: 33;"></span>
    <span style="--i: 34;"></span>
    <span style="--i: 35;"></span>
    <span style="--i: 36;"></span>
    <span style="--i: 37;"></span>
    <span style="--i: 38;"></span>
    <span style="--i: 39;"></span>
    <span style="--i: 40;"></span>
    <span style="--i: 41;"></span>
    <span style="--i: 42;"></span>
    <span style="--i: 43;"></span>
    <span style="--i: 44;"></span>
    <span style="--i: 45;"></span>
    <span style="--i: 46;"></span>
    <span style="--i: 47;"></span>
    <span style="--i: 48;"></span>
    <span style="--i: 49;"></span>

  </body>
  <script src="../bootstrap-5.1.3-dist/js/bootstrap.js"></script>
  <script src="../sonidoInicio.js"></script>
  <script src="../js/fondo_estrellado.js"></script>
  <script src="registro.js"></script> <!-- Vincular archivo -->

</html>
