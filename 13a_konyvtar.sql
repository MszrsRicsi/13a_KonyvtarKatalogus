-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Okt 22. 00:06
-- Kiszolgáló verziója: 10.4.25-MariaDB
-- PHP verzió: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `13a_konyvtar`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `authors`
--

CREATE TABLE `authors` (
  `id` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `name` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `birth` varchar(15) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `authors`
--

INSERT INTO `authors` (`id`, `name`, `birth`) VALUES
('ebb4a7eb-9afd-40e1-83a0-f45f31e0a2e6', 'Majom', '2024-10-10'),
('fd2f63aa-f480-4b94-94ff-c10c31b4ef06', 'Paraszt', '2024-10-31');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `books`
--

CREATE TABLE `books` (
  `id` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `title` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `releaseDate` varchar(15) COLLATE utf8_hungarian_ci NOT NULL,
  `ISBN` varchar(17) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `books`
--

INSERT INTO `books` (`id`, `title`, `releaseDate`, `ISBN`) VALUES
('04c14632-052b-409f-8c13-c1fc09e6889d', 'Paraszt könyve', '2024-10-19', '53453245235'),
('1f6453c1-8657-4b79-b2e1-2350c2d11672', 'hsghs', '2024-10-17', 'fashgashsg'),
('25ea6766-7f3a-41a8-901c-fcec6ad770ee', 'hdhsdfhshsdhsh', '2024-10-26', 'hsdhshd'),
('2d15004c-c543-4e57-8792-d97b1529d74b', 'hgsgasdgs', '2024-10-17', 'afasfaf'),
('35bb2b5d-9589-4788-8a36-0ed3836471d1', 'ashgsahgsh', '2024-10-09', 'hsdhshdsh'),
('41ecf85b-ae1b-4096-9549-d787600a8d81', 'afgas', '2024-10-28', 'fasf'),
('5c052fbc-8f4c-4a74-a5ba-4f6ba081b2f3', 'gasgsghsh', '2024-10-22', 'hsdhshsdh'),
('70234b29-5d90-4595-9d02-cf51fd69f5b1', 'gagagasg', '2024-11-01', 'asgasg'),
('7cc3a97d-c7f5-4da5-bb24-8194a3e746af', 'asfasfasf', '2024-10-10', 'sgsdgsdg'),
('8ad96c6e-5961-469a-9d44-4c11f34fd3bd', 'hhsdh', '2024-10-30', 'hsdhdshfd'),
('8f5ab97d-200b-441c-9b2f-02badc058496', 'sadda', '2024-10-10', 'sdasd'),
('95392573-9466-49cc-8afe-29ca14d49a0c', 'fgasfg', '2024-10-30', 'asfasf'),
('bb3aa09d-43f8-4a6f-aac8-1bacef72ed99', 'hgsas', '2024-10-17', 'afgagag'),
('bd909d6a-5042-4546-b131-816a450c18f1', 'Kecske könyve', '2024-10-16', '5623212'),
('c0ff6a82-2252-4581-9008-d62dd08ec657', 'Majom könyve', '2024-10-10', '52352376457568'),
('d5f108fd-f974-41a8-95b2-052551801973', 'sgsgsgsgsgsgsdgsgsgsdgsg', '2024-10-16', 'gsgasgsg'),
('fe148e62-512e-4ac6-89f5-1793eb740dd6', 'gsdgsdg', '2024-10-16', 'agaga');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `book_authors`
--

CREATE TABLE `book_authors` (
  `id` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `authorID` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `bookID` varchar(40) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

--
-- A tábla adatainak kiíratása `book_authors`
--

INSERT INTO `book_authors` (`id`, `authorID`, `bookID`) VALUES
('926e3b24-30c5-470d-80f4-9ec9a88ee45c', 'fd2f63aa-f480-4b94-94ff-c10c31b4ef06', '5c052fbc-8f4c-4a74-a5ba-4f6ba081b2f3'),
('ac939ea2-38bf-45d7-a95f-5ccc95d8d951', 'fd2f63aa-f480-4b94-94ff-c10c31b4ef06', '25ea6766-7f3a-41a8-901c-fcec6ad770ee'),
('b70c8984-ebb9-4fa1-95ee-6dcd56d71f5c', 'ebb4a7eb-9afd-40e1-83a0-f45f31e0a2e6', '04c14632-052b-409f-8c13-c1fc09e6889d');

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `authors`
--
ALTER TABLE `authors`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `books`
--
ALTER TABLE `books`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `book_authors`
--
ALTER TABLE `book_authors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `authorID` (`authorID`),
  ADD KEY `bookID` (`bookID`);

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `book_authors`
--
ALTER TABLE `book_authors`
  ADD CONSTRAINT `book_authors_ibfk_1` FOREIGN KEY (`authorID`) REFERENCES `authors` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `book_authors_ibfk_2` FOREIGN KEY (`bookID`) REFERENCES `books` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
