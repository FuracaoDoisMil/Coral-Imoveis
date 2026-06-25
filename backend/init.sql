-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: localhost    Database: Imobiliaria
-- ------------------------------------------------------
-- Server version	8.0.46-0ubuntu0.24.04.2

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carro`
--

LOCK TABLES `carro` WRITE;
/*!40000 ALTER TABLE `carro` DISABLE KEYS */;
INSERT INTO `carro` VALUES (1,'Onix','ABC1D23','disponivel'),(2,'HB20','DEF2G34','disponivel'),(3,'Corolla','HIJ3K45','indisponivel'),(4,'Civic','LMN4O56','disponivel'),(5,'Tracker','PQR5S67','disponivel'),(6,'Compass','TUV6W78','indisponivel'),(7,'Gol','XYZ7A89','disponivel'),(8,'Argo','BCD8E90','disponivel'),(9,'Creta','FGH9I01','disponivel'),(10,'Renegade','JKL0M12','indisponivel');
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
  `situacao` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  PRIMARY KEY (`id_cliente`),
  UNIQUE KEY `CPF` (`CPF`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Bruno','Martins','M','121.121.121-12','1999-02-10','bruno@gmail.com','123','ativo'),(2,'Camila','Dias','F','131.131.131-13','1997-04-11','camila@gmail.com','123','ativo'),(3,'Diego','Santos','M','141.141.141-14','1988-01-05','diego@gmail.com','123','ativo'),(4,'Elaine','Ferreira','F','151.151.151-15','1990-09-22','elaine@gmail.com','123','ativo'),(5,'Fabio','Gomes','M','161.161.161-16','1992-03-19','fabio@gmail.com','123','ativo'),(6,'Gabriela','Ribeiro','F','171.171.171-17','2000-07-01','gabriela@gmail.com','123','ativo'),(7,'Henrique','Alves','M','181.181.181-18','1996-08-08','henrique@gmail.com','123','ativo'),(8,'Isabela','Teixeira','F','191.191.191-19','1994-12-12','isabela@gmail.com','123','ativo'),(9,'Jean','Barbosa','M','202.202.202-20','1987-06-25','jean@gmail.com','123','ativo'),(10,'Karen','Moreira','F','212.212.212-21','1998-05-30','karen@gmail.com','123','ativo');
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
  `status` enum('aguardando_aprovacao','aprovado','rejeitado') NOT NULL,
  `observacoes` text,
  `criado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_contrato`),
  KEY `id_venda` (`id_venda`),
  KEY `id_locacao` (`id_locacao`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `contratos_ibfk_1` FOREIGN KEY (`id_venda`) REFERENCES `vendas` (`id_venda`) ON DELETE CASCADE,
  CONSTRAINT `contratos_ibfk_2` FOREIGN KEY (`id_locacao`) REFERENCES `locacoes` (`id_locacao`) ON DELETE CASCADE,
  CONSTRAINT `contratos_ibfk_3` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`),
  CONSTRAINT `contratos_chk_1` CHECK ((((`id_venda` is not null) and (`id_locacao` is null)) or ((`id_locacao` is not null) and (`id_venda` is null))))
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contratos`
--

LOCK TABLES `contratos` WRITE;
/*!40000 ALTER TABLE `contratos` DISABLE KEYS */;
INSERT INTO `contratos` VALUES (1,1,NULL,1,'venda','aprovado','Contrato venda','2026-06-25 00:49:05'),(2,NULL,1,2,'locacao','rejeitado','Contrato locação 1','2026-06-25 00:49:05'),(3,NULL,2,3,'locacao','aguardando_aprovacao','Contrato locação 2','2026-06-25 00:49:05');
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Corretor','Joao','Silva','M','111.111.111-11','1990-05-10','joao@imob.com','123',3500.00,'ativo','123456789','B','2030-01-01'),(2,'Secretario','Maria','Oliveira','F','222.222.222-22','1992-03-15','maria@imob.com','123',2800.00,'ativo',NULL,NULL,NULL),(3,'Gerente','Carlos','Souza','M','333.333.333-33','1985-07-20','carlos@imob.com','123',8000.00,'ativo','987654321','B','2029-05-10'),(4,'Corretor','Ana','Pereira','F','444.444.444-44','1995-09-12','ana@imob.com','123',4000.00,'ativo','555555555','AB','2031-03-15'),(5,'Corretor','Lucas','Fernandes','M','555.555.555-55','1998-11-25','lucas@imob.com','123',3200.00,'ativo','666666666','B','2028-06-20'),(6,'Secretario','Juliana','Costa','F','666.666.666-66','1991-08-14','juliana@imob.com','123',2900.00,'ativo',NULL,NULL,NULL),(7,'Corretor','Pedro','Almeida','M','777.777.777-77','1989-04-30','pedro@imob.com','123',4100.00,'ativo','777777777','A','2030-09-09'),(8,'Gerente','Fernanda','Lima','F','888.888.888-88','1980-12-01','fernanda@imob.com','123',9500.00,'ativo','888888888','B','2032-02-02'),(9,'Corretor','Rafael','Mendes','M','999.999.999-99','1993-06-17','rafael@imob.com','123',3600.00,'ativo','999999999','AB','2029-12-12'),(10,'Secretario','Patricia','Rocha','F','101.101.101-10','1994-10-08','patricia@imob.com','123',3000.00,'ativo',NULL,NULL,NULL);
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
  `caminho_imagem` varchar(255) DEFAULT NULL,
  `caminho_imagem_capa` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_imagem`),
  KEY `id_imovel` (`id_imovel`),
  CONSTRAINT `imagens_imovel_ibfk_1` FOREIGN KEY (`id_imovel`) REFERENCES `imoveis` (`id_imovel`) ON DELETE CASCADE,
  CONSTRAINT `imagens_imovel_chk_1` CHECK ((((`caminho_imagem` is not null) and (`caminho_imagem_capa` is null)) or ((`caminho_imagem_capa` is not null) and (`caminho_imagem` is null))))
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
  CONSTRAINT `imoveis_ibfk_2` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`),
  CONSTRAINT `imoveis_chk_1` CHECK (((`valor_venda` is not null) or (`valor_locacao` is not null)))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imoveis`
--

LOCK TABLES `imoveis` WRITE;
/*!40000 ALTER TABLE `imoveis` DISABLE KEYS */;
INSERT INTO `imoveis` VALUES (1,1,1,'Casa Centro','Casa','85660-000','Rua A','100',NULL,'Centro','Dois Vizinhos','PR','disponivel',1800.00,350000.00,3,1,2,120,1500.00,'Casa ampla','2026-06-25 00:49:04'),(2,2,2,'Apartamento Luxo','Apartamento','85660-000','Rua B','200','Ap 301','Centro','Dois Vizinhos','PR','disponivel',2500.00,500000.00,2,1,1,90,2000.00,'Apartamento moderno','2026-06-25 00:49:04'),(3,3,1,'Sala Comercial','Comercial','85660-000','Rua C','50',NULL,'Industrial','Dois Vizinhos','PR','alugado',3200.00,NULL,NULL,NULL,2,70,1000.00,'Ótima localização','2026-06-25 00:49:04'),(4,4,4,'Chacara Boa Vista','Chacara','85660-000','Linha Interior','SN',NULL,'Rural','Dois Vizinhos','PR','disponivel',NULL,800000.00,4,2,3,500,2500.00,'Área rural','2026-06-25 00:49:04'),(5,5,5,'Kitnet Universitaria','Kitnet','85660-000','Rua D','15',NULL,'Centro Norte','Dois Vizinhos','PR','disponivel',900.00,120000.00,1,0,0,35,500.00,'Próxima faculdade','2026-06-25 00:49:04'),(6,6,3,'Sobrado Familiar','Sobrado','85660-000','Rua E','88',NULL,'Jardim','Dois Vizinhos','PR','vendido',NULL,450000.00,3,1,2,150,1800.00,'Sobrado bonito','2026-06-25 00:49:04'),(7,7,6,'Apartamento Popular','Apartamento','85660-000','Rua F','70','Ap 202','Centro Sul','Dois Vizinhos','PR','disponivel',1200.00,220000.00,2,0,1,65,800.00,'Bom custo benefício','2026-06-25 00:49:04'),(8,8,7,'Casa Piscina','Casa','85660-000','Rua G','120',NULL,'Nobre','Dois Vizinhos','PR','disponivel',3500.00,780000.00,4,2,3,250,3500.00,'Piscina aquecida','2026-06-25 00:49:04'),(9,9,8,'Barracao Industrial','Industrial','85660-000','Rua H','500',NULL,'Distrito','Dois Vizinhos','PR','alugado',7000.00,NULL,NULL,NULL,5,1000,5000.00,'Barracão grande','2026-06-25 00:49:04'),(10,10,9,'Terreno Centro','Terreno','85660-000','Rua I','SN',NULL,'Centro','Dois Vizinhos','PR','disponivel',NULL,180000.00,NULL,NULL,NULL,300,600.00,'Terreno plano','2026-06-25 00:49:04');
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
  `status` enum('aguardando_aprovacao','concluida','cancelada','nao_aprovada') NOT NULL DEFAULT 'aguardando_aprovacao',
  `observacoes` text,
  `alocado_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_locacao`),
  KEY `id_imovel` (`id_imovel`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `locacoes_ibfk_1` FOREIGN KEY (`id_imovel`) REFERENCES `imoveis` (`id_imovel`),
  CONSTRAINT `locacoes_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `locacoes_ibfk_3` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locacoes`
--

LOCK TABLES `locacoes` WRITE;
/*!40000 ALTER TABLE `locacoes` DISABLE KEYS */;
INSERT INTO `locacoes` VALUES (1,3,2,2,3200.00,'PIX','2026-05-01','2027-05-01','aguardando_aprovacao','Contrato anual','2026-06-25 00:49:05'),(2,9,3,3,7000.00,'Boleto','2026-06-01','2027-06-01','aguardando_aprovacao','Empresa','2026-06-25 00:49:05');
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
  `situacao` enum('ativo','inativo') NOT NULL DEFAULT 'ativo',
  `senha` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id_proprietario`),
  UNIQUE KEY `CPF` (`CPF`),
  UNIQUE KEY `CNPJ` (`CNPJ`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proprietarios`
--

LOCK TABLES `proprietarios` WRITE;
/*!40000 ALTER TABLE `proprietarios` DISABLE KEYS */;
INSERT INTO `proprietarios` VALUES (1,'Alberto','Moraes','M','303.303.303-30',NULL,'1970-01-01','alberto@gmail.com','ativo','123'),(2,'Beatriz','Campos','F','313.313.313-31',NULL,'1982-02-02','beatriz@gmail.com','ativo','123'),(3,'Construtora','Alpha','M',NULL,'11.111.111/0001-11',NULL,'alpha@gmail.com','ativo','123'),(4,'Daniel','Cardoso','M','323.323.323-32',NULL,'1975-03-03','daniel@gmail.com','ativo','123'),(5,'Empresa','Beta','M',NULL,'22.222.222/0001-22',NULL,'beta@gmail.com','ativo','123'),(6,'Eduarda','Nunes','F','333.333.333-34',NULL,'1988-04-04','eduarda@gmail.com','ativo','123'),(7,'Felipe','Rezende','M','343.343.343-34',NULL,'1990-05-05','felipe@gmail.com','ativo','123'),(8,'Grupo','Omega','M',NULL,'33.333.333/0001-33',NULL,'omega@gmail.com','ativo','123'),(9,'Helena','Batista','F','353.353.353-35',NULL,'1993-06-06','helena@gmail.com','ativo','123'),(10,'Igor','Freitas','M','363.363.363-36',NULL,'1986-07-07','igor@gmail.com','ativo','123');
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
  `id_cliente` int DEFAULT NULL,
  PRIMARY KEY (`id_telefone`),
  KEY `id_proprietario` (`id_proprietario`),
  KEY `id_funcionario` (`id_funcionario`),
  KEY `id_cliente` (`id_cliente`),
  CONSTRAINT `telefone_ibfk_1` FOREIGN KEY (`id_proprietario`) REFERENCES `proprietarios` (`id_proprietario`) ON DELETE CASCADE,
  CONSTRAINT `telefone_ibfk_2` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`) ON DELETE CASCADE,
  CONSTRAINT `telefone_ibfk_3` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`) ON DELETE CASCADE,
  CONSTRAINT `telefone_chk_1` CHECK ((((`id_funcionario` is not null) and (`id_proprietario` is null) and (`id_cliente` is null)) or ((`id_funcionario` is null) and (`id_proprietario` is not null) and (`id_cliente` is null)) or ((`id_funcionario` is null) and (`id_proprietario` is null) and (`id_cliente` is not null))))
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone`
--

LOCK TABLES `telefone` WRITE;
/*!40000 ALTER TABLE `telefone` DISABLE KEYS */;
INSERT INTO `telefone` VALUES (1,'46999991111',1,NULL,NULL),(2,'46999991112',2,NULL,NULL),(3,'46999991113',3,NULL,NULL),(4,'46999992221',NULL,NULL,1),(5,'46999992222',NULL,NULL,2),(6,'46999992223',NULL,NULL,3),(7,'46999993331',NULL,1,NULL),(8,'46999993332',NULL,2,NULL),(9,'46999993333',NULL,3,NULL),(10,'46999993334',NULL,4,NULL);
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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uso_do_carro`
--

LOCK TABLES `uso_do_carro` WRITE;
/*!40000 ALTER TABLE `uso_do_carro` DISABLE KEYS */;
INSERT INTO `uso_do_carro` VALUES (1,1,1,'2026-05-01','08:00:00','2026-05-01','12:00:00','Visita cliente'),(2,2,2,'2026-05-02','09:00:00','2026-05-02','11:00:00','Entrega documentos'),(3,3,3,'2026-05-03','10:00:00','2026-05-03','15:00:00','Reunião'),(4,4,4,'2026-05-04','13:00:00','2026-05-04','18:00:00','Visitas'),(5,5,5,'2026-05-05','07:30:00','2026-05-05','10:30:00','Captação'),(6,6,6,'2026-05-06','08:00:00',NULL,NULL,'Em uso'),(7,7,7,'2026-05-07','14:00:00','2026-05-07','17:00:00','Contrato'),(8,8,8,'2026-05-08','09:00:00','2026-05-08','12:00:00','Banco'),(9,9,9,'2026-05-09','15:00:00','2026-05-09','18:00:00','Cliente'),(10,10,10,'2026-05-10','08:00:00',NULL,NULL,'Em uso');
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
  `status` enum('aguardando_aprovacao','concluida','cancelada','nao_aprovada') NOT NULL DEFAULT 'aguardando_aprovacao',
  `observacoes` text,
  `vendido_em` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_venda`),
  UNIQUE KEY `id_imovel` (`id_imovel`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `vendas_ibfk_1` FOREIGN KEY (`id_imovel`) REFERENCES `imoveis` (`id_imovel`),
  CONSTRAINT `vendas_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `vendas_ibfk_3` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vendas`
--

LOCK TABLES `vendas` WRITE;
/*!40000 ALTER TABLE `vendas` DISABLE KEYS */;
INSERT INTO `vendas` VALUES (1,6,1,1,450000.00,'Financiamento','aguardando_aprovacao','Venda concluída','2026-06-25 00:49:05');
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
  `status` enum('visitado','aguardando visita','cancelado') NOT NULL DEFAULT 'aguardando visita',
  `observacoes` text,
  PRIMARY KEY (`id_visita`),
  KEY `id_cliente` (`id_cliente`),
  KEY `id_imovel` (`id_imovel`),
  KEY `id_funcionario` (`id_funcionario`),
  CONSTRAINT `visitas_ibfk_1` FOREIGN KEY (`id_cliente`) REFERENCES `clientes` (`id_cliente`),
  CONSTRAINT `visitas_ibfk_2` FOREIGN KEY (`id_imovel`) REFERENCES `imoveis` (`id_imovel`),
  CONSTRAINT `visitas_ibfk_3` FOREIGN KEY (`id_funcionario`) REFERENCES `funcionarios` (`id_funcionario`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitas`
--

LOCK TABLES `visitas` WRITE;
/*!40000 ALTER TABLE `visitas` DISABLE KEYS */;
INSERT INTO `visitas` VALUES (1,1,1,1,'2026-05-11','09:00:00','visitado','Gostou'),(2,2,2,2,'2026-05-12','10:00:00','aguardando visita','Primeira visita'),(3,3,3,3,'2026-05-13','14:00:00','cancelado','Cliente desistiu'),(4,4,4,4,'2026-05-14','15:00:00','visitado','Analisando'),(5,5,5,5,'2026-05-15','16:00:00','visitado','Interessado'),(6,6,6,6,'2026-05-16','11:00:00','aguardando visita','Agendada'),(7,7,7,7,'2026-05-17','13:00:00','visitado','Gostou muito'),(8,8,8,8,'2026-05-18','17:00:00','cancelado','Sem interesse'),(9,9,9,9,'2026-05-19','08:00:00','visitado','Retornará'),(10,10,10,10,'2026-05-20','09:30:00','aguardando visita','Confirmada');
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

-- Dump completed on 2026-06-24 21:49:59
