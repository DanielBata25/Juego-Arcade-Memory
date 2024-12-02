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

<audio id="audio" src="../audio/Headlands _musica.mp3" loop></audio>
<img id="muteBTN" src="../img/normal.png" class="tamañosoni" alt="Mute" onclick="toggleMute()" />

<div class="volu">
  <label for="volume">Volumen:</label>
</div>
<input type="range" id="volume" min="0" max="1" step="0.1" value="0.5" class="bar-volumen">
</div>

   <!--MUSICA-->
   <audio id="audio" autoplay>
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
   
  </body>
  <script src="../bootstrap-5.1.3-dist/js/bootstrap.js"></script>
  <script src="../js/sonido.js"></script>
  <script src="../js/fondo_estrellado.js"></script>
  <script src="registro.js"></script> <!-- Vincular archivo -->
  <script src="inicioSesion.js"></script>

</html>
