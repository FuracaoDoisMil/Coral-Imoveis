ALTER TABLE proprietarios
modify situacao ENUM('ativo', 'inativo') NOT NULL;

ALTER TABLE carro
ADD situacao ENUM('disponivel', 'indisponivel') NOT NULL;

ALTER TABLE funcionarios
modify situacao ENUM('ativo', 'inativo') NOT NULL DEFAULT 'ativo';
