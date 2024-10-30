<!DOCTYPE html>
<html lang="zxx">

<head>
  <meta charset="UTF-8">
  <meta name="description" content="Anime Template">
  <meta name="keywords" content="Anime, unica, creative, html">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Inicio Sesion</title>

  <link rel="stylesheet" href="../bootstrap-5.1.3-dist/css/bootstrap.css">
  <script src="../bootstrap-5.1.3-dist/js/bootstrap.js"></script>
  <link rel="stylesheet" href="../bootstrap-5.1.3-dist/css/">
  <link rel="stylesheet" href="../css/color.css">
  <link rel="stylesheet" href="../css/fondo_estrellado.css">


  <link href='../https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>


</head>

<body>

  <div>
    <div class="space space-1"></div>
    <div class="space space-2"></div>
    <div class="space space-3"></div>
  </div>

  <br>
  <img src="../img/musica.png" class="tamañosoni" id="playPauseBTN" onclick="playPause()">
  <div class="lola">
    <img src="../img/image2.png" height="200" width="200" alt="">
  </div>
  <div>
  
    <!--MUSICA-->
    <br>
    <audio id="audio">
      <source src="../audio/Headlands _musica.mp3" type="audio/mpeg">
    </audio>
    <!--END MUSICA-->
  
  
    <div class="container text-center ">

    <form action="validar.php" method="POST">
        <label for="email">Correo:</label><br>
        <input type="email" id="email" name="email" required><br><br>

        <label for="password">Contraseña:</label><br>
        <input type="password" id="contrasena" name="contrasena" required><br><br>

        <input type="submit" value="Ingresar">
    </form>
    <!-- Js Plugins -->


</body>
<script src="../bootstrap-5.1.3-dist/js/bootstrap.js"></script>
<script src="../js/sonido.js"></script>
<script src="../js/fondo_estrellado.js"></script>

</html>