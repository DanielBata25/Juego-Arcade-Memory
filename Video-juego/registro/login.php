<!DOCTYPE html>
<html lang="zxx">

<head>
  <meta charset="UTF-8">
  <meta name="description" content="Anime Template">
  <meta name="keywords" content="Anime, unica, creative, html">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Inicio Sesión</title>

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="../bootstrap-5.1.3-dist/css/bootstrap.css">

  <!-- SweetAlert -->
  <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>

  <!-- Custom CSS -->
  <link rel="stylesheet" href="../css/registro.css">
  <link rel="stylesheet" href="../css/styles.css">

  <!-- Boxicons -->
  <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet">
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

  <div class="lola">
    <img src="../img/image2.png" height="180" width="180" alt="">
  </div>

  <div>
    <!-- Música -->
    <br>
    <audio id="audio">
      <source src="../audio/Headlands _musica.mp3" type="audio/mpeg">
    </audio>
    <!-- Fin Música -->

    <div class="container text-center">
      <!-- Formulario de Inicio de Sesión -->
      <form id="formulario-login">
        <label for="email">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="password">Contraseña:</label>
        <input type="password" id="contrasena" name="contrasena" required><br><br>

        <input type="submit" value="Ingresar">
      </form>
    </div>
  </div>

  <!-- Scripts -->
  <script src="../bootstrap-5.1.3-dist/js/bootstrap.js"></script>
  <script src="../js/sonido.js"></script>
  <script src="../js/fondo_estrellado.js"></script>
  <script src="inicioSesion.js"></script>
</body>

</html>
