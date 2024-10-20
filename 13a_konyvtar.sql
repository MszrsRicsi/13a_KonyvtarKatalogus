-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Gép: 127.0.0.1
-- Létrehozás ideje: 2024. Okt 20. 23:12
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
('46363sfsdfsdf346', 'Majom', '2024-10-12'),
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
('bd909d6a-5042-4546-b131-816a450c18f1', 'Kecske könyve', '2024-10-16', '5623212'),
('c0ff6a82-2252-4581-9008-d62dd08ec657', 'Majom könyve', '2024-10-10', '52352376457568');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `book_authors`
--

CREATE TABLE `book_authors` (
  `authorID` varchar(40) COLLATE utf8_hungarian_ci NOT NULL,
  `bookID` varchar(40) COLLATE utf8_hungarian_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;

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
