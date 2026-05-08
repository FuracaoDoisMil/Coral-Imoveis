-- MySQL dump 10.13  Distrib 8.0.45, for Linux (x86_64)
--
-- Host: localhost    Database: imobiliaria
-- ------------------------------------------------------
-- Server version	8.0.45-0ubuntu0.24.04.1

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

--
-- Table structure for table `carro`
--

DROP TABLE IF EXISTS `carro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `carro` (
  `id_carro` int NOT NULL AUTO_INCREMENT,
  `modelo_carro` varchar(50) NOT NULL,
  `placa_carro` varchar(8) NOT NULL,
  `situacao` enum('disponivel','indisponivel') NOT NULL,
  PRIMARY KEY (`id_carro`),
  UNIQUE KEY `placa_carro` (`placa_carro`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carro`
--

LOCK TABLES `carro` WRITE;
/*!40000 ALTER TABLE `carro` DISABLE KEYS */;
INSERT INTO `carro` VALUES (1,'Fiat Uno','ABC1234','disponivel'),(2,'Toyota Corolla','XYZ5678','indisponivel'),(3,'Toyota Corolla','XYZ9K88','disponivel');
/*!40000 ALTER TABLE `carro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcionarios`
--

DROP TABLE IF EXISTS `funcionarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcionarios` (
  `id_funcionario` int NOT NULL AUTO_INCREMENT,
  `tipo_funcionario` enum('Corretor','Secretario','Gerente') NOT NULL,
  `nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) NOT NULL,
  `sexo` char(1) NOT NULL,
  `CPF` char(14) NOT NULL,
  `dt_nascimento` date NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `salario` decimal(10,2) NOT NULL,
  `situacao` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  `CNH_numero` varchar(20) DEFAULT NULL,
  `CNH_categoria` varchar(3) DEFAULT NULL,
  `CNH_validade` date DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`),
  UNIQUE KEY `CPF` (`CPF`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Corretor','João','Silva','M','123.456.789-00','1990-05-10','joao@email.com',3000.00,'ativo',NULL,NULL,NULL),(2,'Secretario','Maria','Souza','F','987.654.321-00','1985-08-20','maria@email.com',2500.00,'ativo',NULL,NULL,NULL),(6,'Corretor','Fernanda','Oliveira','F','997.654.321-00','1995-08-20','fernanda.oliveira@email.com',3500.00,'ativo','1234567890','B','2030-10-15');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imoveis`
--

DROP TABLE IF EXISTS `imoveis`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imoveis` (
  `id_imovel` int NOT NULL AUTO_INCREMENT,
  `id_proprietario` int NOT NULL,
  `id_funcionario` int NOT NULL,
  `nome_imovel` varchar(200) NOT NULL,
  `tipo` varchar(50) NOT NULL,
  `cep` varchar(10) NOT NULL,
  `endereco` varchar(150) NOT NULL,
  `numero` varchar(10) NOT NULL,
  `complemento` varchar(50) DEFAULT NULL,
  `bairro` varchar(50) NOT NULL,
  `cidade` varchar(50) NOT NULL,
  `estado` varchar(2) NOT NULL,
  `status` enum('disponivel','alugado','vendido') NOT NULL,
  `valor_locacao` decimal(10,2) DEFAULT NULL,
  `valor_venda` decimal(10,2) DEFAULT NULL,
  `quartos` int DEFAULT NULL,
  `suites` int DEFAULT NULL,
  `vagas_garagem` int DEFAULT NULL,
  `area` float DEFAULT NULL,
  `iptu` decimal(10,2) DEFAULT NULL,
  `observacoes` text,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_imovel`),
  KEY `id_proprietario` (`id_proprietario`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `imoveis_ibfk_1` FOREIGN KEY (`id_proprietario`) REFERENCES `proprietarios` (`id_proprietario`),
  CONSTRAINT `imoveis_ibfk_2` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imoveis`
--

LOCK TABLES `imoveis` WRITE;
/*!40000 ALTER TABLE `imoveis` DISABLE KEYS */;
INSERT INTO `imoveis` VALUES (1,1,1,'Casa Jardim do Lago','Casa','87300-000','Rua das Flores','1223',NULL,'Centro','Campo Mourão','PR','disponivel',1000.00,NULL,3,1,2,200,NULL,NULL,'2026-05-01 19:12:17'),(3,2,1,'Casa Jardim dos cntos','Casa','87300-000','Rua das Flores','1223',NULL,'Centro','Campo Mourão','PR','disponivel',1000.00,NULL,3,1,2,200,NULL,NULL,'2026-05-08 02:50:19');
/*!40000 ALTER TABLE `imoveis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `proprietarios`
--

DROP TABLE IF EXISTS `proprietarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `proprietarios` (
  `id_proprietario` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) NOT NULL,
  `sexo` char(1) NOT NULL,
  `CPF` char(14) DEFAULT NULL,
  `CNPJ` char(18) DEFAULT NULL,
  `dt_nascimento` date DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `situacao` enum('ativo','inativo') NOT NULL,
  PRIMARY KEY (`id_proprietario`),
  UNIQUE KEY `CPF` (`CPF`),
  UNIQUE KEY `CNPJ` (`CNPJ`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proprietarios`
--

LOCK TABLES `proprietarios` WRITE;
/*!40000 ALTER TABLE `proprietarios` DISABLE KEYS */;
INSERT INTO `proprietarios` VALUES (1,'Ana','Pereira','F','222.333.444-55',NULL,'1992-07-12','ana@email.com','ativo'),(2,'Carlos Eduardo','Silva','M','123.496.789-10',NULL,'1980-05-12','carlos.eduardo@email.com','inativo'),(3,'Carlos','Silva','M','123.456.789-10',NULL,'1980-05-12','carlos.silva@email.com','ativo');
/*!40000 ALTER TABLE `proprietarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `telefone`
--

DROP TABLE IF EXISTS `telefone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `telefone` (
  `id_telefone` int NOT NULL AUTO_INCREMENT,
  `numero` varchar(20) NOT NULL,
  `id_funcionario` int DEFAULT NULL,
  `id_proprietario` int DEFAULT NULL,
  PRIMARY KEY (`id_telefone`),
  KEY `id_proprietario` (`id_proprietario`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `telefone_ibfk_1` FOREIGN KEY (`id_proprietario`) REFERENCES `proprietarios` (`id_proprietario`) ON DELETE CASCADE,
  CONSTRAINT `telefone_ibfk_2` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`) ON DELETE CASCADE,
  CONSTRAINT `telefone_chk_1` CHECK ((((`id_funcionario` is not null) and (`id_proprietario` is null)) or ((`id_funcionario` is null) and (`id_proprietario` is not null))))
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone`
--

LOCK TABLES `telefone` WRITE;
/*!40000 ALTER TABLE `telefone` DISABLE KEYS */;
INSERT INTO `telefone` VALUES (1,'(44) 99999-1111',1,NULL),(2,'(44) 98888-2222',NULL,1);
/*!40000 ALTER TABLE `telefone` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `uso_do_carro`
--

DROP TABLE IF EXISTS `uso_do_carro`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `uso_do_carro` (
  `id_registro` int NOT NULL AUTO_INCREMENT,
  `id_funcionario` int NOT NULL,
  `id_carro` int NOT NULL,
  `data_saida` date NOT NULL,
  `hora_saida` time NOT NULL,
  `data_retorno` date NOT NULL,
  `hora_retorno` time NOT NULL,
  `observacoes` text,
  PRIMARY KEY (`id_registro`),
  KEY `id_funcionario` (`id_funcionario`),
  KEY `id_carro` (`id_carro`),
  CONSTRAINT `uso_do_carro_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`),
  CONSTRAINT `uso_do_carro_ibfk_2` FOREIGN KEY (`id_carro`) REFERENCES `carro` (`id_carro`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uso_do_carro`
--

LOCK TABLES `uso_do_carro` WRITE;
/*!40000 ALTER TABLE `uso_do_carro` DISABLE KEYS */;
/*!40000 ALTER TABLE `uso_do_carro` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-08 12:52:13
