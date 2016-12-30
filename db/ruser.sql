-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 30, 2016 at 07:38 PM
-- Server version: 5.5.53-0ubuntu0.14.04.1
-- PHP Version: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `ruser`
--

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `age` int(3) NOT NULL DEFAULT '0',
  `email` varchar(100) NOT NULL,
  `phone` int(11) DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `salary` varchar(24) NOT NULL,
  `address` text NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=6 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `name`, `age`, `email`, `phone`, `password`, `salary`, `address`) VALUES
(1, 'rishiraj', 0, 'rishiraj@test.com', NULL, '123456', '42000', 'my status'),
(2, 'Nitin', 36, 'nitin@test.com', 123456789, '123456789', '28544', 'indore'),
(4, 'zeyutestey', 26, 'zeyu@test.com', 0, '123456789', '25122', 'test test test test'),
(5, 'suraj singh', 36, 'suraj@test.com', 0, '123456789', '12541', 'test Indore Mg road');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
