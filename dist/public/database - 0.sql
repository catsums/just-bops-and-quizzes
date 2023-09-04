-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 14, 2021 at 09:53 PM
-- Server version: 8.0.26-0ubuntu0.20.04.2
-- PHP Version: 7.4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `u19024895`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbactivities`
--

CREATE TABLE `tbactivities` (
  `id` varchar(8) NOT NULL,
  `userID` varchar(8) DEFAULT NULL,
  `type` varchar(30) DEFAULT NULL,
  `info` varchar(100) DEFAULT NULL,
  `details` longtext,
  `time` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbactivities`
--

INSERT INTO `tbactivities` (`id`, `userID`, `type`, `info`, `details`, `time`) VALUES
('4Us75dWK', '49ec0702', 'Deleted Quiz', 'allium_dais deleted a quiz', '{\"quizID\":\"789008b1\"}', '2021-11-14 21:53:26'),
('wzKUL6gS', '1b9903e4', 'Created Quiz', 'HOMER created a quiz: SOCCER QUIZ', '{\"quizID\":\"6a4407ec\"}', '2021-11-14 21:49:01');

-- --------------------------------------------------------

--
-- Table structure for table `tbapikeys`
--

CREATE TABLE `tbapikeys` (
  `id` varchar(9) NOT NULL,
  `apikey` varchar(40) NOT NULL,
  `userID` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbapikeys`
--

INSERT INTO `tbapikeys` (`id`, `apikey`, `userID`) VALUES
('7f8807eeS', '553694be143e352728b41061ba21ac33', '1ec004c6'),
('82060824V', '033e06361e5a9c1d374911125aa4f54f', '17ac03a4'),
('82500861E', '078c0436e333a624b9a0705f80f4f7ed', '49ec0702'),
('829007e7f', 'd5d630725692e801ae7416749966f4f2', '46cb072d'),
('82b70888D', '290151160e0a3494aad7adf093b5d97e', '17ac03a4'),
('82c40817v', '2c835896e626167c29d2b652b8c6f139', '49ec0702'),
('84f00840G', '63eb40f164623635986a9bae552d749d', '49ec0702'),
('85de0838E', '259d3880e88c53172ec37c52cda20079', '49ec0702'),
('870608232', '3a85a2005769a2c6a2c7a2e18093c334', '46cb072d'),
('87f2084b2', '178e30c0a30cf562e57552b110b0af38', '24ad0536'),
('895f0871r', 'e39a71148a49d40965c428cfff816a90', '1ec004c6'),
('8974081bw', 'a591a5f51778a9e7139e86b7893b3217', '29f10554'),
('8a5108efY', '823a54196a2a4ac2d7a8543bc66d8bee', '17ac03a4'),
('8b1a08a3G', '083f2a34b76e9698cf786c3a30e45bd7', '24ad0536'),
('8b590873H', '05723eee2c0c496317ef78e3f24938c7', '49ec0702'),
('8d310853N', '28fe941fe340d76f472998d3fc427189', '49ec0702'),
('8d9308e2W', '7642e73e5f3d9c0d196575dffc76e8b8', '2a8e0539'),
('8dc30842D', 'c99fd24c8d54538451d5a927e0844b52', '4edd077f'),
('914008dbQ', '4de5733ccd628759c88a4eb584c7b39d', '49ec0702'),
('921c08f7X', 'e9f09c1777a85c60dfd40e2380b2dd4e', '1b9903e4'),
('92de0938h', '1d3dc666083b0ccc53a282d1bbf4acc1', '49ec0702'),
('933a092bO', '551f439da7975bafd5fdca3930d803df', '29f10554'),
('9411092cC', 'd799a9e720d8bb5a94939c6ab1bb1c6c', '49ec0702'),
('965208e4C', '9ed8974dee7775b17cdd3b49f076754c', '49ec0702'),
('98220957u', '2ae2812d8e0fea98fb092aee61f478ad', '36b1062a'),
('983108b9n', 'abb28d1c4426bcc91b487e1be5415077', '1ec004c6'),
('996f08e82', '0b88cad94dbbb148c03b19bf90305c56', '17ac03a4'),
('9aaf098el', 'df19f5f65af3fc52619941cc8aafb3fd', '17ac03a4'),
('9c2e0967r', '13a04ba8a8ff5fcf2b1ad3a13e0f2f31', '49ec0702'),
('9f0d097dG', 'd2d73de01cbc8e8c0ee272fdb8243ce4', '49ec0702'),
('a40109f9A', '3cf45c1ec14dadec1b4db2f6ae3bbe40', '2a8e0539'),
('a7c209a7v', 'c22af9cdb9bbbcfb4e89f1040e7dc022', '49ec0702'),
('a7da09c9G', 'cfc91bdc769dd7ffcc83ee6448fb30d8', '1ec004c6');

-- --------------------------------------------------------

--
-- Table structure for table `tbhashtags`
--

CREATE TABLE `tbhashtags` (
  `id` varchar(9) NOT NULL,
  `tagName` varchar(30) NOT NULL,
  `tagCount` int NOT NULL DEFAULT '1',
  `dateCreated` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tblists`
--

CREATE TABLE `tblists` (
  `id` varchar(8) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` text NOT NULL,
  `quizzes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `userID` varchar(8) NOT NULL,
  `dateCreated` date NOT NULL,
  `imageURL` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tblists`
--

INSERT INTO `tblists` (`id`, `name`, `description`, `quizzes`, `userID`, `dateCreated`, `imageURL`) VALUES
('0c050d86', 'Genshin Impact Quizzes', 'These are quizzes relating to the game Genshin Impact :)', '[\"8c8a091f\",\"9d040a06\",\"d8920c24\"]', '2a8e0539', '2021-11-07', 'Albedo.jpg-412848308.dat'),
('57b80766', 'xcvcxv', 'xcvxcvxcvxcv', '[\"3beb0631\",\"5cc30793\",\"619b079a\",\"784f084b\",\"789008b1\",\"8c8a091f\",\"d8920c24\"]', '29f10554', '2021-10-30', 'goat.jpg1735130766.dat'),
('93d409da', 'My favourite', 'Some cool quizzes VR likes', '[\"8bbf08fc\",\"5cc30793\",\"3beb0631\"]', '4edd077f', '2021-11-14', '6c82d9c166376534be546f8c04ea1905-178487317.dat'),
('a1c70a28', 'Genshin Impact', 'A playlist for Genshin Impact related Quizzes. Feel free to try this quiz if you lack primo gems or you just like Venti and Hu Tao', '[\"8c8a091f\",\"d8920c24\"]', '49ec0702', '2021-10-21', 'who tao.png1577223035.dat'),
('a4370a7d', 'Local Playlist', 'A playlist for testing out certain functions, but I like to add some quizzes with pretty images.', '[\"3beb0631\",\"d8920c24\"]', '49ec0702', '2021-10-22', '854997451995611156.png-1903402212.dat'),
('b81d0a35', 'Bubbles and Cats!', 'A playlist of my favourite quizzes from Mr. Qwe', '[\"3beb0631\",\"5cc30793\",\"619b079a\"]', '49ec0702', '2021-10-21', 'vibingcat.gif-336165671.dat'),
('c7c30b6b', 'Allium Collection', 'A collection with Allium\'s Playlists...', '[\"784f084b\",\"8c8a091f\"]', '49ec0702', '2021-10-21', '29-cool-and-random-things-you-ca1818014739.dat'),
('fd780d4f', 'My favourite  Quizzes', 'All the quizzes from users  who made me feel dumb :(', '[\"3beb0631\",\"784f084b\",\"8c8a091f\",\"619b079a\"]', '46cb072d', '2021-10-21', 'funny-weird-wtf-stock-photos-17-339163587.dat');

-- --------------------------------------------------------

--
-- Table structure for table `tbquizzes`
--

CREATE TABLE `tbquizzes` (
  `id` varchar(8) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `userID` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `imageURL` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `passingGrade` int DEFAULT '0',
  `hashtags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `questions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `songID` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dateCreated` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbquizzes`
--

INSERT INTO `tbquizzes` (`id`, `name`, `description`, `userID`, `imageURL`, `passingGrade`, `hashtags`, `questions`, `songID`, `dateCreated`) VALUES
('3beb0631', 'Cat', 'Cats?!?', '17ac03a4', 'cat.dat', 0, '[\"catto\",\"test\"]', NULL, NULL, '2021-10-06'),
('5cc30793', 'Bubbles', 'Bubbles are underrated', '17ac03a4', 'default.dat', 0, '[\"shiny\",\"colourful\",\"delicate\"]', NULL, NULL, '2021-10-12'),
('619b079a', 'Bubbles2', 'Bubbles are underrated', '17ac03a4', 'default.dat', 0, '[\"shiny\",\"colourful\",\"delicate\"]', NULL, NULL, '2021-10-12'),
('6a4407ec', 'SOCCER QUIZ', 'A quiz about playing soccer in a neat way', '1b9903e4', '8de33163859f2b6d030383d94418e167982338362.dat', 20, '[\"soccer\"]', '[{\"answers\":[{\"answer\":\"Yes\",\"correct\":true},{\"answer\":\"No\",\"correct\":false}],\"question\":\"Do you like soccer?\",\"imageURL\":\"default.dat\",\"type\":\"single\"},{\"answers\":[{\"answer\":\"With foot\",\"correct\":true},{\"answer\":\"With hand\",\"correct\":false}],\"question\":\"How to kick ball?\",\"imageURL\":\"default.dat\",\"type\":\"single\"}]', 'af020a64', '2021-11-14'),
('784f084b', 'Bee\'s knees', 'Here we try our best to discover how fascinating our bees can be', '49ec0702', 'maxresdefault.dat', 0, '[\"bees\",\"cute\"]', NULL, NULL, '2021-10-17'),
('8bbf08fc', 'The Veno Quiz', 'A quiz about trying to guess how to beat Veno', '36b1062a', 'default.dat', 30, '[\"supreme\",\"king\",\"worship\"]', '[{\"answers\":[{\"answer\":\"Punch back\",\"correct\":false},{\"answer\":\"Block\",\"correct\":false},{\"answer\":\"Cry\",\"correct\":false},{\"answer\":\"Bow down to Veno\",\"correct\":true}],\"question\":\"If Veno were to punch you, how would you respond?\",\"imageURL\":\"default.dat\",\"type\":\"single\"},{\"answers\":[{\"answer\":\"Bow to Veno\",\"correct\":true},{\"answer\":\"Say thank you\",\"correct\":false},{\"answer\":\"Cry\",\"correct\":false}],\"question\":\"If Veno was to step on you, how would you react?\",\"imageURL\":\"default.dat\",\"type\":\"single\"},{\"answers\":[{\"answer\":\"Pay for it\",\"correct\":false},{\"answer\":\"Bow down to Veno\",\"correct\":true},{\"answer\":\"Steal it\",\"correct\":false}],\"question\":\"If Veno was to buy pizza hut, what would you do?\",\"imageURL\":\"default.dat\",\"type\":\"single\"}]', 'b1380a93', '2021-11-14'),
('8c8a091f', 'Hu Tao Sundae', 'Guess all of the favourite meals of Hu Tao!', '49ec0702', 'b515efe16500920127193590d177bdc5.dat', 0, '[\"hu tao\",\"genshin\",\"meals\"]', NULL, NULL, '2021-09-24'),
('9d040a06', 'The Venti Quiz', 'How well do you know the Anemo Archon?', '2a8e0539', 'Venti.jpg1368507687.dat', 0, '[\"venti\",\"barbatos\",\"genshin impact\",\"anemo archon\"]', '[{\"answers\":[{\"answer\":\"Venti\",\"correct\":false},{\"answer\":\"Barbatos\",\"correct\":true},{\"answer\":\"Bartobas\",\"correct\":false},{\"answer\":\"Tone Deaf Bard\",\"correct\":false}],\"question\":\"What is Venti\'s real name?\",\"imageURL\":\"default.dat\",\"type\":\"single\"}]', NULL, '2021-11-07'),
('d8920c24', 'Venti\'s weaknesses', 'Find out who can boot Venti and best him at his own game!', '1ec004c6', 'ventilated.dat', 0, '[\"venti\"]', NULL, NULL, '2021-09-24');

-- --------------------------------------------------------

--
-- Table structure for table `tbroles`
--

CREATE TABLE `tbroles` (
  `id` varchar(8) NOT NULL,
  `name` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `permissions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin
) ;

--
-- Dumping data for table `tbroles`
--

INSERT INTO `tbroles` (`id`, `name`, `permissions`) VALUES
('00000000', 'Normal User', '{}'),
('12121212', 'Admin', '{}');

-- --------------------------------------------------------

--
-- Table structure for table `tbsongs`
--

CREATE TABLE `tbsongs` (
  `id` varchar(8) NOT NULL,
  `title` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `author` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `songURL` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `bpm` smallint DEFAULT '100',
  `measure` smallint DEFAULT '4',
  `userID` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `useCount` int DEFAULT '1',
  `dateAdded` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbsongs`
--

INSERT INTO `tbsongs` (`id`, `title`, `author`, `songURL`, `bpm`, `measure`, `userID`, `useCount`, `dateAdded`) VALUES
('8f9b0957', 'Here We Are', 'Laszlo', 'Laszlo - Here We Are [NCS Release]', 175, 4, '00000000', 1, '2021-10-22'),
('90c80945', 'IDOLS', 'Virtual Riot', 'Virtual Riot - Idols (EDM Mashup) [NCS Fanmade].dat', 128, 4, '00000000', 1, '2021-09-24'),
('af020a64', 'Stronger', 'LemonFight', 'Lemon Fight - Stronger (feat. Jessica Reynoso) [Champion Remix] ! NCS Release', 174, 4, '00000000', 1, '2021-10-22'),
('b1380a93', 'Weird Dream', 'Domastic', 'Domastic - Weird Dream [NCS Release].dat', 128, 4, '00000000', 1, '2021-09-24');

-- --------------------------------------------------------

--
-- Table structure for table `tbusers`
--

CREATE TABLE `tbusers` (
  `id` varchar(8) NOT NULL,
  `username` varchar(30) NOT NULL,
  `firstname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `lastname` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `password` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `score` int DEFAULT NULL,
  `following` longtext,
  `followers` longtext,
  `email` varchar(40) NOT NULL,
  `imageURL` varchar(100) DEFAULT NULL,
  `roleID` varchar(8) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `friendlist` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `preferences` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `secretkey` varchar(40) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `dateCreated` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `tbusers`
--

INSERT INTO `tbusers` (`id`, `username`, `firstname`, `lastname`, `password`, `DOB`, `description`, `score`, `following`, `followers`, `email`, `imageURL`, `roleID`, `friendlist`, `preferences`, `secretkey`, `dateCreated`) VALUES
('00000000', 'ADMIN', 'Default', 'Admin', '00000000', '2000-01-01', NULL, NULL, NULL, NULL, 'default@user.com', 'default.dat', '00000000', NULL, '{\"color\":\"A\",\"shape\":\"A\"}', '00000000000000000000000000000000', '2021-10-22 00:00:00'),
('17ac03a4', 'qwe', 'qwe', 'qwe', '7efea09a392554e4', '2021-09-28', NULL, NULL, NULL, NULL, 'qwe@qwe.com', NULL, '00000000', '[\"49ec0702\",\"46cb072d\",\"1ec004c6\"]', '{\"color\":\"B\",\"shape\":\"A\"}', 'beb44c4b2e915e8a5fff5e0de0ea5e54', '2021-10-06 00:00:00'),
('1b9903e4', 'HOMER', 'Soccer', 'Man', '44a69478905c560c', '1987-03-12', 'The soccer man', NULL, NULL, NULL, 'homerman', 'default.dat', '0', NULL, '{\"color\":\"D\",\"shape\":\"B\"}', 'afe883487e58e9effb8b9251f2f877f2', '2021-11-14 21:43:15'),
('1ec004c6', 'Test', 'Lorem', 'Ipsum', 'ce74747ef31cc639', '2000-01-01', NULL, NULL, NULL, NULL, 'test@test.com', 'default.dat', '00000000', '[\"17ac03a4\"]', '{\"color\":\"A\",\"shape\":\"A\"}', 'af8b43f151990dfc11e24e300ba5c1a2', '2021-09-24 00:00:00'),
('24ad0536', 'milky', 'Milky', 'Lane', '84bd8f942ac31ff0', '2021-10-21', NULL, NULL, NULL, NULL, 'milky@lane.com', NULL, '00000000', NULL, '{\"color\":\"A\",\"shape\":\"A\"}', '9a374124ddca25e48418ebdf4bfa71bc', '2021-10-12 00:00:00'),
('29f10554', 'tester', 'tester', 'test', '8b479185bd084f26', '1999-01-01', NULL, NULL, NULL, NULL, 'tester@gmail.com', NULL, '00000000', NULL, NULL, '4d411290a6e39cc893bc583d9db47ca6', '2021-10-30 00:00:00'),
('2a8e0539', 'JaneDoe', 'Jane', 'Doe', 'a64620ca4366dc7d', '1998-10-31', NULL, NULL, NULL, '[\"36b1062a\"]', 'jane.doe@gmail.com', NULL, '00000000', NULL, NULL, 'e6714f1ca735300ea048293f90f63144', '2021-11-07 00:00:00'),
('36b1062a', 'Venolexx', 'Veno', 'Lexx', '50cfefe58adf55d7', '2020-12-09', 'The supreme overload Venolexx', NULL, '[\"49ec0702\",\"2a8e0539\"]', NULL, 'venolexx@lexx.net', 'default.dat', '0', NULL, '{\"color\":\"F\",\"shape\":\"A\"}', 'dd0f7c598988f6d5330c2777c017d8e2', '2021-11-14 21:33:08'),
('46cb072d', 'lola_bunny', 'Lola', 'Boony', 'a88fb6c7f501d4d7', '1998-12-12', NULL, NULL, NULL, NULL, 'lola@bunny.cutemail.com', 'default.dat', '00000000', '[\"17ac03a4\",\"49ec0702\"]', '{\"color\":\"F\",\"shape\":\"F\"}', '096814f5ff154007532cfb60ea509863', '2021-10-21 00:00:00'),
('49ec0702', 'allium_dais', 'Allium', 'Dais', '1462c3d71b904f52', '2000-06-09', NULL, NULL, NULL, '[\"36b1062a\"]', 'alliumdais@email.com', 'default.dat', '12121212', '[\"17ac03a4\",\"46cb072d\"]', '{\"color\":\"D\",\"shape\":\"D\"}', '2d877b62e8a1ccd0a328dee2f177c47d', '2021-09-24 00:00:00'),
('4edd077f', 'virtualriot', 'Virtual', 'Riot', 'bc84fe259c3cade8', '2000-03-04', 'The musician VR', 0, NULL, NULL, 'vr@riot.com', 'default.dat', '0', NULL, '{\"color\":\"D\",\"shape\":\"E\"}', '717e64cd7109d33d4b5c9f285d144789', '2021-11-14 21:38:19');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbactivities`
--
ALTER TABLE `tbactivities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbapikeys`
--
ALTER TABLE `tbapikeys`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `APIKEY` (`apikey`);

--
-- Indexes for table `tbhashtags`
--
ALTER TABLE `tbhashtags`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `HASHTAG` (`tagName`);

--
-- Indexes for table `tblists`
--
ALTER TABLE `tblists`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbquizzes`
--
ALTER TABLE `tbquizzes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbroles`
--
ALTER TABLE `tbroles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbsongs`
--
ALTER TABLE `tbsongs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `SONGURL` (`songURL`);

--
-- Indexes for table `tbusers`
--
ALTER TABLE `tbusers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `USERNAME` (`username`),
  ADD UNIQUE KEY `EMAIL` (`email`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
