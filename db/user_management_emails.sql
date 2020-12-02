CREATE DATABASE  IF NOT EXISTS `user_management` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `user_management`;
-- MySQL dump 10.13  Distrib 8.0.17, for macos10.14 (x86_64)
--
-- Host: localhost    Database: user_management
-- ------------------------------------------------------
-- Server version	8.0.17

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `emails`
--

DROP TABLE IF EXISTS `emails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emails` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `header` varchar(500) DEFAULT NULL,
  `body` varchar(1000) DEFAULT NULL,
  `incident_id` int(11) DEFAULT NULL,
  `date` datetime DEFAULT NULL,
  `status` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_INCIDENTS_idx` (`incident_id`),
  CONSTRAINT `FK_INCIDENTS` FOREIGN KEY (`incident_id`) REFERENCES `incidents` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emails`
--

LOCK TABLES `emails` WRITE;
/*!40000 ALTER TABLE `emails` DISABLE KEYS */;
INSERT INTO `emails` VALUES (1,'this is a header','this is a body',4,'2019-10-18 15:30:12','Success'),(2,'this is a header','this is a body',6,'2019-10-18 15:30:12','Success'),(3,'this is a header','this is a body',14,'2019-10-18 15:30:12','Success'),(4,'this is a header','hahah',4,'2019-10-18 15:42:03','Success'),(5,'this is a header','hahah',6,'2019-10-18 15:42:03','Success'),(6,'this is a header','hahah',14,'2019-10-18 15:42:03','Success'),(7,'this is a header','t',1,'2020-10-06 22:02:44','Success'),(8,'this is a header','t',2,'2020-10-06 22:02:44','Success'),(9,'3rd one','this is a body',1,'2020-10-06 22:05:38','Success'),(10,'3rd one','this is a body',3,'2020-10-06 22:05:38','Success'),(11,'3rd one','this is a body',4,'2020-10-06 22:05:38','Success'),(12,'3rd one','this is a body',6,'2020-10-06 22:05:38','Success'),(13,'3rd one','this is a body',14,'2020-10-06 22:05:38','Success'),(14,'this is a reminder email','this is content',1,'2020-10-08 14:16:02','Success'),(15,'this is a reminder email','this is content',3,'2020-10-08 14:16:02','Success'),(16,'this is a reminder email','this is content',4,'2020-10-08 14:16:02','Success'),(17,'this is a reminder email','this is content',6,'2020-10-08 14:16:02','Success'),(18,'this is a reminder email','this is content',14,'2020-10-08 14:16:02','Success');
/*!40000 ALTER TABLE `emails` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-03 10:15:30
