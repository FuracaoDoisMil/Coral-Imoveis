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

CREATE TABLE carro(
    id_carro INT AUTO_INCREMENT PRIMARY KEY,
    modelo_carro VARCHAR(50) NOT NULL,
    placa_carro VARCHAR(8) UNIQUE NOT NULL,
    situacao ENUM('disponivel', 'indisponivel') NOT NULL
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
    situacao ENUM('ativo', 'inativo') NOT NULL
);

CREATE TABLE telefone(
    id_telefone INT AUTO_INCREMENT PRIMARY KEY,
    numero VARCHAR(20) NOT NULL,
    id_funcionario INT,
    id_proprietario INT,

    FOREIGN KEY (id_proprietario)
    REFERENCES proprietarios(id_proprietario)
    ON DELETE CASCADE,

    FOREIGN KEY (id_funcionario)
    REFERENCES funcionarios(id_funcionario)
    ON DELETE CASCADE,

    CHECK (
        (id_funcionario IS NOT NULL AND id_proprietario IS NULL)
        OR
        (id_funcionario IS NULL AND id_proprietario IS NOT NULL)
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

CREATE TABLE clientes(
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,

    nome VARCHAR(50) NOT NULL,
    sobrenome VARCHAR(50),

    sexo CHAR(1) NOT NULL,

    CPF CHAR(14) UNIQUE NOT NULL,

    dt_nascimento DATE NOT NULL,

    email VARCHAR(50) UNIQUE NOT NULL,
    senha VARCHAR(255) NOT NULL,

    telefone VARCHAR(20),

    situacao ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo'
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
