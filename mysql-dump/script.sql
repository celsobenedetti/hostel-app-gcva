-- MySQL dump 10.13  Distrib 8.0.26, for Linux (x86_64)
--
-- Host: localhost    Database: tt2_preparacao
-- ------------------------------------------------------
-- Server version	8.0.26

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
-- Database define

use myDB;

--
-- Table structure for table `estrada`
--

DROP TABLE IF EXISTS `estrada`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estrada` (
  `cod_est` int NOT NULL AUTO_INCREMENT,
  `nome_est` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`cod_est`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estrada`
--

LOCK TABLES `estrada` WRITE;
/*!40000 ALTER TABLE `estrada` DISABLE KEYS */;
INSERT INTO `estrada` VALUES (1,'Rotas das Águas');
/*!40000 ALTER TABLE `estrada` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `localidade`
--

DROP TABLE IF EXISTS `localidade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `localidade` (
  `cod_loc` int NOT NULL AUTO_INCREMENT,
  `nome_loc` varchar(50) NOT NULL,
  `cod_loc_abrang` int DEFAULT NULL,
  `sigla_uf` char(2) NOT NULL,
  PRIMARY KEY (`cod_loc`),
  UNIQUE KEY `sigla_uf` (`sigla_uf`),
  KEY `cod_loc_abrang` (`cod_loc_abrang`),
  CONSTRAINT `localidade_ibfk_1` FOREIGN KEY (`sigla_uf`) REFERENCES `uf` (`sigla_uf`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `localidade_ibfk_2` FOREIGN KEY (`cod_loc_abrang`) REFERENCES `localidade` (`cod_loc`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `localidade`
--

LOCK TABLES `localidade` WRITE;
/*!40000 ALTER TABLE `localidade` DISABLE KEYS */;
INSERT INTO `localidade` VALUES (2,'Getulio Vargas',NULL,'MG'),(4,'Duque',NULL,'SP'),(7,'JK',NULL,'ES'),(9,'Diamantina',2,'PR');
/*!40000 ALTER TABLE `localidade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trecho`
--

DROP TABLE IF EXISTS `trecho`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trecho` (
  `cod_est` int NOT NULL,
  `cod_loc_ini` int NOT NULL,
  `cod_loc_fim` int NOT NULL,
  `distancia` int DEFAULT '0',
  PRIMARY KEY (`cod_est`,`cod_loc_ini`,`cod_loc_fim`),
  KEY `cod_loc_ini` (`cod_loc_ini`),
  KEY `cod_loc_fim` (`cod_loc_fim`),
  CONSTRAINT `trecho_ibfk_1` FOREIGN KEY (`cod_est`) REFERENCES `estrada` (`cod_est`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `trecho_ibfk_2` FOREIGN KEY (`cod_loc_ini`) REFERENCES `localidade` (`cod_loc`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `trecho_ibfk_3` FOREIGN KEY (`cod_loc_fim`) REFERENCES `localidade` (`cod_loc`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `trecho_chk_1` CHECK ((`distancia` >= 0))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trecho`
--

LOCK TABLES `trecho` WRITE;
/*!40000 ALTER TABLE `trecho` DISABLE KEYS */;
INSERT INTO `trecho` VALUES (1,2,4,100),(1,4,7,150);
/*!40000 ALTER TABLE `trecho` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uf`
--

DROP TABLE IF EXISTS `uf`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uf` (
  `sigla_uf` char(2) NOT NULL,
  `nome_uf` varchar(30) NOT NULL,
  PRIMARY KEY (`sigla_uf`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uf`
--

LOCK TABLES `uf` WRITE;
/*!40000 ALTER TABLE `uf` DISABLE KEYS */;
INSERT INTO `uf` VALUES ('ES','Espirito Sa to'),('MG','Mi as Gerais'),('PA','Pará'),('PR','Para á'),('RJ','Rio de Ja eiro'),('SP','Sao paulo');
/*!40000 ALTER TABLE `uf` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-22 21:35:15
