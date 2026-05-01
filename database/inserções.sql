#inserções para testes, pedi para o chatgpt gerar as inserções;

INSERT INTO funcionarios 
(tipo_funcionario, nome, sobrenome, sexo, CPF, dt_nascimento, email, salario, situacao)
VALUES
('Corretor', 'João', 'Silva', 'M', '123.456.789-00', '1990-05-10', 'joao@email.com', 3000.00, 'ativo'),
('Secretario', 'Maria', 'Souza', 'F', '987.654.321-00', '1985-08-20', 'maria@email.com', 2500.00, 'ativo'),
('Gerente', 'Carlos', 'Oliveira', 'M', '111.222.333-44', '1980-02-15', 'carlos@email.com', 5000.00, 'ativo');

INSERT INTO carro (modelo_carro, placa_carro, situacao)
VALUES
('Fiat Uno', 'ABC1234', 'disponivel'),
('Toyota Corolla', 'XYZ5678', 'indisponivel');

INSERT INTO proprietarios 
(nome, sobrenome, sexo, CPF, dt_nascimento, email, situacao)
VALUES
('Ana', 'Pereira', 'F', '222.333.444-55', '1992-07-12', 'ana@email.com', 'ativo');

-- Exemplo PJ
INSERT INTO proprietarios 
(nome, sobrenome, sexo, CNPJ, email, situacao)
VALUES
('Empresa', 'LTDA', 'M', '12.345.678/0001-99', 'empresa@email.com', 'ativo');

-- telefone de funcionário
INSERT INTO telefone (numero, id_funcionario)
VALUES
('(44) 99999-1111', 1);

-- telefone de proprietário
INSERT INTO telefone (numero, id_proprietario)
VALUES
('(44) 98888-2222', 1);

INSERT INTO imoveis (
id_proprietario, id_funcionario, nome_imovel, tipo, cep, endereco, numero, 
bairro, cidade, estado, status, valor_venda, quartos, suites, vagas_garagem, area
)
VALUES
(1, 1, 'Casa Jardim', 'Casa', '87300-000', 'Rua das Flores', '123',
'Centro', 'Campo Mourão', 'PR', 'disponivel', 350000.00, 3, 1, 2, 120.5);
