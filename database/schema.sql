CREATE TABLE funcionarios(
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    tipo_funcionario ENUM('Corretor', 'Secretario', 'Gerente') NOT NULL,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    sexo CHAR(1) NOT NULL,
    CPF CHAR(14) UNIQUE NOT NULL,
    dt_nascimento DATE NOT NULL,
    email VARCHAR(50) NOT NULL,
    senha VARCHAR(255) NOT NULL,
    salario DECIMAL(10,2) NOT NULL,
    situacao ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    CNH_numero VARCHAR(20),
    CNH_categoria VARCHAR(3),
    CNH_validade DATE
);
CREATE TABLE clientes(
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50),
    sexo CHAR(1) NOT NULL,
    CPF CHAR(14) UNIQUE NOT NULL,
    dt_nascimento DATE NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,
    situacao ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo'
);

CREATE TABLE proprietarios(
    id_proprietario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50) NOT NULL,
    sexo CHAR(1) NOT NULL,
    CPF CHAR(14) UNIQUE,
    CNPJ CHAR(18) UNIQUE,
    dt_nascimento DATE,
    email VARCHAR(50),
    situacao ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo',
    senha VARCHAR(255)
);

CREATE TABLE carro(
    id_carro INT AUTO_INCREMENT PRIMARY KEY,
    modelo_carro VARCHAR(50) NOT NULL,
    placa_carro VARCHAR(8) UNIQUE NOT NULL,
    situacao ENUM('disponivel', 'indisponivel') NOT NULL
);

CREATE TABLE telefone(
    id_telefone INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    id_funcionario INT,
    id_proprietario INT,
    id_cliente INT,

    FOREIGN KEY (id_proprietario)
    REFERENCES proprietarios(id_proprietario)
    ON DELETE CASCADE,

    FOREIGN KEY (id_funcionario)
    REFERENCES funcionarios(id_funcionario)
    ON DELETE CASCADE,
    
    FOREIGN KEY(id_cliente) 
    REFERENCES clientes(id_cliente)
    ON DELETE CASCADE,

    CHECK (
        (id_funcionario IS NOT NULL AND id_proprietario IS NULL AND id_cliente IS NULL)
        OR
        (id_funcionario IS NULL AND id_proprietario IS NOT NULL AND id_cliente IS NULL)
        OR
        (id_funcionario IS NULL AND id_proprietario IS NULL AND id_cliente IS NOT NULL)
    )
);

CREATE TABLE imoveis(
    id_imovel INT AUTO_INCREMENT PRIMARY KEY,
    id_proprietario INT NOT NULL,
    id_funcionario INT NOT NULL,
    nome_imovel VARCHAR(200) NOT NULL,
    tipo VARCHAR(50) NOT NULL,
    cep VARCHAR(10) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    numero VARCHAR(10) NOT NULL,
    complemento VARCHAR(50),
    bairro VARCHAR(50) NOT NULL,
    cidade VARCHAR(50) NOT NULL,
    estado VARCHAR(2) NOT NULL,
    status ENUM('disponivel', 'alugado', 'vendido') NOT NULL,
    valor_locacao DECIMAL(10,2),
    valor_venda DECIMAL(10,2),
    quartos INT,
    suites INT,
    vagas_garagem INT,
    area FLOAT,
    iptu DECIMAL(10,2),
    observacoes TEXT,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_proprietario)
    REFERENCES proprietarios(id_proprietario),

    FOREIGN KEY (id_funcionario)
    REFERENCES funcionarios(id_funcionario)
);

CREATE TABLE uso_do_carro(
    id_registro INT AUTO_INCREMENT PRIMARY KEY,

    id_funcionario INT NOT NULL,
    id_carro INT NOT NULL,

    data_saida DATE NOT NULL,
    hora_saida TIME NOT NULL,

    data_retorno DATE,
    hora_retorno TIME,

    observacoes TEXT,

    FOREIGN KEY (id_funcionario)
    REFERENCES funcionarios(id_funcionario),

    FOREIGN KEY (id_carro)
    REFERENCES carro(id_carro)
);



CREATE TABLE visitas(
    id_visita INT AUTO_INCREMENT PRIMARY KEY,

    id_cliente INT NOT NULL,
    id_imovel INT NOT NULL,
    id_funcionario INT NOT NULL,

    data_visita DATE NOT NULL,
    hora_visita TIME NOT NULL,

    status ENUM('visitado', 'aguardando visita', 'cancelado') NOT NULL,

    observacoes TEXT,

    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente),

    FOREIGN KEY (id_imovel)
    REFERENCES imoveis(id_imovel),

    FOREIGN KEY (id_funcionario)
    REFERENCES funcionarios(id_funcionario)
);

CREATE TABLE vendas(
    id_venda INT AUTO_INCREMENT PRIMARY KEY,

    id_imovel INT UNIQUE NOT NULL,
    id_cliente INT NOT NULL,
    id_funcionario INT NOT NULL,

    valor_venda DECIMAL(10,2) NOT NULL,

    forma_pagamento VARCHAR(20) NOT NULL,

    observacoes TEXT,

    vendido_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_imovel)
    REFERENCES imoveis(id_imovel),

    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente),

    FOREIGN KEY (id_funcionario)
    REFERENCES funcionarios(id_funcionario)
);

CREATE TABLE locacoes(
    id_locacao INT AUTO_INCREMENT PRIMARY KEY,

    id_imovel INT NOT NULL,
    id_cliente INT NOT NULL,
    id_funcionario INT NOT NULL,

    valor_aluguel DECIMAL(10,2) NOT NULL,

    forma_pagamento VARCHAR(20) NOT NULL,

    data_entrada DATE NOT NULL,
    data_saida DATE NOT NULL,

    observacoes TEXT,

    alocado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_imovel)
    REFERENCES imoveis(id_imovel),

    FOREIGN KEY (id_cliente)
    REFERENCES clientes(id_cliente),

    FOREIGN KEY (id_funcionario)
    REFERENCES funcionarios(id_funcionario)
);

CREATE TABLE contratos(
    id_contrato INT AUTO_INCREMENT PRIMARY KEY,

    id_venda INT,
    id_locacao INT,

    id_funcionario INT NOT NULL,

    tipo_contrato ENUM('venda', 'locacao') NOT NULL,

    status ENUM('ativo', 'encerrado', 'cancelado') NOT NULL,
	observacoes text,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_venda)
    REFERENCES vendas(id_venda),

    FOREIGN KEY (id_locacao)
    REFERENCES locacoes(id_locacao),

    FOREIGN KEY (id_funcionario)
    REFERENCES funcionarios(id_funcionario),

    CHECK (
        (id_venda IS NOT NULL AND id_locacao IS NULL)
        OR
        (id_locacao IS NOT NULL AND id_venda IS NULL)
    )
);

CREATE TABLE imagens_imovel(
    id_imagem INT AUTO_INCREMENT PRIMARY KEY,

    id_imovel INT NOT NULL,

    caminho_imagem VARCHAR(255) NOT NULL,

    FOREIGN KEY (id_imovel)
    REFERENCES imoveis(id_imovel)
    ON DELETE CASCADE
);


-- =========================
-- FUNCIONARIOS
-- =========================

INSERT INTO funcionarios
(tipo_funcionario, nome, sobrenome, sexo, CPF, dt_nascimento, email, senha, salario, situacao, CNH_numero, CNH_categoria, CNH_validade)
VALUES
('Corretor', 'Joao', 'Silva', 'M', '111.111.111-11', '1990-05-10', 'joao@imob.com', '123', 3500.00, 'ativo', '123456789', 'B', '2030-01-01'),
('Secretario', 'Maria', 'Oliveira', 'F', '222.222.222-22', '1992-03-15', 'maria@imob.com', '123', 2800.00, 'ativo', NULL, NULL, NULL),
('Gerente', 'Carlos', 'Souza', 'M', '333.333.333-33', '1985-07-20', 'carlos@imob.com', '123', 8000.00, 'ativo', '987654321', 'B', '2029-05-10'),
('Corretor', 'Ana', 'Pereira', 'F', '444.444.444-44', '1995-09-12', 'ana@imob.com', '123', 4000.00, 'ativo', '555555555', 'AB', '2031-03-15'),
('Corretor', 'Lucas', 'Fernandes', 'M', '555.555.555-55', '1998-11-25', 'lucas@imob.com', '123', 3200.00, 'ativo', '666666666', 'B', '2028-06-20'),
('Secretario', 'Juliana', 'Costa', 'F', '666.666.666-66', '1991-08-14', 'juliana@imob.com', '123', 2900.00, 'ativo', NULL, NULL, NULL),
('Corretor', 'Pedro', 'Almeida', 'M', '777.777.777-77', '1989-04-30', 'pedro@imob.com', '123', 4100.00, 'ativo', '777777777', 'A', '2030-09-09'),
('Gerente', 'Fernanda', 'Lima', 'F', '888.888.888-88', '1980-12-01', 'fernanda@imob.com', '123', 9500.00, 'ativo', '888888888', 'B', '2032-02-02'),
('Corretor', 'Rafael', 'Mendes', 'M', '999.999.999-99', '1993-06-17', 'rafael@imob.com', '123', 3600.00, 'ativo', '999999999', 'AB', '2029-12-12'),
('Secretario', 'Patricia', 'Rocha', 'F', '101.101.101-10', '1994-10-08', 'patricia@imob.com', '123', 3000.00, 'ativo', NULL, NULL, NULL);


-- =========================
-- CLIENTES
-- =========================

INSERT INTO clientes
(nome, sobrenome, sexo, CPF, dt_nascimento, email, senha, situacao)
VALUES
('Bruno', 'Martins', 'M', '121.121.121-12', '1999-02-10', 'bruno@gmail.com', '123', 'ativo'),

('Camila', 'Dias', 'F', '131.131.131-13', '1997-04-11', 'camila@gmail.com', '123', 'ativo'),

('Diego', 'Santos', 'M', '141.141.141-14', '1988-01-05', 'diego@gmail.com', '123', 'ativo'),

('Elaine', 'Ferreira', 'F', '151.151.151-15', '1990-09-22', 'elaine@gmail.com', '123', 'ativo'),

('Fabio', 'Gomes', 'M', '161.161.161-16', '1992-03-19', 'fabio@gmail.com', '123', 'ativo'),

('Gabriela', 'Ribeiro', 'F', '171.171.171-17', '2000-07-01', 'gabriela@gmail.com', '123', 'ativo'),

('Henrique', 'Alves', 'M', '181.181.181-18', '1996-08-08', 'henrique@gmail.com', '123', 'ativo'),

('Isabela', 'Teixeira', 'F', '191.191.191-19', '1994-12-12', 'isabela@gmail.com', '123', 'ativo'),

('Jean', 'Barbosa', 'M', '202.202.202-20', '1987-06-25', 'jean@gmail.com', '123', 'ativo'),

('Karen', 'Moreira', 'F', '212.212.212-21', '1998-05-30', 'karen@gmail.com', '123', 'ativo');


-- =========================
-- PROPRIETARIOS
-- =========================

INSERT INTO proprietarios
(nome, sobrenome, sexo, CPF, CNPJ, dt_nascimento, email, situacao, senha)
VALUES
('Alberto', 'Moraes', 'M', '303.303.303-30', NULL, '1970-01-01', 'alberto@gmail.com', 'ativo', '123'),
('Beatriz', 'Campos', 'F', '313.313.313-31', NULL, '1982-02-02', 'beatriz@gmail.com', 'ativo', '123'),
('Construtora', 'Alpha', 'M', NULL, '11.111.111/0001-11', NULL, 'alpha@gmail.com', 'ativo', '123'),
('Daniel', 'Cardoso', 'M', '323.323.323-32', NULL, '1975-03-03', 'daniel@gmail.com', 'ativo', '123'),
('Empresa', 'Beta', 'M', NULL, '22.222.222/0001-22', NULL, 'beta@gmail.com', 'ativo', '123'),
('Eduarda', 'Nunes', 'F', '333.333.333-34', NULL, '1988-04-04', 'eduarda@gmail.com', 'ativo', '123'),
('Felipe', 'Rezende', 'M', '343.343.343-34', NULL, '1990-05-05', 'felipe@gmail.com', 'ativo', '123'),
('Grupo', 'Omega', 'M', NULL, '33.333.333/0001-33', NULL, 'omega@gmail.com', 'ativo', '123'),
('Helena', 'Batista', 'F', '353.353.353-35', NULL, '1993-06-06', 'helena@gmail.com', 'ativo', '123'),
('Igor', 'Freitas', 'M', '363.363.363-36', NULL, '1986-07-07', 'igor@gmail.com', 'ativo', '123');


-- =========================
-- CARROS
-- =========================

INSERT INTO carro
(modelo_carro, placa_carro, situacao)
VALUES
('Onix', 'ABC1D23', 'disponivel'),
('HB20', 'DEF2G34', 'disponivel'),
('Corolla', 'HIJ3K45', 'indisponivel'),
('Civic', 'LMN4O56', 'disponivel'),
('Tracker', 'PQR5S67', 'disponivel'),
('Compass', 'TUV6W78', 'indisponivel'),
('Gol', 'XYZ7A89', 'disponivel'),
('Argo', 'BCD8E90', 'disponivel'),
('Creta', 'FGH9I01', 'disponivel'),
('Renegade', 'JKL0M12', 'indisponivel');


-- =========================
-- TELEFONES
-- =========================

INSERT INTO telefone (numero, id_funcionario)
VALUES
('46999991111', 1),
('46999991112', 2),
('46999991113', 3);

INSERT INTO telefone (numero, id_cliente)
VALUES
('46999992221', 1),
('46999992222', 2),
('46999992223', 3);

INSERT INTO telefone (numero, id_proprietario)
VALUES
('46999993331', 1),
('46999993332', 2),
('46999993333', 3),
('46999993334', 4);


-- =========================
-- IMOVEIS
-- =========================

INSERT INTO imoveis
(id_proprietario, id_funcionario, nome_imovel, tipo, cep, endereco, numero, complemento, bairro, cidade, estado, status, valor_locacao, valor_venda, quartos, suites, vagas_garagem, area, iptu, observacoes)
VALUES
(1, 1, 'Casa Centro', 'Casa', '85660-000', 'Rua A', '100', NULL, 'Centro', 'Dois Vizinhos', 'PR', 'disponivel', 1800, 350000, 3, 1, 2, 120, 1500, 'Casa ampla'),
(2, 2, 'Apartamento Luxo', 'Apartamento', '85660-000', 'Rua B', '200', 'Ap 301', 'Centro', 'Dois Vizinhos', 'PR', 'disponivel', 2500, 500000, 2, 1, 1, 90, 2000, 'Apartamento moderno'),
(3, 1, 'Sala Comercial', 'Comercial', '85660-000', 'Rua C', '50', NULL, 'Industrial', 'Dois Vizinhos', 'PR', 'alugado', 3200, NULL, NULL, NULL, 2, 70, 1000, 'Ótima localização'),
(4, 4, 'Chacara Boa Vista', 'Chacara', '85660-000', 'Linha Interior', 'SN', NULL, 'Rural', 'Dois Vizinhos', 'PR', 'disponivel', NULL, 800000, 4, 2, 3, 500, 2500, 'Área rural'),
(5, 5, 'Kitnet Universitaria', 'Kitnet', '85660-000', 'Rua D', '15', NULL, 'Centro Norte', 'Dois Vizinhos', 'PR', 'disponivel', 900, 120000, 1, 0, 0, 35, 500, 'Próxima faculdade'),
(6, 3, 'Sobrado Familiar', 'Sobrado', '85660-000', 'Rua E', '88', NULL, 'Jardim', 'Dois Vizinhos', 'PR', 'vendido', NULL, 450000, 3, 1, 2, 150, 1800, 'Sobrado bonito'),
(7, 6, 'Apartamento Popular', 'Apartamento', '85660-000', 'Rua F', '70', 'Ap 202', 'Centro Sul', 'Dois Vizinhos', 'PR', 'disponivel', 1200, 220000, 2, 0, 1, 65, 800, 'Bom custo benefício'),
(8, 7, 'Casa Piscina', 'Casa', '85660-000', 'Rua G', '120', NULL, 'Nobre', 'Dois Vizinhos', 'PR', 'disponivel', 3500, 780000, 4, 2, 3, 250, 3500, 'Piscina aquecida'),
(9, 8, 'Barracao Industrial', 'Industrial', '85660-000', 'Rua H', '500', NULL, 'Distrito', 'Dois Vizinhos', 'PR', 'alugado', 7000, NULL, NULL, NULL, 5, 1000, 5000, 'Barracão grande'),
(10, 9, 'Terreno Centro', 'Terreno', '85660-000', 'Rua I', 'SN', NULL, 'Centro', 'Dois Vizinhos', 'PR', 'disponivel', NULL, 180000, NULL, NULL, NULL, 300, 600, 'Terreno plano');


-- =========================
-- USO DO CARRO
-- =========================

INSERT INTO uso_do_carro
(id_funcionario, id_carro, data_saida, hora_saida, data_retorno, hora_retorno, observacoes)
VALUES
(1,1,'2026-05-01','08:00:00','2026-05-01','12:00:00','Visita cliente'),
(2,2,'2026-05-02','09:00:00','2026-05-02','11:00:00','Entrega documentos'),
(3,3,'2026-05-03','10:00:00','2026-05-03','15:00:00','Reunião'),
(4,4,'2026-05-04','13:00:00','2026-05-04','18:00:00','Visitas'),
(5,5,'2026-05-05','07:30:00','2026-05-05','10:30:00','Captação'),
(6,6,'2026-05-06','08:00:00',NULL,NULL,'Em uso'),
(7,7,'2026-05-07','14:00:00','2026-05-07','17:00:00','Contrato'),
(8,8,'2026-05-08','09:00:00','2026-05-08','12:00:00','Banco'),
(9,9,'2026-05-09','15:00:00','2026-05-09','18:00:00','Cliente'),
(10,10,'2026-05-10','08:00:00',NULL,NULL,'Em uso');


-- =========================
-- VISITAS
-- =========================

INSERT INTO visitas
(id_cliente, id_imovel, id_funcionario, data_visita, hora_visita, status, observacoes)
VALUES
(1,1,1,'2026-05-11','09:00:00','visitado','Gostou'),
(2,2,2,'2026-05-12','10:00:00','aguardando visita','Primeira visita'),
(3,3,3,'2026-05-13','14:00:00','cancelado','Cliente desistiu'),
(4,4,4,'2026-05-14','15:00:00','visitado','Analisando'),
(5,5,5,'2026-05-15','16:00:00','visitado','Interessado'),
(6,6,6,'2026-05-16','11:00:00','aguardando visita','Agendada'),
(7,7,7,'2026-05-17','13:00:00','visitado','Gostou muito'),
(8,8,8,'2026-05-18','17:00:00','cancelado','Sem interesse'),
(9,9,9,'2026-05-19','08:00:00','visitado','Retornará'),
(10,10,10,'2026-05-20','09:30:00','aguardando visita','Confirmada');


-- =========================
-- VENDAS
-- =========================

INSERT INTO vendas
(id_imovel, id_cliente, id_funcionario, valor_venda, forma_pagamento, observacoes)
VALUES
(6,1,1,450000,'Financiamento','Venda concluída');


-- =========================
-- LOCACOES
-- =========================

INSERT INTO locacoes
(id_imovel, id_cliente, id_funcionario, valor_aluguel, forma_pagamento, data_entrada, data_saida, observacoes)
VALUES
(3,2,2,3200,'PIX','2026-05-01','2027-05-01','Contrato anual'),
(9,3,3,7000,'Boleto','2026-06-01','2027-06-01','Empresa');


-- =========================
-- CONTRATOS
-- =========================

INSERT INTO contratos
(id_venda, id_locacao, id_funcionario, tipo_contrato, status, observacoes)
VALUES
(1,NULL,1,'venda','ativo','Contrato venda'),
(NULL,1,2,'locacao','ativo','Contrato locação 1'),
(NULL,2,3,'locacao','ativo','Contrato locação 2');


-- =========================
-- IMAGENS IMOVEL
-- =========================

INSERT INTO imagens_imovel
(id_imovel, caminho_imagem)
VALUES
(1,'/img/imovel1a.jpg'),
(1,'/img/imovel1b.jpg'),
(2,'/img/imovel2.jpg'),
(3,'/img/imovel3.jpg'),
(4,'/img/imovel4.jpg'),
(5,'/img/imovel5.jpg'),
(6,'/img/imovel6.jpg'),
(7,'/img/imovel7.jpg'),
(8,'/img/imovel8.jpg'),
(9,'/img/imovel9.jpg');
