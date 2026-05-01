ALTER TABLE proprietarios
ADD situacao ENUM('ativo', 'inativo') NOT NULL;

ALTER TABLE carro
modify situacao ENUM('ativo', 'inativo') NOT NULL;

ALTER TABLE funcionarios
modify situacao ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo';
