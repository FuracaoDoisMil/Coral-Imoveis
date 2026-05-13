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
INSERT INTO `carro` VALUES (1,'Fiat Uno','ABC1234','disponivel'),(2,'Toyota Corolla','XYZ5678','indisponivel'),(3,'Honda Civic','DEF4321','disponivel');
/*!40000 ALTER TABLE `carro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clientes`
--

DROP TABLE IF EXISTS `clientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `clientes` (
  `id_cliente` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(50) NOT NULL,
  `sobrenome` varchar(50) DEFAULT NULL,
  `sexo` char(1) NOT NULL,
  `CPF` char(14) NOT NULL,
  `dt_nascimento` date NOT NULL,
  `email` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `telefone` varchar(20) DEFAULT NULL,
  `situacao` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `CPF` (`CPF`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Lucas','Almeida','M','444.555.666-77','1998-06-20','lucas@email.com','123456','(44)99999-4444','ativo'),(2,'Juliana','Santos','F','888.777.666-55','1995-02-14','juliana@email.com','123456','(44)98888-5555','ativo'),(3,'Marcos','Ferreira','M','111.999.888-77','1987-09-09','marcos@email.com','123456','(44)97777-6666','inativo');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contratos`
--

DROP TABLE IF EXISTS `contratos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contratos` (
  `id_contrato` int NOT NULL AUTO_INCREMENT,
  `id_venda` int DEFAULT NULL,
  `id_locacao` int DEFAULT NULL,
  `id_funcionario` int NOT NULL,
  `tipo_contrato` enum('venda','locacao') NOT NULL,
  `status` enum('ativo','encerrado','cancelado') NOT NULL,
  `observacoes` text,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_contrato`),
  KEY `id_venda` (`id_venda`),
  KEY `id_locacao` (`id_locacao`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`id_venda`) REFERENCES `vendas` (`id_venda`),
  CONSTRAINT `contratos_ibfk_2` FOREIGN KEY (`id_locacao`) REFERENCES `locacoes` (`id_locacao`),
  CONSTRAINT `contratos_ibfk_3` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`),
  CONSTRAINT `contratos_chk_1` CHECK ((((`id_venda` is not null) and (`id_locacao` is null)) or ((`id_locacao` is not null) and (`id_venda` is null))))
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contratos`
--

LOCK TABLES `contratos` WRITE;
/*!40000 ALTER TABLE `contratos` DISABLE KEYS */;
INSERT INTO `contratos` VALUES (1,1,NULL,3,'venda','ativo','Contrato de venda aprovado pela gerencia','2026-05-09 18:00:02'),(2,NULL,1,3,'locacao','ativo','Contrato de locacao anual assinado','2026-05-09 18:00:02'),(3,NULL,2,3,'locacao','encerrado','Contrato encerrado apos termino da locacao','2026-05-09 18:00:02');
/*!40000 ALTER TABLE `contratos` ENABLE KEYS */;
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
  `email` varchar(50) NOT NULL,
  `senha` varchar(255) NOT NULL,
  `salario` decimal(10,2) NOT NULL,
  `situacao` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  `CNH_numero` varchar(20) DEFAULT NULL,
  `CNH_categoria` varchar(3) DEFAULT NULL,
  `CNH_validade` date DEFAULT NULL,
  PRIMARY KEY (`id_funcionario`),
  UNIQUE KEY `CPF` (`CPF`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Corretor','Joao','Silva','M','123.456.789-00','1990-05-10','joao@email.com','123456',3500.00,'ativo','123456789','B','2030-05-10'),(2,'Secretario','Maria','Souza','F','987.654.321-00','1985-08-20','maria@email.com','123456',2500.00,'ativo',NULL,NULL,NULL),(3,'Gerente','Carlos','Oliveira','M','111.222.333-44','1980-03-15','carlos@email.com','123456',7000.00,'ativo','999888777','AB','2031-03-15');
/*!40000 ALTER TABLE `funcionarios` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `imagens_imovel`
--

DROP TABLE IF EXISTS `imagens_imovel`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `imagens_imovel` (
  `id_imagem` int NOT NULL AUTO_INCREMENT,
  `id_imovel` int NOT NULL,
  `caminho_imagem` varchar(255) NOT NULL,
  PRIMARY KEY (`id_imagem`),
  KEY `id_imovel` (`id_imovel`),
  CONSTRAINT `imagens_imovel_ibfk_1` FOREIGN KEY (`id_imovel`) REFERENCES `imoveis` (`id_imovel`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagens_imovel`
--

LOCK TABLES `imagens_imovel` WRITE;
/*!40000 ALTER TABLE `imagens_imovel` DISABLE KEYS */;
/*!40000 ALTER TABLE `imagens_imovel` ENABLE KEYS */;
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
INSERT INTO `imoveis` VALUES (1,1,1,'Casa Jardim','Casa','87300-000','Rua das Flores','123',NULL,'Centro','Campo Mourao','PR','disponivel',1500.00,350000.00,3,1,2,200,1200.00,'Casa ampla','2026-05-09 18:00:01'),(2,2,1,'Apartamento Central','Apartamento','87300-111','Av. Irmaos Pereira','456','Ap 202','Centro','Campo Mourao','PR','alugado',2200.00,500000.00,2,1,1,120,800.00,'Apartamento moderno','2026-05-09 18:00:01'),(3,3,1,'Chacara Boa Vista','Chacara','87300-222','Estrada Rural','S/N',NULL,'Zona Rural','Campo Mourao','PR','vendido',NULL,800000.00,4,2,4,1000,3000.00,'Area rural','2026-05-09 18:00:01');
/*!40000 ALTER TABLE `imoveis` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `locacoes`
--

DROP TABLE IF EXISTS `locacoes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `locacoes` (
  `id_locacao` int NOT NULL AUTO_INCREMENT,
  `id_imovel` int NOT NULL,
  `id_cliente` int NOT NULL,
  `id_funcionario` int NOT NULL,
  `valor_aluguel` decimal(10,2) NOT NULL,
  `forma_pagamento` varchar(20) NOT NULL,
  `data_entrada` date NOT NULL,
  `data_saida` date NOT NULL,
  `observacoes` text,
  `alocado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_locacao`),
  KEY `id_imovel` (`id_imovel`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `locacoes_ibfk_1` FOREIGN KEY (`id_imovel`) REFERENCES `imoveis` (`id_imovel`),
  CONSTRAINT `locacoes_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `locacoes_ibfk_3` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locacoes`
--

LOCK TABLES `locacoes` WRITE;
/*!40000 ALTER TABLE `locacoes` DISABLE KEYS */;
INSERT INTO `locacoes` VALUES (1,2,2,1,2200.00,'boleto','2026-05-01','2027-05-01','Contrato anual','2026-05-09 18:00:02'),(2,1,1,1,1500.00,'pix','2026-06-01','2026-07-01','Locacao mensal','2026-05-09 18:00:02');
/*!40000 ALTER TABLE `locacoes` ENABLE KEYS */;
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
INSERT INTO `proprietarios` VALUES (1,'Ana','Pereira','F','222.333.444-55',NULL,'1992-07-12','ana@email.com','ativo'),(2,'Roberto','Lima','M','555.666.777-88',NULL,'1975-11-03','roberto@email.com','ativo'),(3,'Fernanda','Costa','F','999.888.777-66',NULL,'1988-01-25','fernanda@email.com','inativo');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone`
--

LOCK TABLES `telefone` WRITE;
/*!40000 ALTER TABLE `telefone` DISABLE KEYS */;
INSERT INTO `telefone` VALUES (1,'(44)99999-1111',1,NULL),(2,'(44)98888-2222',2,NULL),(3,'(44)97777-3333',NULL,1);
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
  `data_retorno` date DEFAULT NULL,
  `hora_retorno` time DEFAULT NULL,
  `observacoes` text,
  PRIMARY KEY (`id_registro`),
  KEY `id_funcionario` (`id_funcionario`),
  KEY `id_carro` (`id_carro`),
  CONSTRAINT `uso_do_carro_ibfk_1` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`),
  CONSTRAINT `uso_do_carro_ibfk_2` FOREIGN KEY (`id_carro`) REFERENCES `carro` (`id_carro`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uso_do_carro`
--

LOCK TABLES `uso_do_carro` WRITE;
/*!40000 ALTER TABLE `uso_do_carro` DISABLE KEYS */;
INSERT INTO `uso_do_carro` VALUES (1,1,1,'2026-05-01','08:00:00','2026-05-01','18:00:00','Visita a clientes'),(2,2,2,'2026-05-02','09:30:00','2026-05-02','17:00:00','Entrega de documentos'),(3,1,3,'2026-05-03','10:00:00',NULL,NULL,'Carro em uso');
/*!40000 ALTER TABLE `uso_do_carro` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vendas`
--

DROP TABLE IF EXISTS `vendas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vendas` (
  `id_venda` int NOT NULL AUTO_INCREMENT,
  `id_imovel` int NOT NULL,
  `id_cliente` int NOT NULL,
  `id_funcionario` int NOT NULL,
  `valor_venda` decimal(10,2) NOT NULL,
  `forma_pagamento` varchar(20) NOT NULL,
  `observacoes` text,
  `vendido_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_venda`),
  UNIQUE KEY `id_imovel` (`id_imovel`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`id_imovel`) REFERENCES `imoveis` (`id_imovel`),
  CONSTRAINT `vendas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `vendas_ibfk_3` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (1,3,1,1,800000.00,'financiamento','Venda aprovada','2026-05-09 18:00:02'),(2,1,1,1,350.00,'financiamento','Venda aprovada pelo banco','2026-05-10 17:45:31');
/*!40000 ALTER TABLE `vendas` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visitas`
--

DROP TABLE IF EXISTS `visitas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visitas` (
  `id_visita` int NOT NULL AUTO_INCREMENT,
  `id_cliente` int NOT NULL,
  `id_imovel` int NOT NULL,
  `id_funcionario` int NOT NULL,
  `data_visita` date NOT NULL,
  `hora_visita` time NOT NULL,
  `status` enum('visitado','aguardando visita','cancelado') NOT NULL,
  `observacoes` text,
  PRIMARY KEY (`id_visita`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_imovel` (`id_imovel`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `visitas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `visitas_ibfk_2` FOREIGN KEY (`id_imovel`) REFERENCES `imoveis` (`id_imovel`),
  CONSTRAINT `visitas_ibfk_3` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitas`
--

LOCK TABLES `visitas` WRITE;
/*!40000 ALTER TABLE `visitas` DISABLE KEYS */;
INSERT INTO `visitas` VALUES (1,1,1,1,'2026-05-10','14:00:00','aguardando visita','Primeira visita'),(2,2,2,1,'2026-05-08','09:30:00','visitado','Cliente gostou'),(3,3,3,1,'2026-05-12','16:00:00','cancelado','Cliente cancelou');
/*!40000 ALTER TABLE `visitas` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-10 14:53:42
