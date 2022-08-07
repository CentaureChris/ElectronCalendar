-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost:8889
-- Généré le : dim. 07 août 2022 à 16:00
-- Version du serveur :  5.7.34
-- Version de PHP : 7.4.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `electronapp`
--

-- --------------------------------------------------------

--
-- Structure de la table `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `date` date NOT NULL,
  `description` varchar(250) NOT NULL,
  `start_event` time NOT NULL,
  `end_event` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `events`
--

INSERT INTO `events` (`id`, `date`, `description`, `start_event`, `end_event`) VALUES
(5, '2022-09-15', 'sept rdv', '00:00:00', '00:00:00'),
(24, '2022-08-08', 'Depart vacances', '11:00:00', '12:00:00'),
(28, '2022-08-06', 'rd1', '01:00:00', '01:10:00'),
(29, '2022-08-06', 'rdv2', '17:00:00', '17:30:00'),
(30, '2022-08-06', 'rdv3', '09:00:00', '12:00:00'),
(32, '2022-08-11', '1st meet of the day', '08:00:00', '00:00:00'),
(33, '2022-09-06', '1st meet of the day', '08:00:00', '09:00:00'),
(34, '2022-09-06', '2nd Meet', '10:00:00', '11:00:00'),
(37, '2022-08-01', 'test update 1 august', '22:22:00', '01:34:00'),
(39, '2022-08-01', 'test updated', '11:11:00', '21:21:00');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=41;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
