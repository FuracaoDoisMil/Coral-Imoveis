# Coral-Imoveis
O sistema web Coral Imóveis foi desenvolvido para apoiar as operações de uma imobiliária, facilitando o cadastro, gerenciamento
e divulgação de imóveis. A plataforma permite que clientes pesquisem imóveis por critérios como localização e preço, além de
melhorar a comunicação entre proprietários, imobiliária e interessados.



## Sprint 1 - Banco de Dados

Nesta sprint foi realizada a modelagem e implementação do banco de dados do sistema Coral Imóveis.

Tecnologias utilizadas:
- Drawn io para modelagem
- MySQL para implementar

link draw io: https://app.diagrams.net/?src=about#G1lnbsQH9lx0dL4dSxK_H8qxlG1tE5G8Nc#%7B%22pageId%22%3A%22AUfY-F-8shRYOGWNNcv1%22%7D

Funcionalidades implementadas:
- Cadastro de funcionários
- Cadastro de proprietários
- Cadastro de imóveis
- Controle de uso de veículos
- Cadastro de telefones

Como executar:
1. Executar o arquivo database/schema.sql
2. Executar o arquivo database/alteracoes.sql
3. Executar o arquivo database/insercoes.sql (opcional)



# Sprint 2 - Backend e Banco de Dados

## O que foi desenvolvido

- Configuração do ambiente backend com Flask
- Conexão do backend com MySQL
- Criação da rota inicial para testes
- Implementação dos CRUDs:
  - Imóveis
  - Proprietários
  - Funcionários
  - Carros
  - Uso do carro
  - Telefones
- Testes dos endpoints utilizando Thunder Client
- Criação do arquivo requirements.txt
- Dockerização da aplicação com:
  - Dockerfile
  - docker-compose.yml
  - init.sql

## Tecnologias utilizadas

- Python
- Flask
- MySQL
- Docker
- Git/GitHub

## Resultado

O backend da imobiliária está funcionando com integração ao banco de dados, execução via Docker e endpoints CRUD operando corretamente.


## Como executar:
-no terminal, escreva: docker-compose up






