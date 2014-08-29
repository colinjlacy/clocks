-- phpMyAdmin SQL Dump
-- version 4.1.12
-- http://www.phpmyadmin.net
--
-- Host: localhost:8889
-- Generation Time: Aug 29, 2014 at 08:41 PM
-- Server version: 5.5.34
-- PHP Version: 5.5.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";

--
-- Database: `clocks`
--

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `id` int(50) NOT NULL,
  `parent` int(50) DEFAULT NULL,
  `title` varchar(244) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL,
  `hourly_rate` float DEFAULT NULL,
  `time_spent` int(244) NOT NULL,
  `time_budgeted` int(244) DEFAULT NULL,
  `owner` int(50) NOT NULL,
  `access` bigint(20) unsigned AUTO_INCREMENT,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `id_2` (`id`),
  UNIQUE KEY `access` (`access`),
  KEY `id_3` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;
