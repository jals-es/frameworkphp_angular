-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2021 a las 16:38:47
-- Versión del servidor: 10.4.17-MariaDB
-- Versión de PHP: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `clase_framework`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cart`
--

CREATE TABLE `cart` (
  `id` int(255) NOT NULL,
  `id_user` varchar(1000) NOT NULL,
  `id_prod` int(255) NOT NULL,
  `cantidad` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `name` varchar(100) COLLATE utf8_spanish_ci NOT NULL,
  `img` varchar(1000) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`name`, `img`) VALUES
('hamburguesa', 'hamburguesa.jpg'),
('pizza', 'pizza.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(255) NOT NULL,
  `id_user` varchar(500) NOT NULL,
  `id_prod` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `favoritos`
--

INSERT INTO `favoritos` (`id`, `id_user`, `id_prod`) VALUES
(3, 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 1),
(4, 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 86),
(8, 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 2),
(9, 'SrznrLJFN7YrXaX4R1sivCKnbc13', 2),
(10, 'SrznrLJFN7YrXaX4R1sivCKnbc13', 5),
(11, 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 4),
(12, 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `locales`
--

CREATE TABLE `locales` (
  `id` int(255) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `lng` decimal(65,38) NOT NULL,
  `lat` decimal(65,38) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `locales`
--

INSERT INTO `locales` (`id`, `name`, `lng`, `lat`) VALUES
(1, 'Ontinyent Llombo', '38.81854067355506000000000000000000000000', '-0.60898446604933510000000000000000000000'),
(2, 'Ontinyent San Rafael', '38.82328660152955000000000000000000000000', '-0.61276171427215400000000000000000000000'),
(3, 'Madrid Plaza Mayor', '40.41555544624162600000000000000000000000', '-3.70670694316415130000000000000000000000'),
(4, 'Salamanca Centro', '40.96945850266127600000000000000000000000', '-5.66182982211762100000000000000000000000'),
(5, 'Albacete San Antonio', '39.00124942315335000000000000000000000000', '-1.85316308021791660000000000000000000000');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders`
--

CREATE TABLE `orders` (
  `id_order` varchar(500) NOT NULL,
  `id_user` varchar(1000) NOT NULL,
  `name` varchar(1000) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `address` varchar(1000) NOT NULL,
  `city` varchar(1000) NOT NULL,
  `country` varchar(1000) NOT NULL,
  `zip` int(255) NOT NULL,
  `estado` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders`
--

INSERT INTO `orders` (`id_order`, `id_user`, `name`, `email`, `address`, `city`, `country`, `zip`, `estado`) VALUES
('3b866b1a247c949d59d2e52da4e524c7e292ae7e6e73ca6b7cfb76656efdde87', 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 'Juan Antonio', 'narzano.nar@gmail.com', 'AV Comte Torrefiel nº 39', 'Ontinyent', 'spain', 46870, 1),
('54bc192a5d531eca75e98117c71e58d8a7589706aa70f4035f064d8f2a2100bf', 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 'Juan Antonio', 'narzano.nar@gmail.com', 'AV Comte Torrefiel nº 39', 'Ontinyent', 'spain', 46870, 1),
('6168d950f45d128397946731c4d3dcb75ed8181acfc7c43930308358d08d3fe6', 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 'pepe domingo castaño', 'narzano.nar@gmail.com', 'AV Comte Torrefiel nº 39', 'Ontinyent', 'añdgjsdñgjsppñjg', 12312, 1),
('7bd04aec0794276465dad57f218e62b84cd10f4d4ac442d0f6e5c27bf10f34cc', 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 'Juan Antonio', 'narzano.nar@gmail.com', 'AV Comte Torrefiel nº 39', 'Ontinyent', 'spain', 46870, 1),
('a630450988a40e01476865f2a75fa03a8bfb61e40e5cd86d5154dffdb2091d76', 'SrznrLJFN7YrXaX4R1sivCKnbc13', 'Juan Antonio', 'narzano.nar@gmail.com', 'AV Comte Torrefiel nº 39', 'Ontinyent', 'España', 46870, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orders_prod`
--

CREATE TABLE `orders_prod` (
  `id` int(255) NOT NULL,
  `id_order` varchar(500) NOT NULL,
  `id_prod` int(255) NOT NULL,
  `precio` decimal(65,2) NOT NULL,
  `cantidad` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `orders_prod`
--

INSERT INTO `orders_prod` (`id`, `id_order`, `id_prod`, `precio`, `cantidad`) VALUES
(1, '3b866b1a247c949d59d2e52da4e524c7e292ae7e6e73ca6b7cfb76656efdde87', 5, '8.00', 1),
(2, '3b866b1a247c949d59d2e52da4e524c7e292ae7e6e73ca6b7cfb76656efdde87', 2, '7.00', 2),
(4, '54bc192a5d531eca75e98117c71e58d8a7589706aa70f4035f064d8f2a2100bf', 3, '9.00', 3),
(5, '54bc192a5d531eca75e98117c71e58d8a7589706aa70f4035f064d8f2a2100bf', 4, '9.00', 1),
(7, '7bd04aec0794276465dad57f218e62b84cd10f4d4ac442d0f6e5c27bf10f34cc', 2, '7.00', 3),
(8, '6168d950f45d128397946731c4d3dcb75ed8181acfc7c43930308358d08d3fe6', 2, '7.00', 2),
(9, 'a630450988a40e01476865f2a75fa03a8bfb61e40e5cd86d5154dffdb2091d76', 2, '7.00', 2),
(10, 'a630450988a40e01476865f2a75fa03a8bfb61e40e5cd86d5154dffdb2091d76', 3, '9.00', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `cod_prod` int(255) NOT NULL,
  `name` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `descripcion` varchar(1000) COLLATE utf8_spanish_ci NOT NULL,
  `type` varchar(50) COLLATE utf8_spanish_ci NOT NULL,
  `ingredientes` varchar(1000) COLLATE utf8_spanish_ci NOT NULL,
  `precio` decimal(65,2) NOT NULL,
  `estado` int(2) NOT NULL,
  `img` varchar(1000) COLLATE utf8_spanish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_spanish_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`cod_prod`, `name`, `descripcion`, `type`, `ingredientes`, `precio`, `estado`, `img`) VALUES
(1, 'FhocekOE5b', 'TrcqfWx3oiAFOwsDdU5vgj0RVQz4p7', 'hamburguesa', 'normal:queso', '2.00', 1, 'hamburguesa2.jpg'),
(2, 'O8xyNzjI3s', 'tk8afpEuv54zFQNIAeRq6m1js9dC7L', 'pizza', 'normal:queso', '7.00', 1, 'pizza2.jpg'),
(3, '3bmYWc98DC', 'V5E7XMthWekwrBF18PCcqRzNyDOdSl', 'hamburguesa', 'normal:queso', '9.00', 1, 'hamburguesa2.jpg'),
(4, 'yMIaN2ps8t', 'RZPGOqc5fBVdKynk4v8I70mtbNHaps', 'pizza', 'normal:queso', '9.00', 1, 'pizza2.jpg'),
(5, 'Z9xHbntdUG', 'bTaVp1tRZ0nzMjSGymxFfdwkDWsqXH', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa2.jpg'),
(6, '2ZOs8Pw9TW', 'vVckesSYuz1KyH8mRFW32rObD5jU9Z', 'pizza', 'normal:queso', '9.00', 1, 'pizza2.jpg'),
(7, 'we26xL89Q5', 'TiYqp1EmhVZjKIHkFbOeCSJ3r5QWPx', 'hamburguesa', 'normal:queso', '2.00', 1, 'hamburguesa2.jpg'),
(8, 'GYpaUmt3Nh', 'WGe9Tv4jzpdfqsLrxVwiDIRBSlyC7n', 'pizza', 'normal:queso', '4.00', 1, 'pizza2.jpg'),
(9, 'mUwpERFZk7', '0AZbcq9hEafStHLWosCGjT2gmvlYVD', 'hamburguesa', 'normal:queso', '5.00', 1, 'hamburguesa.jpg'),
(10, 'yQepxoV6Cd', '8cizjIxNPTKqBEVGgtSAneb2yQ6Lkh', 'pizza', 'normal:queso', '5.00', 1, 'pizza.jpg'),
(11, '6oyh2WbRXI', '5tsMVUkhy4YaDfGvuJOw9Fi2ZSn3Rr', 'hamburguesa', 'normal:queso:sbrava', '2.00', 1, 'hamburguesa2.jpg'),
(12, 'zO6sMWDoPb', 'g8hf5jR7tlDVNISsm9Hxpi0dLcKvQe', 'pizza', 'normal:queso', '0.45', 1, 'pizza2.jpg'),
(13, 'iouP6ebdTW', 'MQmZinDkXTWHu43tsBFS67rPYUcCJa', 'hamburguesa', 'normal:queso', '1.00', 1, 'hamburguesa.jpg'),
(14, 'mlvRGzqVZn', 'Vk0KSqaefOHymUMcrtI185vDB4ulow', 'pizza', 'normal:queso', '10.00', 1, 'pizza2.jpg'),
(15, 'FYvklsxJqt', 'bKM8GLg9Oo3snVpPvJcZu0EhjAtHxw', 'hamburguesa', 'normal:queso', '10.50', 1, 'hamburguesa2.jpg'),
(16, 'c1N5zYpGWQ', 'jMav5pTCw7f2XDePVbk1ROY3yu8lSZ', 'pizza', 'normal:queso', '9.00', 1, 'pizza.jpg'),
(17, 'qboKY6O1gC', 'mjDWiFIP6BcaHT8qCVpgx27GyXlkNS', 'hamburguesa', 'normal:queso', '5.00', 1, 'hamburguesa.jpg'),
(18, 'iNGTmhg8sO', 'grJqpNk6txXKjy4GYeF3UsfDTIoiRl', 'pizza', 'normal:queso', '8.00', 1, 'pizza2.jpg'),
(19, '9Zcjmg5AlU', '49VkEvIC0ALQZWq1d2P7ubFT5KHNOy', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa.jpg'),
(20, 'xpGc3Ik5s2', 'F1294Rhjen0Z5wcVdpWuUrLCqEKyP6', 'pizza', 'normal:queso', '1.00', 1, 'pizza.jpg'),
(21, 'exF8g7LCSA', 'dgxtzI0NRw78umyYiqkHEKGnp4W3or', 'hamburguesa', 'normal:queso', '7.00', 1, 'hamburguesa.jpg'),
(22, 'dlzmQHBCGF', 'j9RbgHGvfKlCWUcDM610iatyzLNZxV', 'pizza', 'normal:queso', '1.00', 1, 'pizza.jpg'),
(23, 'nmcOo9vuyb', 'eq7M3hzBrxjN1HEURPoTfFQvCKAl5I', 'hamburguesa', 'normal:queso', '6.00', 1, 'hamburguesa.jpg'),
(24, '9ASzVbxLHp', 'TfWUZsS37zFXcwdjamLlbMoAQyHD0h', 'pizza', 'normal:queso', '4.00', 1, 'pizza.jpg'),
(25, 'OSPoDEVd7l', 'W79qV5yzsmEZH6jnkRKY1BoCJgaQpv', 'hamburguesa', 'normal:queso', '3.00', 1, 'hamburguesa2.jpg'),
(26, '1UsOmt0JwX', '51Hwx4XTiRhCI7l8VSnqkercuv9Ns0', 'pizza', 'normal:queso', '7.00', 1, 'pizza.jpg'),
(27, '0zgyUf72pS', 'hnyRlT6IvauUxGCgoSseAbzmPNcK3H', 'hamburguesa', 'normal:queso', '5.00', 1, 'hamburguesa2.jpg'),
(28, '2lQor7hJPH', 'cEXWkprBmUCeLso9wfQYMNvPIR2Kx1', 'pizza', 'normal:queso', '4.00', 1, 'pizza2.jpg'),
(29, 'Oa4UBRe05C', '3kjaKOzC7y9BxrqDUhAXSvgwoLRe82', 'hamburguesa', 'normal:queso', '5.00', 1, 'hamburguesa2.jpg'),
(30, 'ZUDtpSmdTl', 'CVpZXnYtxh1HJw9E5vb3FSNTDLABWg', 'pizza', 'normal:queso', '1.00', 1, 'pizza2.jpg'),
(31, '4qCFeTnKzt', 'yMmcfDqxBEPkSOUhYQRi6jlIg290wW', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa2.jpg'),
(32, 'IinAyxJcVE', 'KheUzY2vQfuXZ6cAxgbROGtE3qnMso', 'pizza', 'normal:queso', '9.00', 1, 'pizza2.jpg'),
(33, 'P1T4JQwvZy', 'JOkxVTfcy5GZIB3NmE74RKDCwUegrM', 'hamburguesa', 'normal:queso', '3.00', 1, 'hamburguesa.jpg'),
(34, 'Ys2hjDKONJ', 'bYqQ4nOBZPj9SkF81JsxKTHlU0ce5L', 'pizza', 'normal:queso', '7.00', 1, 'pizza.jpg'),
(35, 'm3SiXHxBzb', 'HP4MAeT3DjQEVnWIi7Zds21bXShv05', 'hamburguesa', 'normal:queso', '5.00', 1, 'hamburguesa2.jpg'),
(36, '2xAtvGfRZe', 'IUcm7qZhxif92WkBgQLraK4o3slTN8', 'pizza', 'normal:queso', '9.00', 1, 'pizza.jpg'),
(37, 'xBzetZ8cT2', 'Lv56hbpqfNcFg1YdKXmn70lZRSH3Go', 'hamburguesa', 'normal:queso', '3.00', 1, 'hamburguesa.jpg'),
(38, '43AOuoSVfj', 'gYAvj9VZczFW2iwQ10RJE6aunm5dPU', 'pizza', 'normal:queso', '9.00', 1, 'pizza2.jpg'),
(39, 'kWHt2eBCTN', 'xkyAUZjG76JECQgScPXMporN9sqIWB', 'hamburguesa', 'normal:queso', '4.00', 1, 'hamburguesa.jpg'),
(40, '6ULhu7xA4J', 'wI3eQUdFfWgJGzpKTyDMBjavi0c9Ak', 'pizza', 'normal:queso', '7.00', 1, 'pizza2.jpg'),
(41, '6YJDT3Gxs0', 'LPRZJ5WntuXIeTzBMfvQbV9i06FUEk', 'hamburguesa', 'normal:queso', '9.00', 1, 'hamburguesa2.jpg'),
(42, 'SD97ZaGVWR', 'injM0Csc1D8AEhmbrYU795Okdxp3Fa', 'pizza', 'normal:queso', '7.00', 1, 'pizza.jpg'),
(43, 'LIbql5Rp9E', 'zcnb4I1qmOTyXrW7vsQ9fJ8dShB6Nk', 'hamburguesa', 'normal:queso', '7.00', 1, 'hamburguesa.jpg'),
(44, 'infeW4XDPo', '0QP7JxTbepLfhuogYcijADN2sGCz38', 'pizza', 'normal:queso', '9.00', 1, 'pizza.jpg'),
(45, 'r1qhCv0jLi', 'emIJKfygQFtaR7Xv4uBxPNSk6w2jsi', 'hamburguesa', 'normal:queso', '9.00', 1, 'hamburguesa2.jpg'),
(46, '3CsESPH8yK', 'rH9Od5aYFTxwBohfkczltU8GADWCQn', 'pizza', 'normal:queso', '9.00', 1, 'pizza.jpg'),
(47, 'GjgudnNvKr', 'iuwajlzyRBbgrdo5hI3OvfTJH0nsYt', 'hamburguesa', 'normal:queso', '4.00', 1, 'hamburguesa.jpg'),
(48, 'toHgqRCNOn', 'YEbcTPW73B0xqhF9uvCm4RtpgA8DMj', 'pizza', 'normal:queso', '7.00', 1, 'pizza2.jpg'),
(49, 'imCQhOsqMx', 'mVR9ExjCHqKT1r2WnNo6QtJOvPlG4X', 'hamburguesa', 'normal:queso', '2.00', 1, 'hamburguesa2.jpg'),
(50, 'd9A25Ho1Tg', '8Ai06bvjumCa2WtNyJlZFHGd49Xkre', 'pizza', 'normal:queso', '8.00', 1, 'pizza2.jpg'),
(51, 'TbpkerB5RQ', 'wXZlxzIV1FgUyMehSPsvtf0O842Juj', 'hamburguesa', 'normal:queso', '10.00', 1, 'hamburguesa2.jpg'),
(52, 'jGyKm4zDxs', 'RzYu6cigZMINnvHy2Bfw1OPhXCoJsE', 'pizza', 'normal:queso', '3.00', 1, 'pizza.jpg'),
(53, 'ICY0c5quHQ', 'SiZ8syom7vbDIt4JrQqVBnMa5PXlje', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa.jpg'),
(54, '9QCRt3JErb', 'eOxEIs18Gbhq7mUgKM0nLDFNrWtB2a', 'pizza', 'normal:queso', '1.00', 1, 'pizza.jpg'),
(55, 'g2DiTMa1jP', 'nYizLhTyx4Fb5W78wI3vsdXfEt9CJ6', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa.jpg'),
(56, 'Hl6dnEhZYe', 'XKLyeUC6Y4tMOo7wRvianxE2p5sugh', 'pizza', 'normal:queso', '10.00', 1, 'pizza.jpg'),
(57, '9UbzaLGilE', 'x7dQ4VL1AlotWfbp2XMHKJqeuPRn6S', 'hamburguesa', 'normal:queso', '5.00', 1, 'hamburguesa.jpg'),
(58, '3RqycNXmJw', 'jkUmbqa49h1VsRiFXuOEvryJC2AwdI', 'pizza', 'normal:queso', '1.00', 1, 'pizza2.jpg'),
(59, '5Dbxr40XoT', 'Nz15kiFZqnmVveEHy9GLdCKIp04oJD', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa.jpg'),
(60, 'bEDQFW3HXJ', 'W5EjAReHqVvQzTF6U1rMy08pK2CcZf', 'pizza', 'normal:queso', '6.00', 1, 'pizza.jpg'),
(61, 'X9qOZx0W5o', '7NwqbBRu1v8J6izDFeC2LMZKpWEITr', 'hamburguesa', 'normal:queso', '9.00', 1, 'hamburguesa2.jpg'),
(62, '6hS1kROwaq', 'OolpTLZ9UAn2bWSXIudjyYBQ68GD0m', 'pizza', 'normal:queso', '2.00', 1, 'pizza.jpg'),
(63, 'UcxDOXaBh7', 'oCdMIf2y4T1zpuwslK6ZteAjJkQGvD', 'hamburguesa', 'normal:queso', '6.00', 1, 'hamburguesa2.jpg'),
(64, 'g4dynKlMUO', 'mMSb349Nqe8ItLpgolA01Hxh7CEiz2', 'pizza', 'normal:queso', '6.00', 1, 'pizza.jpg'),
(65, '0iX4dnQg1h', '9lTtbGdSU8O1EJuqWMrv6jgiLeR3NH', 'hamburguesa', 'normal:queso', '1.00', 1, 'hamburguesa.jpg'),
(66, '80OkSUIfGo', 'MIb4tsgkcDpUTim2oRVB51qZOQC37x', 'pizza', 'normal:queso', '1.00', 1, 'pizza.jpg'),
(67, '1PKaQgrSoi', 'mYFj9px5cuNh6fb7Dlkdz3TIEQey2O', 'hamburguesa', 'normal:queso', '9.00', 1, 'hamburguesa.jpg'),
(68, '2TjJb5ZOYy', 'ARi6UvEBTorLwVO9tWzDNqPcZd8uyG', 'pizza', 'normal:queso', '6.00', 1, 'pizza.jpg'),
(69, 'JKvkYuq56O', 'JhA5yCLV34j6n1aKiPDWk7EYvbsB0G', 'hamburguesa', 'normal:queso', '7.00', 1, 'hamburguesa.jpg'),
(70, 'Cga9H3pjTQ', 'HnpVwGNgJCa3qjsmzeK68I57ZDTh2y', 'pizza', 'normal:queso', '10.00', 1, 'pizza2.jpg'),
(71, 'uEaf5ZqOwR', 'WSB0Lh17RnDmGxwCtirNfFo658zOau', 'hamburguesa', 'normal:queso', '5.00', 1, 'hamburguesa.jpg'),
(72, '4OQRFS7xgU', 'IKPlfjTtz8wabe2JS4EZ1rBY7HCi0W', 'pizza', 'normal:queso', '8.00', 1, 'pizza.jpg'),
(73, 'BGP1zdALC3', 'RF4i5Utr8jJum291kGQvNMS3Vc0Lpy', 'hamburguesa', 'normal:queso', '4.00', 1, 'hamburguesa.jpg'),
(74, 'dCYJxKvgMn', 'jbBplqf5ws4mLzceC7FgNx1WudXnIi', 'pizza', 'normal:queso', '8.00', 1, 'pizza2.jpg'),
(75, 'F652SG1jkb', 'epM6N4mqoDx0wzJrd7VXsC1aIcLHyO', 'hamburguesa', 'normal:queso', '4.00', 1, 'hamburguesa2.jpg'),
(76, 'cIELiRASUj', '64jdNFToPlJW73pEVOshe5M0cGZu8f', 'pizza', 'normal:queso', '5.00', 1, 'pizza2.jpg'),
(77, 'Em0Qlf2Mw4', 'Ki0qMdz6BQsoSmGltF5EbZ8gJkuDcf', 'hamburguesa', 'normal:queso', '1.00', 1, 'hamburguesa.jpg'),
(78, '4oFg2RQweA', 'IlgLOCRJyanFDd3Kkqco7GAuQjM6Yw', 'pizza', 'normal:queso', '5.00', 1, 'pizza2.jpg'),
(79, 'LcWJaEKdjp', 'Y1yg764K9bNPZHhiCTw3znIMmOLSWD', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa.jpg'),
(80, 'dfADTF79it', 'Sf3WtJeHoQhVdwPxyRD2aZp0sGK179', 'pizza', 'normal:queso', '2.00', 1, 'pizza.jpg'),
(81, '7l6O8XQsvE', 'jp1i5r4XMtHGUknKumNgZOyFo2JfAD', 'hamburguesa', 'normal:queso', '10.00', 1, 'hamburguesa2.jpg'),
(82, 'RnSpUqB4mE', 'W3NugO5MsHy6Bbp8r2Ee9Cqa7IUmQk', 'pizza', 'normal:queso', '3.00', 1, 'pizza2.jpg'),
(83, 'WZDAjgYaK9', 'bOdPrx7Ry45TMCgHezmkW1YFvU6oKu', 'hamburguesa', 'normal:queso', '4.00', 1, 'hamburguesa.jpg'),
(84, '6f5tAvUjhS', 'uAOBfkzN7oql1c82tGwWg4vQCdFrRb', 'pizza', 'normal:queso', '2.00', 1, 'pizza2.jpg'),
(85, 'zM1ePIQipl', 'Mvnz3HlO8b5rda291xDtZC0VYSpQfI', 'hamburguesa', 'normal:queso', '6.00', 1, 'hamburguesa2.jpg'),
(86, '2mo7wpsv9L', 'yDAQtGUPoi6HmnNEeKSdhbcYM09I8l', 'pizza', 'normal:queso', '8.00', 1, 'pizza2.jpg'),
(87, 'WOXMDjZYI0', '1S8VIZgcTH69yYkLwrbJUCvK2PBD5e', 'hamburguesa', 'normal:queso', '4.00', 1, 'hamburguesa.jpg'),
(88, 'PVqmwhoaU8', 'TF7d6fwjCckHOm1gRsN5vQtxZ0qYEe', 'pizza', 'normal:queso', '1.00', 1, 'pizza.jpg'),
(89, 'pAcHtQ4NlI', 'kGfiIvYHwlToWKLBgOUF2nA9MQ38DZ', 'hamburguesa', 'normal:queso', '6.00', 1, 'hamburguesa.jpg'),
(90, 'NjzPEGvu0k', 'iYvFlBPVZ5pSGHoQft6bU2Nh1RkJ8A', 'pizza', 'normal:queso', '10.00', 1, 'pizza.jpg'),
(91, 'GO4KitkIT8', 'X1kBOINZJbSEH85Vhw3lPumWvc2fRp', 'hamburguesa', 'normal:queso', '2.00', 1, 'hamburguesa2.jpg'),
(92, 'jUJ3qaSrYA', 'NX2TF1AR5JUWevcY6OnBMm9ErbzGhK', 'pizza', 'normal:queso', '6.00', 1, 'pizza2.jpg'),
(93, '4jLdM1YUTR', '0pLdwqmcVugnDNkU2YMs67i5KreZBA', 'hamburguesa', 'normal:queso', '7.00', 1, 'hamburguesa.jpg'),
(94, '7jKkWV3hqQ', 'INLn4Dlu2vSAr0Kf6whxzBZG5oYXOR', 'pizza', 'normal:queso', '7.00', 1, 'pizza2.jpg'),
(95, 't7PxQSq8LJ', 'm8hQis2wkPbYB6ueZdxSj45GpLt1nM', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa2.jpg'),
(96, 'EhAe4KODzC', 'LiWfEDlcI8mjkBpX2SqA7Q61ZtoMab', 'pizza', 'normal:queso', '8.00', 1, 'pizza.jpg'),
(97, 'fKdD2Zy74n', 'TfEarjQXe6LPh5cmnRAGlUgZW3Oq0I', 'hamburguesa', 'normal:queso', '3.00', 1, 'hamburguesa2.jpg'),
(98, 'jN4ULyJuS5', 'oCeK52ElAv6VtGB43gquw7X8JTfIWO', 'pizza', 'normal:queso', '8.00', 1, 'pizza.jpg'),
(99, 'H23Uq7d6p9', 'G4AxIVdoWRM1t75vmh3E8g2LZbrn6Q', 'hamburguesa', 'normal:queso', '3.00', 1, 'hamburguesa.jpg'),
(100, '5ZEHIbCniL', 'ck6pwE2GgKDYRvUqZXnrC5l8f7e0xV', 'pizza', 'normal:queso', '4.00', 1, 'pizza2.jpg'),
(101, '0pDOycTCG5', '5B9vEUHyJKtR87V6S2pPWebrGdg13q', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa.jpg'),
(102, 'DXTvSsiGqu', 'd1UtlGhwXrFci3pTq0Ik8JVjR4seaS', 'pizza', 'normal:queso', '9.00', 1, 'pizza.jpg'),
(103, 'Q8lfBP2YdO', 'cMUvETgjq1deJiQ0yWFDaz7LHV5GCP', 'hamburguesa', 'normal:queso', '9.00', 1, 'hamburguesa.jpg'),
(104, 'XQAfoPS0Oi', 'R2d8EMHokSJFetq6mQ4cr5XBsLDwVO', 'pizza', 'normal:queso', '3.00', 1, 'pizza.jpg'),
(105, 'XBAZrlvCmw', 'BdG9PxOoi0DFQ2y4CnbUWrgmlp6J8q', 'hamburguesa', 'normal:queso', '1.00', 1, 'hamburguesa.jpg'),
(106, 'QthRJveVis', 'yHAUeRmJiKhBM5EoXLZSQ8nxId0kqO', 'pizza', 'normal:queso', '8.00', 1, 'pizza2.jpg'),
(107, 'vRAaokz1ME', 'n0DyWHpPcZjJOA9YflVztK4es85vgL', 'hamburguesa', 'normal:queso', '2.00', 1, 'hamburguesa2.jpg'),
(108, 'mtha59HGsF', 'uRFCzmDrJSt2bXLje0apPEH1gOG7hq', 'pizza', 'normal:queso', '5.00', 1, 'pizza2.jpg'),
(109, 'p1ihIE9X4D', 'KeRLuWZFU3I9mcfJioPabpMXCxdtqj', 'hamburguesa', 'normal:queso', '8.00', 1, 'hamburguesa2.jpg'),
(110, 'WtFbhs6S1j', '6kSBiFzDvoKZGuEwNJP8qpgsrnt9T7', 'pizza', 'normal:queso', '10.00', 1, 'pizza2.jpg'),
(111, 'Pizza Peperoni', 'Pizza para los amantes del pepperoni', 'pizza', 'sin_gluten:jserrano:peperoni:sbrava', '10.00', 1, 'pizza2.jpg');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tokens`
--

CREATE TABLE `tokens` (
  `token` varchar(500) NOT NULL,
  `id_user` varchar(1000) NOT NULL,
  `expire` varchar(1000) NOT NULL,
  `tipo` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `tokens`
--

INSERT INTO `tokens` (`token`, `id_user`, `expire`, `tipo`) VALUES
('d89f0a174d1ce2c3eba62598af67881a7a5c381c55b36958d93ba02d5d1b6317', 'fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', '1622640608', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` varchar(500) NOT NULL,
  `user` varchar(1000) NOT NULL,
  `pass` varchar(1000) NOT NULL,
  `email` varchar(1000) NOT NULL,
  `avatar` varchar(1000) NOT NULL,
  `estado` int(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `user`, `pass`, `email`, `avatar`, `estado`) VALUES
('bf427abc8602258fb5d45f009acfb85c0cc0e0f82fe161f862f3008f7d300010', 'hola', '$2y$10$cBge95vAFzOR9cjWFLvEseRiTgZlI1nvPszacchrYgGJJM/9kB5BK', 'narzano.nar@gmail.com', 'https://www.gravatar.com/avatar/5b8f4df4336459a2a9235d9235e456fd?s=80&d=mp&r=g', 1),
('Dau9CLyubXVflSHJ6VoflVH21In2', 'Juan Antonio López Seguí', '', 'juan.antonio.lis@gmail.com', 'https://lh3.googleusercontent.com/a-/AOh14Ghr0dQRm55MaByiZdxOcwGnS9wdPJKr_UvhepLt9g=s96-c', 1),
('fe8688e1ee90b25d97f326a0b9a0af5a0dc195d21e1ae70bdd21398c26661d9d', 'jals', '$2y$10$N/SExwgInvTXG8cpYO16qOW2BKTd5.kAXD58J8HADmjoM85mKU.N2', 'juan.antonio.lis@gmail.com', 'https://www.gravatar.com/avatar/0406df23874e3f76decea9a0bf085a79?s=80&d=mp&r=g', 1),
('SrznrLJFN7YrXaX4R1sivCKnbc13', 'Juan Antonio López Seguí', '', 'juan.antonio.lis@gmail.com', 'https://avatars.githubusercontent.com/u/31510870?v=4', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `visitas_prod`
--

CREATE TABLE `visitas_prod` (
  `id` int(255) NOT NULL,
  `id_user` int(255) NOT NULL,
  `id_prod` int(255) NOT NULL,
  `ip` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `visitas_prod`
--

INSERT INTO `visitas_prod` (`id`, `id_user`, `id_prod`, `ip`) VALUES
(1, -1, 3, '::1'),
(2, -1, 1, '::1'),
(3, -1, 3, '::1'),
(4, -1, 4, '::1'),
(5, -1, 6, '::1'),
(6, -1, 2, '::1'),
(7, -1, 5, '::1'),
(8, -1, 16, '::1'),
(9, -1, 2, '::1'),
(10, -1, 2, '::1'),
(11, -1, 15, '::1'),
(12, -1, 1, '::1'),
(13, -1, 104, '::1'),
(14, -1, 104, '::1'),
(15, -1, 104, '::1'),
(16, -1, 111, '::1'),
(17, -1, 111, '::1'),
(18, -1, 111, '::1'),
(19, -1, 111, '::1'),
(20, -1, 111, '::1'),
(21, -1, 88, '::1'),
(22, -1, 88, '::1'),
(23, -1, 88, '::1'),
(24, -1, 49, '::1'),
(25, -1, 5, '::1'),
(26, -1, 49, '::1'),
(27, -1, 80, '::1'),
(28, -1, 59, '::1'),
(29, -1, 5, '::1'),
(30, -1, 62, '::1'),
(31, -1, 111, '::1'),
(32, -1, 111, '::1'),
(33, -1, 111, '::1'),
(34, -1, 111, '::1'),
(35, -1, 111, '::1'),
(36, -1, 26, '::1'),
(37, -1, 11, '::1'),
(38, -1, 77, '::1'),
(39, -1, 9, '::1'),
(40, -1, 9, '::1'),
(41, -1, 9, '::1'),
(42, -1, 9, '::1'),
(43, -1, 9, '::1'),
(44, -1, 9, '::1'),
(45, -1, 9, '::1'),
(46, -1, 9, '::1'),
(47, -1, 9, '::1'),
(48, -1, 9, '::1'),
(49, -1, 9, '::1'),
(50, -1, 9, '::1'),
(51, -1, 9, '::1'),
(52, -1, 9, '::1'),
(53, -1, 9, '::1'),
(54, -1, 9, '::1'),
(55, -1, 9, '::1'),
(56, -1, 9, '::1'),
(57, -1, 9, '::1'),
(58, -1, 9, '::1'),
(59, -1, 9, '::1'),
(60, -1, 9, '::1'),
(61, -1, 9, '::1'),
(62, -1, 9, '::1'),
(63, -1, 9, '::1'),
(64, -1, 9, '::1'),
(65, -1, 9, '::1'),
(66, -1, 9, '::1'),
(67, -1, 9, '::1'),
(68, -1, 9, '::1'),
(69, -1, 9, '::1'),
(70, -1, 9, '::1'),
(71, -1, 9, '::1'),
(72, -1, 9, '::1'),
(73, -1, 9, '::1'),
(74, -1, 7, '::1'),
(75, -1, 7, '::1'),
(76, -1, 7, '::1'),
(77, -1, 7, '::1'),
(78, -1, 7, '::1'),
(79, -1, 7, '::1'),
(80, -1, 7, '::1'),
(81, -1, 7, '::1'),
(82, -1, 7, '::1'),
(83, -1, 7, '::1'),
(84, -1, 7, '::1'),
(85, -1, 7, '::1'),
(86, -1, 7, '::1'),
(87, -1, 7, '::1'),
(88, -1, 7, '::1'),
(89, -1, 7, '::1'),
(90, -1, 7, '::1'),
(91, -1, 7, '::1'),
(92, -1, 7, '::1'),
(93, -1, 7, '::1'),
(94, -1, 7, '::1'),
(95, -1, 7, '::1'),
(96, -1, 7, '::1'),
(97, -1, 7, '::1'),
(98, -1, 7, '::1'),
(99, -1, 1, '::1'),
(100, -1, 1, '::1'),
(101, -1, 1, '::1'),
(102, -1, 1, '::1'),
(103, -1, 1, '::1'),
(104, -1, 1, '::1'),
(105, -1, 1, '::1'),
(106, -1, 1, '::1'),
(107, -1, 1, '::1'),
(108, -1, 1, '::1'),
(109, -1, 1, '::1'),
(110, -1, 1, '::1'),
(111, -1, 1, '::1'),
(112, -1, 1, '::1'),
(113, -1, 1, '::1'),
(114, -1, 1, '::1'),
(115, -1, 1, '::1'),
(116, -1, 1, '::1'),
(117, -1, 1, '::1'),
(118, -1, 1, '::1'),
(119, -1, 1, '::1'),
(120, -1, 1, '::1'),
(121, -1, 1, '::1'),
(122, -1, 1, '::1'),
(123, -1, 1, '::1'),
(124, -1, 1, '::1'),
(125, -1, 1, '::1'),
(126, -1, 1, '::1'),
(127, -1, 1, '::1'),
(128, -1, 1, '::1'),
(129, -1, 1, '::1'),
(130, -1, 1, '::1'),
(131, -1, 1, '::1'),
(132, -1, 1, '::1'),
(133, -1, 1, '::1'),
(134, -1, 1, '::1'),
(135, -1, 1, '::1'),
(136, -1, 1, '::1'),
(137, -1, 1, '::1'),
(138, -1, 1, '::1'),
(139, -1, 1, '::1'),
(140, -1, 1, '::1'),
(141, -1, 1, '::1'),
(142, -1, 1, '::1'),
(143, -1, 1, '::1'),
(144, -1, 1, '::1'),
(145, -1, 1, '::1'),
(146, -1, 11, '::1'),
(147, -1, 11, '::1'),
(148, -1, 11, '::1'),
(149, -1, 11, '::1'),
(150, -1, 11, '::1'),
(151, -1, 11, '::1'),
(152, -1, 11, '::1'),
(153, -1, 11, '::1'),
(154, -1, 11, '::1'),
(155, -1, 11, '::1'),
(156, -1, 11, '::1'),
(157, -1, 11, '::1'),
(158, -1, 11, '::1'),
(159, -1, 21, '::1'),
(160, -1, 1, '::1'),
(161, -1, 1, '::1'),
(162, -1, 71, '::1'),
(163, -1, 71, '::1'),
(164, -1, 71, '::1'),
(165, -1, 4, '::1'),
(166, -1, 4, '::1'),
(167, -1, 15, '::1'),
(168, -1, 11, '::1'),
(169, -1, 11, '::1'),
(170, -1, 4, '::1'),
(171, -1, 4, '::1'),
(172, -1, 1, '::1'),
(173, -1, 1, '::1'),
(174, -1, 1, '::1'),
(175, -1, 1, '::1'),
(176, -1, 30, '::1'),
(177, -1, 1, '::1');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cart`
--
ALTER TABLE `cart`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`name`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `locales`
--
ALTER TABLE `locales`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id_order`);

--
-- Indices de la tabla `orders_prod`
--
ALTER TABLE `orders_prod`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`cod_prod`);

--
-- Indices de la tabla `tokens`
--
ALTER TABLE `tokens`
  ADD PRIMARY KEY (`token`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `visitas_prod`
--
ALTER TABLE `visitas_prod`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cart`
--
ALTER TABLE `cart`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `locales`
--
ALTER TABLE `locales`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `orders_prod`
--
ALTER TABLE `orders_prod`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `cod_prod` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=112;

--
-- AUTO_INCREMENT de la tabla `visitas_prod`
--
ALTER TABLE `visitas_prod`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=178;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
