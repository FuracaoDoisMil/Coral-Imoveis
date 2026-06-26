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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `carro`
--

LOCK TABLES `carro` WRITE;
/*!40000 ALTER TABLE `carro` DISABLE KEYS */;
INSERT INTO `carro` VALUES (1,'Chevrolet Onix','ABC-1234','disponivel'),(2,'Volkswagen Polo','DEF-5678','disponivel'),(3,'Hyundai HB20','GHI-9012','disponivel'),(4,'Toyota Corolla','JKL-3456','disponivel'),(5,'Fiat Strada','MNO-7890','disponivel');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clientes`
--

LOCK TABLES `clientes` WRITE;
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` VALUES (1,'Lucas','Pereira','M','888.888.888-88','1998-06-12','lucas@email.com','123456','ativo'),(2,'Beatriz','Costa','F','999.999.999-99','2000-09-25','beatriz@email.com','123456','ativo'),(3,'Ricardo','Nunes','M','101.010.101-01','1985-01-30','ricardo@email.com','123456','ativo');
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
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contratos`
--

LOCK TABLES `contratos` WRITE;
/*!40000 ALTER TABLE `contratos` DISABLE KEYS */;
INSERT INTO `contratos` VALUES (1,1,NULL,3,'venda','aguardando_aprovacao','Aguardando aprovação do gerente','2026-06-26 16:02:53'),(2,NULL,1,4,'locacao','aguardando_aprovacao','Aguardando aprovação do gerente','2026-06-26 16:02:54');
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcionarios`
--

LOCK TABLES `funcionarios` WRITE;
/*!40000 ALTER TABLE `funcionarios` DISABLE KEYS */;
INSERT INTO `funcionarios` VALUES (1,'Gerente','Carlos','Souza','M','111.111.111-11','1980-05-10','carlos.gerente@coral.com','123456',8000.00,'ativo','12345678900','B','2028-01-01'),(2,'Secretario','Ana','Lima','F','222.222.222-22','1995-03-22','ana.secretaria@coral.com','123456',3500.00,'ativo',NULL,NULL,NULL),(3,'Corretor','Joao','Silva','M','333.333.333-33','1990-07-15','joao.corretor@coral.com','123456',4500.00,'ativo','98765432100','B','2027-06-01'),(4,'Corretor','Mariana','Oliveira','F','444.444.444-44','1992-11-30','mariana.corretor@coral.com','123456',4500.00,'ativo','11122233344','B','2026-12-01'),(5,'Corretor','Pedro','Fernandes','M','555.555.555-55','1988-04-05','pedro.corretor@coral.com','123456',4500.00,'ativo','55566677788','B','2027-03-01');
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
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imagens_imovel`
--

LOCK TABLES `imagens_imovel` WRITE;
/*!40000 ALTER TABLE `imagens_imovel` DISABLE KEYS */;
INSERT INTO `imagens_imovel` VALUES (1,1,NULL,'uploads/casa1.jpg'),(2,1,'uploads/quarto1.jpeg',NULL),(3,1,'uploads/banheiro1.jpeg',NULL),(4,2,NULL,'uploads/casa_praia1.jpeg'),(5,2,'uploads/comodo1.jpg',NULL),(6,3,NULL,'uploads/casa2.jpg'),(7,3,'uploads/quarto1.jpeg',NULL),(8,4,NULL,'uploads/predio.jpg'),(9,4,'uploads/comodo1.jpg',NULL),(10,5,NULL,'uploads/barracao1.jpg'),(11,5,'uploads/barracao2.jpg',NULL),(12,6,NULL,'uploads/casa3.jpeg'),(13,6,'uploads/banheiro1.jpeg',NULL);
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
  CONSTRAINT `imoveis_chk_1` CHECK (((`valor_locacao` is not null) or (`valor_venda` is not null)))
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `imoveis`
--

LOCK TABLES `imoveis` WRITE;
/*!40000 ALTER TABLE `imoveis` DISABLE KEYS */;
INSERT INTO `imoveis` VALUES (1,1,3,'Casa Jardim das Flores','Casa','85660-000','Rua das Flores','100',NULL,'Jardim','Dois Vizinhos','PR','disponivel',1800.00,350000.00,3,1,2,120,1500.00,'Casa ampla com quintal','2026-06-26 16:02:51'),(2,1,3,'Casa Praia Paraíso','Casa','88000-000','Av. Beira Mar','200',NULL,'Centro','Florianópolis','SC','disponivel',3500.00,750000.00,4,2,2,200,3000.00,'Casa de praia com vista para o mar','2026-06-26 16:02:51'),(3,2,4,'Apartamento Centro','Apartamento','85660-100','Rua Central','300',NULL,'Centro','Dois Vizinhos','PR','disponivel',1200.00,220000.00,2,1,1,70,800.00,'Apartamento bem localizado','2026-06-26 16:02:51'),(4,2,4,'Prédio Comercial Norte','Comercial','85660-200','Av. Brasil','400',NULL,'Centro Norte','Dois Vizinhos','PR','disponivel',5000.00,1200000.00,NULL,NULL,5,500,8000.00,'Prédio comercial com 5 andares','2026-06-26 16:02:51'),(5,3,5,'Barracão Industrial','Barracão','85660-300','Rua Industrial','500',NULL,'Distrito','Dois Vizinhos','PR','disponivel',4000.00,900000.00,NULL,NULL,10,800,6000.00,'Barracão com pé direito alto','2026-06-26 16:02:51'),(6,3,5,'Casa Bairro Novo','Casa','85660-400','Rua Nova','600',NULL,'Bairro Novo','Dois Vizinhos','PR','disponivel',1500.00,280000.00,3,0,1,90,1000.00,'Casa nova com acabamento moderno','2026-06-26 16:02:51');
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `locacoes`
--

LOCK TABLES `locacoes` WRITE;
/*!40000 ALTER TABLE `locacoes` DISABLE KEYS */;
INSERT INTO `locacoes` VALUES (1,3,2,4,1200.00,'Pix','2026-07-01','2027-07-01','aguardando_aprovacao','Locação anual','2026-06-26 16:02:53');
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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `proprietarios`
--

LOCK TABLES `proprietarios` WRITE;
/*!40000 ALTER TABLE `proprietarios` DISABLE KEYS */;
INSERT INTO `proprietarios` VALUES (1,'Roberto','Alves','M','666.666.666-66',NULL,'1975-08-20','roberto@email.com','ativo',NULL),(2,'Fernanda','Martins','F','777.777.777-77',NULL,'1982-02-14','fernanda@email.com','ativo',NULL),(3,'Empresa','Imóveis','M',NULL,'12.345.678/0001-99',NULL,'empresa@email.com','ativo',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `telefone`
--

LOCK TABLES `telefone` WRITE;
/*!40000 ALTER TABLE `telefone` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `uso_do_carro`
--

LOCK TABLES `uso_do_carro` WRITE;
/*!40000 ALTER TABLE `uso_do_carro` DISABLE KEYS */;
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
INSERT INTO `vendas` VALUES (1,1,1,3,350000.00,'Financiamento','aguardando_aprovacao','Venda financiada pelo banco','2026-06-26 16:02:53');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visitas`
--

LOCK TABLES `visitas` WRITE;
/*!40000 ALTER TABLE `visitas` DISABLE KEYS */;
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

-- Dump completed on 2026-06-26 13:04:29
