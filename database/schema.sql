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
    REFERENCES funcionarios(id_funcionario),

    CHECK (valor_locacao IS NOT NULL OR valor_venda IS NOT NULL)
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

    status ENUM('visitado', 'aguardando visita', 'cancelado') NOT NULL DEFAULT 'aguardando visita',

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
	
    status ENUM('aguardando_aprovacao', 'concluida', 'cancelada', 'nao_aprovada') NOT NULL DEFAULT 'aguardando_aprovacao',
    
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
	
     status ENUM('aguardando_aprovacao', 'concluida', 'cancelada', 'nao_aprovada') NOT NULL DEFAULT 'aguardando_aprovacao',
    
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

    status ENUM('aguardando_aprovacao', 'aprovado', 'rejeitado') NOT NULL,
	observacoes text,
    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (id_venda)
    REFERENCES vendas(id_venda) ON DELETE CASCADE,

    FOREIGN KEY (id_locacao)
    REFERENCES locacoes(id_locacao) ON DELETE CASCADE,

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

    caminho_imagem VARCHAR(255),
    caminho_imagem_capa VARCHAR(255),

    FOREIGN KEY (id_imovel)
    REFERENCES imoveis(id_imovel)
    ON DELETE CASCADE,
	CHECK(
		(caminho_imagem IS NOT NULL AND caminho_imagem_capa IS NULL)
        OR
        (caminho_imagem_capa IS NOT NULL AND caminho_imagem IS NULL)
    )
);

-- =============================================================
-- FUNCIONÁRIOS (1 Gerente, 1 Secretário, 3 Corretores)
-- =============================================================

INSERT INTO funcionarios (tipo_funcionario, nome, sobrenome, sexo, CPF, dt_nascimento, email, senha, salario, situacao, CNH_numero, CNH_categoria, CNH_validade) VALUES
('Gerente',    'Carlos',  'Souza',     'M', '111.111.111-11', '1980-05-10', 'carlos.gerente@coral.com',    '123456', 8000.00, 'ativo', '12345678900', 'B', '2028-01-01'),
('Secretario', 'Ana',     'Lima',      'F', '222.222.222-22', '1995-03-22', 'ana.secretaria@coral.com',    '123456', 3500.00, 'ativo', NULL, NULL, NULL),
('Corretor',   'Joao',    'Silva',     'M', '333.333.333-33', '1990-07-15', 'joao.corretor@coral.com',     '123456', 4500.00, 'ativo', '98765432100', 'B', '2027-06-01'),
('Corretor',   'Mariana', 'Oliveira',  'F', '444.444.444-44', '1992-11-30', 'mariana.corretor@coral.com',  '123456', 4500.00, 'ativo', '11122233344', 'B', '2026-12-01'),
('Corretor',   'Pedro',   'Fernandes', 'M', '555.555.555-55', '1988-04-05', 'pedro.corretor@coral.com',    '123456', 4500.00, 'ativo', '55566677788', 'B', '2027-03-01');

-- =============================================================
-- PROPRIETÁRIOS
-- =============================================================

INSERT INTO proprietarios (nome, sobrenome, sexo, CPF, CNPJ, dt_nascimento, email, situacao) VALUES
('Roberto',  'Alves',    'M', '666.666.666-66', NULL,                  '1975-08-20', 'roberto@email.com',  'ativo'),
('Fernanda', 'Martins',  'F', '777.777.777-77', NULL,                  '1982-02-14', 'fernanda@email.com', 'ativo'),
('Empresa',  'Imóveis',  'M', NULL,             '12.345.678/0001-99',  NULL,         'empresa@email.com',  'ativo');

-- =============================================================
-- CLIENTES
-- =============================================================

INSERT INTO clientes (nome, sobrenome, sexo, CPF, dt_nascimento, email, senha, situacao) VALUES
('Lucas',    'Pereira',  'M', '888.888.888-88', '1998-06-12', 'lucas@email.com',    '123456', 'ativo'),
('Beatriz',  'Costa',    'F', '999.999.999-99', '2000-09-25', 'beatriz@email.com',  '123456', 'ativo'),
('Ricardo',  'Nunes',    'M', '101.010.101-01', '1985-01-30', 'ricardo@email.com',  '123456', 'ativo');

-- =============================================================
-- IMÓVEIS (6 imóveis, todos com corretor como id_funcionario)
-- =============================================================

INSERT INTO imoveis (id_proprietario, id_funcionario, nome_imovel, tipo, cep, endereco, numero, bairro, cidade, estado, status, valor_locacao, valor_venda, quartos, suites, vagas_garagem, area, iptu, observacoes) VALUES
(1, 3, 'Casa Jardim das Flores',  'Casa',      '85660-000', 'Rua das Flores',    '100', 'Jardim',      'Dois Vizinhos', 'PR', 'disponivel', 1800.00,  350000.00, 3, 1, 2, 120.00, 1500.00, 'Casa ampla com quintal'),
(1, 3, 'Casa Praia Paraíso',      'Casa',      '88000-000', 'Av. Beira Mar',     '200', 'Centro',      'Florianópolis', 'SC', 'disponivel', 3500.00,  750000.00, 4, 2, 2, 200.00, 3000.00, 'Casa de praia com vista para o mar'),
(2, 4, 'Apartamento Centro',      'Apartamento','85660-100','Rua Central',       '300', 'Centro',      'Dois Vizinhos', 'PR', 'disponivel', 1200.00,  220000.00, 2, 1, 1,  70.00,  800.00, 'Apartamento bem localizado'),
(2, 4, 'Prédio Comercial Norte',  'Comercial', '85660-200', 'Av. Brasil',        '400', 'Centro Norte','Dois Vizinhos', 'PR', 'disponivel', 5000.00, 1200000.00, NULL, NULL, 5, 500.00, 8000.00, 'Prédio comercial com 5 andares'),
(3, 5, 'Barracão Industrial',     'Barracão',  '85660-300', 'Rua Industrial',    '500', 'Distrito',    'Dois Vizinhos', 'PR', 'disponivel', 4000.00,  900000.00, NULL, NULL, 10, 800.00, 6000.00, 'Barracão com pé direito alto'),
(3, 5, 'Casa Bairro Novo',        'Casa',      '85660-400', 'Rua Nova',          '600', 'Bairro Novo', 'Dois Vizinhos', 'PR', 'disponivel', 1500.00,  280000.00, 3, 0, 1,  90.00, 1000.00, 'Casa nova com acabamento moderno');

-- =============================================================
-- IMAGENS DOS IMÓVEIS
-- (caminho_imagem_capa = capa | caminho_imagem = secundária)
-- =============================================================

-- Imóvel 1 - Casa Jardim das Flores
INSERT INTO imagens_imovel (id_imovel, caminho_imagem_capa) VALUES (1, 'uploads/casa1.jpg');
INSERT INTO imagens_imovel (id_imovel, caminho_imagem) VALUES (1, 'uploads/quarto1.jpeg');
INSERT INTO imagens_imovel (id_imovel, caminho_imagem) VALUES (1, 'uploads/banheiro1.jpeg');

-- Imóvel 2 - Casa Praia Paraíso
INSERT INTO imagens_imovel (id_imovel, caminho_imagem_capa) VALUES (2, 'uploads/casa_praia1.jpeg');
INSERT INTO imagens_imovel (id_imovel, caminho_imagem) VALUES (2, 'uploads/comodo1.jpg');

-- Imóvel 3 - Apartamento Centro
INSERT INTO imagens_imovel (id_imovel, caminho_imagem_capa) VALUES (3, 'uploads/casa2.jpg');
INSERT INTO imagens_imovel (id_imovel, caminho_imagem) VALUES (3, 'uploads/quarto1.jpeg');

-- Imóvel 4 - Prédio Comercial Norte
INSERT INTO imagens_imovel (id_imovel, caminho_imagem_capa) VALUES (4, 'uploads/predio.jpg');
INSERT INTO imagens_imovel (id_imovel, caminho_imagem) VALUES (4, 'uploads/comodo1.jpg');

-- Imóvel 5 - Barracão Industrial
INSERT INTO imagens_imovel (id_imovel, caminho_imagem_capa) VALUES (5, 'uploads/barracao1.jpg');
INSERT INTO imagens_imovel (id_imovel, caminho_imagem) VALUES (5, 'uploads/barracao2.jpg');

-- Imóvel 6 - Casa Bairro Novo
INSERT INTO imagens_imovel (id_imovel, caminho_imagem_capa) VALUES (6, 'uploads/casa3.jpeg');
INSERT INTO imagens_imovel (id_imovel, caminho_imagem) VALUES (6, 'uploads/banheiro1.jpeg');

-- =============================================================
-- VENDA (somente corretor como id_funcionario)
-- =============================================================

INSERT INTO vendas (id_imovel, id_cliente, id_funcionario, valor_venda, forma_pagamento, observacoes) VALUES
(1, 1, 3, 350000.00, 'Financiamento', 'Venda financiada pelo banco');

INSERT INTO contratos (id_venda, id_funcionario, tipo_contrato, status, observacoes) VALUES
(1, 3, 'venda', 'aguardando_aprovacao', 'Aguardando aprovação do gerente');

-- =============================================================
-- LOCAÇÃO (somente corretor como id_funcionario)
-- =============================================================

INSERT INTO locacoes (id_imovel, id_cliente, id_funcionario, valor_aluguel, forma_pagamento, data_entrada, data_saida, observacoes) VALUES
(3, 2, 4, 1200.00, 'Pix', '2026-07-01', '2027-07-01', 'Locação anual');

INSERT INTO contratos (id_locacao, id_funcionario, tipo_contrato, status, observacoes) VALUES
(1, 4, 'locacao', 'aguardando_aprovacao', 'Aguardando aprovação do gerente');
-- =============================================================
-- CARROS
-- =============================================================

INSERT INTO carro (modelo_carro, placa_carro, situacao) VALUES
('Chevrolet Onix',   'ABC-1234', 'disponivel'),
('Volkswagen Polo',  'DEF-5678', 'disponivel'),
('Hyundai HB20',     'GHI-9012', 'disponivel'),
('Toyota Corolla',   'JKL-3456', 'disponivel'),
('Fiat Strada',      'MNO-7890', 'disponivel');
