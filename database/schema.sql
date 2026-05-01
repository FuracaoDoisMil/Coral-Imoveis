create table funcionarios(
id_funcionario int auto_increment primary key,
tipo_funcionario ENUM('Corretor', 'Secretario', 'Gerente') not null,
nome varchar(50) not null,
sobrenome varchar(50) not null,
sexo char(1) not null,
CPF char(14) UNIQUE not null,
dt_nascimento date not null,
email varchar(50),
salario decimal(10,2) not null,
situacao ENUM('ativo', 'nao_ativo') not null,
CNH_numero varchar(20),
CNH_categoria varchar(3),
CNH_validade date
);

create table carro(
id_carro int auto_increment primary key,
modelo_carro varchar(50) not null,
placa_carro varchar(8) unique not null
);

create table uso_do_carro(
id_registro int auto_increment primary key,
id_funcionario int not null,
id_carro int not null,
data_saida date not null,
hora_saida time not null, 
data_retorno date not null,
hora_retorno time not null,
observacoes text,

foreign key (id_funcionario) references funcionarios(id_funcionario),
foreign key (id_carro) references carro(id_carro) 
);

create table proprietarios(
id_proprietario int auto_increment primary key,
nome varchar(50) not null,
sobrenome varchar(50) not null,
sexo char(1) not null,
CPF char(14) UNIQUE,
CNPJ char(18) UNIQUE,
dt_nascimento date,
email varchar(50)
);

create table telefone(
id_telefone int auto_increment primary key,
numero varchar(20) not null,
id_funcionario int,
id_proprietario int,
foreign key (id_proprietario) references proprietarios(id_proprietario) on delete cascade,
foreign key (id_funcionario) references funcionarios(id_funcionario) on delete cascade,
CHECK (
    (id_funcionario IS NOT NULL AND id_proprietario IS NULL)
    OR
    (id_funcionario IS NULL AND id_proprietario IS NOT NULL)
)
);

create table imoveis(
id_imovel int auto_increment primary key,
id_proprietario int not null,
id_funcionario int not null,
nome_imovel VARCHAR(200) not null,
tipo VARCHAR(50) not null,
cep VARCHAR(10) not null,
endereco VARCHAR(150) not null,
numero VARCHAR(10) not null,
complemento VARCHAR(50),
bairro VARCHAR(50)not null,
cidade VARCHAR(50) not null,
estado VARCHAR(2) not null,
status ENUM('disponivel', 'alugado', 'vendido') not null,
valor_locacao DECIMAL(10,2),
valor_venda DECIMAL(10,2),
quartos INT,
suites INT,
vagas_garagem INT,
area FLOAT,
iptu DECIMAL(10,2),
observacoes TEXT,
criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
foreign key (id_proprietario) references proprietarios(id_proprietario),
foreign key (id_funcionario) references funcionarios(id_funcionario)
);
