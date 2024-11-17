-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 17-11-2024 a las 09:14:08
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `jugar`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `adivinar_palabras1`
--

CREATE TABLE `adivinar_palabras1` (
  `id` int(11) NOT NULL,
  `palabra` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `configuracion`
--

CREATE TABLE `configuracion` (
  `id` int(11) NOT NULL,
  `dificultadId` int(11) NOT NULL,
  `rondas` bigint(20) NOT NULL,
  `maximoJugadores` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `dificultad`
--

CREATE TABLE `dificultad` (
  `id` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `iconosperfil`
--

CREATE TABLE `iconosperfil` (
  `iconID` int(11) NOT NULL,
  `iconoNombre` varchar(50) DEFAULT NULL,
  `iconoArchivo` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `iconosperfil`
--

INSERT INTO `iconosperfil` (`iconID`, `iconoNombre`, `iconoArchivo`) VALUES
(1, 'Icono1', 'avatarpelirojo.png'),
(2, 'Icono2', 'avatarraper.png'),
(5, 'Icono3', 'avatarmujer.png');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `juego`
--

CREATE TABLE `juego` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `niveles`
--

CREATE TABLE `niveles` (
  `id` int(11) NOT NULL,
  `juegoId` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `numero` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `participacion`
--

CREATE TABLE `participacion` (
  `id` int(11) NOT NULL,
  `salaId` int(11) NOT NULL,
  `jugadorId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patrones_musicales`
--

CREATE TABLE `patrones_musicales` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `secuencia` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patrones_musicales`
--

INSERT INTO `patrones_musicales` (`id`, `nombre`, `secuencia`) VALUES
(1, 'Patrón 1', 'wsedeswa'),
(2, 'Patrón 2', 'wsedeswawsed'),
(3, 'Patrón 3', 'wsedeswawsedtgedtgkjd'),
(4, 'Patron 4', 'wsedeswawsedtgedtgkjdjkjdgju');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `patrones_musicales2`
--

CREATE TABLE `patrones_musicales2` (
  `id` int(11) NOT NULL,
  `nombre` varchar(250) NOT NULL,
  `secuencia` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `patrones_musicales2`
--

INSERT INTO `patrones_musicales2` (`id`, `nombre`, `secuencia`) VALUES
(1, 'Patorn 1', 'aagghhgff'),
(2, 'Patorn 2', 'aagghhgffddssa'),
(3, 'Patorn 3', 'aagghhgffddssaggffdd'),
(4, 'Patorn 4', 'aagghhgffddssaggffddssa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `persona_registro`
--

CREATE TABLE `persona_registro` (
  `idUsuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasena` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `profileIconID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `persona_registro`
--

INSERT INTO `persona_registro` (`idUsuario`, `nombre`, `email`, `contrasena`, `created_at`, `profileIconID`) VALUES
(29, 'Francisco', 'juan@gmail.com', '543w21', '2024-10-31 15:53:39', NULL),
(32, 'bata', 'dfbh2006@gmail.com', '12345', '2024-11-01 11:26:27', NULL),
(33, 'bataron', 'bataron@gmail.com', '12345', '2024-11-01 12:03:09', NULL),
(36, 'melanie', 'melanie@gmail.com', '12345', '2024-11-02 04:06:49', NULL),
(39, 'lola', 'lola@gmail.com', '12345', '2024-11-09 15:14:07', NULL),
(41, 'kiko', 'kiko@gmail.com', '12345', '2024-11-09 21:13:22', NULL),
(42, 'choco', 'choco@gmail.com', '12345', '2024-11-09 22:26:43', NULL),
(43, 'amorio', 'amor@gmail.com', '12345', '2024-11-10 02:29:18', NULL),
(45, 'bata', '12345@gmail.com', '12345', '2024-11-10 04:15:49', NULL),
(46, 'bata', '54321@gmail.com', '12345', '2024-11-10 04:17:54', NULL),
(47, 'javier', 'javier@gmail.com', '12345', '2024-11-10 04:19:06', NULL),
(48, 'javier', 'mario@gmail.com', '123456', '2024-11-10 04:19:16', NULL),
(49, 'wer', 'wer@gmail.com', '12345', '2024-11-10 04:20:03', NULL),
(50, 'war', 'war@gmail.com', '12345', '2024-11-10 04:21:30', NULL),
(51, '', '', '', '2024-11-10 04:24:48', NULL),
(52, 'mia', 'mia@gmail.com', '$2y$10$78ciIh0s9r.prnDJ64xZDeg9z4pR/V8vq0TNHdoM0u/M0r.ppk5VS', '2024-11-10 06:55:05', NULL),
(53, 'lia', 'lia@gmail.com', '$2y$10$tjK/JnEgwXvI00H3UHOswuMooOHOkQRrnwLrzHpIq/GvqxUykbtZq', '2024-11-10 06:58:28', NULL),
(54, 'luna', 'luna@gmail.com', '$2y$10$z3clcCaz0x8rEqvK5JUNL.beHm.C6rZiFNrVd2yMC6jqVqlkmV8yG', '2024-11-10 07:31:53', NULL),
(55, 'luna', 'l@gmail.com', '$2y$10$FecyYtce5MjKn5.XuixkXe7UJCwn6EXQdaZHuvLIoWx1DMGViRQxu', '2024-11-10 07:33:24', NULL),
(56, 'bata', 'bata@gmail.com', '$2y$10$IjYqcO8dStDDiKNkcE6Z7eAzWyCNIfBG4g7eJ.mQuJOmhf1DwvVF2', '2024-11-10 07:39:10', NULL),
(57, 'frank', 'frank@gmail.com', '12345', '2024-11-17 07:36:33', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `podiofinalsala`
--

CREATE TABLE `podiofinalsala` (
  `id` int(11) NOT NULL,
  `salaId` int(11) NOT NULL,
  `jugadorId` int(11) NOT NULL,
  `posicionFinal` smallint(6) NOT NULL,
  `puntosFInal` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `podioronda`
--

CREATE TABLE `podioronda` (
  `id` int(11) NOT NULL,
  `rondaSalaId` int(11) NOT NULL,
  `jugadorid` int(11) NOT NULL,
  `posicion` smallint(6) NOT NULL,
  `puntosObtenidos` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `procesonivel`
--

CREATE TABLE `procesonivel` (
  `id` int(11) NOT NULL,
  `nivelId` int(11) NOT NULL,
  `jugadorId` int(11) NOT NULL,
  `estadoNivel` tinyint(1) NOT NULL,
  `fechaJugada` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `puntacion` bigint(20) NOT NULL,
  `tiempo` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rondasala`
--

CREATE TABLE `rondasala` (
  `id` int(11) NOT NULL,
  `salaId` int(11) NOT NULL,
  `rondaNumero` bigint(20) NOT NULL,
  `fechaIncio` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `fechaFin` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sala`
--

CREATE TABLE `sala` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `codigo` int(11) NOT NULL,
  `configuracionId` int(11) NOT NULL,
  `fechaCreacion` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `estadoSala` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `adivinar_palabras1`
--
ALTER TABLE `adivinar_palabras1`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `dificultadId` (`dificultadId`);

--
-- Indices de la tabla `dificultad`
--
ALTER TABLE `dificultad`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `iconosperfil`
--
ALTER TABLE `iconosperfil`
  ADD PRIMARY KEY (`iconID`);

--
-- Indices de la tabla `juego`
--
ALTER TABLE `juego`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `niveles`
--
ALTER TABLE `niveles`
  ADD PRIMARY KEY (`id`),
  ADD KEY `juegoId` (`juegoId`);

--
-- Indices de la tabla `participacion`
--
ALTER TABLE `participacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salaId` (`salaId`),
  ADD KEY `jugadorId` (`jugadorId`);

--
-- Indices de la tabla `patrones_musicales`
--
ALTER TABLE `patrones_musicales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `patrones_musicales2`
--
ALTER TABLE `patrones_musicales2`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `persona_registro`
--
ALTER TABLE `persona_registro`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_icono` (`profileIconID`);

--
-- Indices de la tabla `podiofinalsala`
--
ALTER TABLE `podiofinalsala`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salaId` (`salaId`),
  ADD KEY `jugadorId` (`jugadorId`);

--
-- Indices de la tabla `podioronda`
--
ALTER TABLE `podioronda`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rondaSalaId` (`rondaSalaId`),
  ADD KEY `jugadorId` (`jugadorid`);

--
-- Indices de la tabla `procesonivel`
--
ALTER TABLE `procesonivel`
  ADD PRIMARY KEY (`id`),
  ADD KEY `nivelId` (`nivelId`),
  ADD KEY `jugadorId` (`jugadorId`);

--
-- Indices de la tabla `rondasala`
--
ALTER TABLE `rondasala`
  ADD PRIMARY KEY (`id`),
  ADD KEY `salaId` (`salaId`);

--
-- Indices de la tabla `sala`
--
ALTER TABLE `sala`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `codigo` (`codigo`),
  ADD KEY `configuracionId` (`configuracionId`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `adivinar_palabras1`
--
ALTER TABLE `adivinar_palabras1`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `configuracion`
--
ALTER TABLE `configuracion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `dificultad`
--
ALTER TABLE `dificultad`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `iconosperfil`
--
ALTER TABLE `iconosperfil`
  MODIFY `iconID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `juego`
--
ALTER TABLE `juego`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `niveles`
--
ALTER TABLE `niveles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `participacion`
--
ALTER TABLE `participacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `patrones_musicales`
--
ALTER TABLE `patrones_musicales`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `patrones_musicales2`
--
ALTER TABLE `patrones_musicales2`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `persona_registro`
--
ALTER TABLE `persona_registro`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT de la tabla `podiofinalsala`
--
ALTER TABLE `podiofinalsala`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `podioronda`
--
ALTER TABLE `podioronda`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `procesonivel`
--
ALTER TABLE `procesonivel`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `rondasala`
--
ALTER TABLE `rondasala`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `sala`
--
ALTER TABLE `sala`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `configuracion`
--
ALTER TABLE `configuracion`
  ADD CONSTRAINT `configuracion_ibfk_1` FOREIGN KEY (`dificultadId`) REFERENCES `dificultad` (`id`);

--
-- Filtros para la tabla `niveles`
--
ALTER TABLE `niveles`
  ADD CONSTRAINT `niveles_ibfk_1` FOREIGN KEY (`juegoId`) REFERENCES `juego` (`id`);

--
-- Filtros para la tabla `participacion`
--
ALTER TABLE `participacion`
  ADD CONSTRAINT `participacion_ibfk_1` FOREIGN KEY (`salaId`) REFERENCES `sala` (`id`),
  ADD CONSTRAINT `participacion_ibfk_2` FOREIGN KEY (`jugadorId`) REFERENCES `persona_registro` (`idUsuario`);

--
-- Filtros para la tabla `persona_registro`
--
ALTER TABLE `persona_registro`
  ADD CONSTRAINT `fk_icono` FOREIGN KEY (`profileIconID`) REFERENCES `iconosperfil` (`iconID`);

--
-- Filtros para la tabla `podiofinalsala`
--
ALTER TABLE `podiofinalsala`
  ADD CONSTRAINT `podiofinalsala_ibfk_1` FOREIGN KEY (`salaId`) REFERENCES `sala` (`id`),
  ADD CONSTRAINT `podiofinalsala_ibfk_2` FOREIGN KEY (`jugadorId`) REFERENCES `persona_registro` (`idUsuario`);

--
-- Filtros para la tabla `podioronda`
--
ALTER TABLE `podioronda`
  ADD CONSTRAINT `podioronda_ibfk_1` FOREIGN KEY (`rondaSalaId`) REFERENCES `rondasala` (`id`),
  ADD CONSTRAINT `podioronda_ibfk_2` FOREIGN KEY (`jugadorid`) REFERENCES `persona_registro` (`idUsuario`);

--
-- Filtros para la tabla `procesonivel`
--
ALTER TABLE `procesonivel`
  ADD CONSTRAINT `procesonivel_ibfk_1` FOREIGN KEY (`nivelId`) REFERENCES `niveles` (`id`),
  ADD CONSTRAINT `procesonivel_ibfk_2` FOREIGN KEY (`jugadorId`) REFERENCES `persona_registro` (`idUsuario`);

--
-- Filtros para la tabla `rondasala`
--
ALTER TABLE `rondasala`
  ADD CONSTRAINT `rondasala_ibfk_1` FOREIGN KEY (`salaId`) REFERENCES `sala` (`id`);

--
-- Filtros para la tabla `sala`
--
ALTER TABLE `sala`
  ADD CONSTRAINT `sala_ibfk_1` FOREIGN KEY (`configuracionId`) REFERENCES `configuracion` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
