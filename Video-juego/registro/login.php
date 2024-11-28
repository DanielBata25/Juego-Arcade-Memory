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
    <br>
    <audio id="audio">
      <source src="../audio/Headlands _musica.mp3" type="audio/mpeg">
    </audio>
    <!--END MUSICA-->
  
  
    <div class="container text-center ">

    <form action="validar.php" method="POST">
    
    <label for="email" class="letraa">Correo Electrónico:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="password" class="letraa">Contraseña:</label>
        <input type="password" id="contrasena" name="contrasena" required><br><br>

        <input type="submit" class="letraa" value="Ingresar">
    </form>
    <!-- Js Plugins -->

    <span2 class="carga" style="--i: 0;"></span2>
    <span2 class="carga" style="--i: 1;"></span2>
    <span2 class="carga" style="--i: 2;"></span2>
    <span2 class="carga" style="--i: 3;"></span2>
    <span2 class="carga" style="--i: 4;"></span2>
    <span2 class="carga" style="--i: 5;"></span2>
    <span2 class="carga" style="--i: 6;"></span2>
    <span2 class="carga" style="--i: 7;"></span2>
    <span2 class="carga" style="--i: 8;"></span2>
    <span2 class="carga" style="--i: 9;"></span2>
    <span2 class="carga" style="--i: 10;"></span2>
    <span2 class="carga" style="--i: 11;"></span2>
    <span2 class="carga" style="--i: 12;"></span2>
    <span2 class="carga" style="--i: 13;"></span2>
    <span2 class="carga" style="--i: 14;"></span2>
    <span2 class="carga" style="--i: 15;"></span2>
    <span2 class="carga" style="--i: 16;"></span2>
    <span2 class="carga" style="--i: 17;"></span2>
    <span2 class="carga" style="--i: 18;"></span2>
    <span2 class="carga" style="--i: 19;"></span2>
    <span2 class="carga" style="--i: 20;"></span2>
    <span2 class="carga" style="--i: 21;"></span2>
    <span2 class="carga" style="--i: 22;"></span2>
    <span2 class="carga" style="--i: 23;"></span2>
    <span2 class="carga" style="--i: 24;"></span2>
    <span2 class="carga" style="--i: 25;"></span2>
    <span2 class="carga" style="--i: 26;"></span2>
    <span2 class="carga" style="--i: 27;"></span2>
    <span2 class="carga" style="--i: 28;"></span2>
    <span2 class="carga" style="--i: 29;"></span2>
    <span2 class="carga" style="--i: 30;"></span2>
    <span2 class="carga" style="--i: 31;"></span2>
    <span2 class="carga" style="--i: 32;"></span2>
    <span2 class="carga" style="--i: 33;"></span2>
    <span2 class="carga" style="--i: 34;"></span2>
    <span2 class="carga" style="--i: 35;"></span2>
    <span2 class="carga" style="--i: 36;"></span2>
    <span2 class="carga" style="--i: 37;"></span2>
    <span2 class="carga" style="--i: 38;"></span2>
    <span2 class="carga" style="--i: 39;"></span2>
    <span2 class="carga" style="--i: 40;"></span2>
    <span2 class="carga" style="--i: 41;"></span2>
    <span2 class="carga" style="--i: 42;"></span2>
    <span2 class="carga" style="--i: 43;"></span2>
    <span2 class="carga" style="--i: 44;"></span2>
    <span2 class="carga" style="--i: 45;"></span2>
    <span2 class="carga" style="--i: 46;"></span2>
    <span2 class="carga" style="--i: 47;"></span2>
    <span2 class="carga" style="--i: 48;"></span2>
    <span2 class="carga"  style="--i: 49;"></span2>


</body>
<script src="../bootstrap-5.1.3-dist/js/bootstrap.js"></script>
<script src="../js/sonido.js"></script>
<script src="../js/fondo_estrellado.js"></script>
<script src="inicoSesion.js"></script>

</html>
