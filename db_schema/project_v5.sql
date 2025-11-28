-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- 생성 시간: 25-11-28 03:44
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
-- 테이블 구조 `inventory`
--

DROP TABLE IF EXISTS `inventory`;
CREATE TABLE IF NOT EXISTS `inventory` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `id` varchar(20) DEFAULT NULL,
  `item_name` varchar(20) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `inventory`
--

INSERT INTO `inventory` (`idx`, `id`, `item_name`, `timestamp`) VALUES
(1, 'shion', 'ultang', '2025-11-20 21:14:14'),
(2, 'shion', 'shungjwak', '2025-11-28 10:14:45');

-- --------------------------------------------------------

--
-- 테이블 구조 `item_dic`
--

DROP TABLE IF EXISTS `item_dic`;
CREATE TABLE IF NOT EXISTS `item_dic` (
  `item_name` varchar(20) NOT NULL,
  `idx` int DEFAULT NULL,
  `price` int DEFAULT NULL,
  PRIMARY KEY (`item_name`),
  UNIQUE KEY `idx` (`idx`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `item_dic`
--

INSERT INTO `item_dic` (`item_name`, `idx`, `price`) VALUES
('ultang', 1, 120),
('shungjwak', 2, 100),
('elena', 3, 100),
('risty', 4, 100);

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
) ENGINE=MyISAM AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `log_login`
--

INSERT INTO `log_login` (`idx`, `id`, `timestamp`, `ip`) VALUES
(1, 'shion', '2025-11-20 21:13:40', '::1'),
(2, 'shion', '2025-11-21 09:59:50', '::1'),
(3, 'shion', '2025-11-21 10:03:08', '::1'),
(4, 'shion', '2025-11-24 14:04:39', '::1'),
(5, 'shion', '2025-11-24 20:19:31', '::1'),
(6, 'shion', '2025-11-27 10:03:06', '::1'),
(7, 'shion', '2025-11-27 19:22:12', '::1'),
(8, 'yiho', '2025-11-27 19:28:44', '::1'),
(9, 'yiho', '2025-11-27 19:31:05', '::1'),
(10, 'shion', '2025-11-27 22:02:12', '::1'),
(11, 'yiho', '2025-11-28 10:24:26', '::1'),
(12, 'yiho', '2025-11-28 10:26:59', '::1'),
(13, 'shion', '2025-11-28 11:00:07', '::1');

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
-- 테이블 구조 `post`
--

DROP TABLE IF EXISTS `post`;
CREATE TABLE IF NOT EXISTS `post` (
  `idx` int NOT NULL AUTO_INCREMENT,
  `id` varchar(20) DEFAULT NULL,
  `title` varchar(50) DEFAULT NULL,
  `content` varchar(255) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  PRIMARY KEY (`idx`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `post`
--

INSERT INTO `post` (`idx`, `id`, `title`, `content`, `timestamp`) VALUES
(12, 'shion', '으', '1', '2025-11-27 19:04:34'),
(4, '1', '2', '3', '2025-11-27 15:25:04'),
(15, 'shion', '으아아아아', '아아아아아아아아아 아아아\r\n아아아앙 아아아아\r\n222\r\n2222\r\n333h', '2025-11-28 10:10:23'),
(16, 'yiho', '근데이겜재밌음?', 'ㅇㅇ?', '2025-11-27 19:31:24');

-- --------------------------------------------------------

--
-- 테이블 구조 `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` varchar(20) NOT NULL,
  `pw` varchar(20) NOT NULL,
  `nickname` varchar(20) DEFAULT NULL,
  `hi_score` int DEFAULT '0',
  `credit` int DEFAULT '0',
  `phone` int DEFAULT NULL,
  `email` varchar(30) DEFAULT NULL,
  `timestamp` datetime DEFAULT NULL,
  `ip` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `user`
--

INSERT INTO `user` (`id`, `pw`, `nickname`, `hi_score`, `credit`, `phone`, `email`, `timestamp`, `ip`) VALUES
('yiho', '1234512345', NULL, 1, 1, NULL, NULL, '2025-11-27 19:30:52', '::1'),
('abcd', '1234512345', NULL, 11, 0, NULL, NULL, '2025-11-12 18:53:07', '::1'),
('john', '1234512345', NULL, 5, 0, NULL, NULL, '2025-11-12 18:53:26', '::1'),
('shion', '1234512345', NULL, 10, 37, NULL, NULL, '2025-11-12 18:53:54', '::1');

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
) ENGINE=MyISAM AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- 테이블의 덤프 데이터 `user_record`
--

INSERT INTO `user_record` (`idx`, `id`, `score`, `d_message`, `timestamp`) VALUES
(1, 'shion', 10, '왜 죽은걸까요', '2025-11-28 11:01:20'),
(2, 'shion', 1, '왜 죽은걸까요', '2025-11-28 11:01:36'),
(3, 'shion', 0, '왜 죽은걸까요', '2025-11-28 11:01:59'),
(4, 'shion', 2, '왜 죽은걸까요', '2025-11-28 11:02:09'),
(5, 'shion', 2, '왜 죽은걸까요', '2025-11-28 11:02:28'),
(6, 'shion', 1, '왜 죽은걸까요', '2025-11-28 11:02:51'),
(7, 'shion', 3, '왜 죽은걸까요', '2025-11-28 11:03:06'),
(8, 'shion', 3, '왜 죽은걸까요', '2025-11-28 11:03:24'),
(9, 'shion', 1, '왜 죽은걸까요', '2025-11-28 11:03:34'),
(10, 'shion', 1, '왜 죽은걸까요', '2025-11-28 11:03:55'),
(11, 'shion', 1, '왜 죽은걸까요', '2025-11-28 11:04:20'),
(12, 'shion', 1, '살기힘들어요', '2025-11-28 11:18:01');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
