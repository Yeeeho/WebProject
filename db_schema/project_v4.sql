-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- 생성 시간: 25-11-12 12:34
-- 서버 버전: 9.1.0
-- PHP 버전: 8.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- 데이터베이스: `project`
--

-- --------------------------------------------------------

--
-- 테이블 구조 `log_login`
--

DROP TABLE IF EXISTS `log_login`;
CREATE TABLE IF NOT EXISTS `log_login` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `id` varchar(20) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `log_login`
--

INSERT INTO `log_login` (`idx`, `id`, `timestamp`, `ip`) VALUES
(1, 'abcd', '2025-11-12 18:54:19', '::1'),
(2, 'john', '2025-11-12 18:55:17', '::1'),
(3, 'shion', '2025-11-12 18:55:55', '::1'),
(4, 'yiho', '2025-11-12 21:11:23', '::1');

-- --------------------------------------------------------

--
-- 테이블 구조 `notice`
--

DROP TABLE IF EXISTS `notice`;
CREATE TABLE IF NOT EXISTS `notice` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `content` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- 테이블 구조 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(20) NOT NULL,
  `pw` varchar(20) NOT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `hi_score` int DEFAULT NULL,
  `phone` int DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `user`
--

INSERT INTO `user` (`id`, `pw`, `nickname`, `hi_score`, `phone`, `email`, `timestamp`, `ip`) VALUES
('yiho', '1234512345', NULL, 3, NULL, NULL, NULL, NULL),
('abcd', '1234512345', NULL, 11, NULL, NULL, '2025-11-12 18:53:07', '::1'),
('john', '1234512345', NULL, 5, NULL, NULL, '2025-11-12 18:53:26', '::1'),
('shion', '1234512345', NULL, 2, NULL, NULL, '2025-11-12 18:53:54', '::1');

-- --------------------------------------------------------

--
-- 테이블 구조 `user_record`
--

DROP TABLE IF EXISTS `user_record`;
CREATE TABLE IF NOT EXISTS `user_record` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `id` varchar(20) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `d_message` varchar(50) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `user_record`
--

INSERT INTO `user_record` (`idx`, `id`, `score`, `d_message`, `timestamp`) VALUES
(1, 'shion', 2, 'sadsadsad', '2025-11-12 20:27:11'),
(2, 'shion', 0, '1234123', '2025-11-12 20:44:41'),
(3, 'yiho', 0, '왜 죽은걸까요', '2025-11-12 21:11:33'),
(4, 'yiho', 1, '왜 죽은걸까요', '2025-11-12 21:14:36'),
(5, 'yiho', 1, '왜 죽은걸까요', '2025-11-12 21:15:38'),
(6, 'yiho', 1, 'ddd', '2025-11-12 21:16:06'),
(7, 'yiho', 1, '이게 뭔게임이냐', '2025-11-12 21:16:40'),
(8, 'yiho', 0, '크아악', '2025-11-12 21:17:05'),
(9, 'yiho', 3, '크아악', '2025-11-12 21:19:34'),
(10, 'yiho', 0, '21313', '2025-11-12 21:23:18'),
(11, 'yiho', 2, '왜 죽은걸까요', '2025-11-12 21:33:11');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
