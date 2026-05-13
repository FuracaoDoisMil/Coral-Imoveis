from flask import Flask, request
import mysql.connector


def conectar_banco():
    return mysql.connector.connect(
        host="mysql",
        port="3306",
        user="root",
        password="root",
        database="imobiliaria"
    )


app = Flask(__name__)


@app.route("/")
def home():
    return "Backend Coral Imóveis funcionando!"


#########################################################################################
# CRUD IMOVEIS #
#########################################################################################

@app.route("/imoveis", methods=["GET"])
def listar_imoveis():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM imoveis")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/imoveis", methods=["POST"])
def criar_imovel():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO imoveis(
            id_proprietario,
            id_funcionario,
            nome_imovel,
            tipo,
            cep,
            endereco,
            numero,
            complemento,
            bairro,
            cidade,
            estado,
            status,
            valor_locacao,
            valor_venda,
            quartos,
            suites,
            vagas_garagem,
            area,
            iptu,
            observacoes
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["id_proprietario"],
        dados["id_funcionario"],
        dados["nome_imovel"],
        dados["tipo"],
        dados["cep"],
        dados["endereco"],
        dados["numero"],
        dados.get("complemento"),
        dados["bairro"],
        dados["cidade"],
        dados["estado"],
        dados["status"],
        dados.get("valor_locacao"),
        dados.get("valor_venda"),
        dados.get("quartos"),
        dados.get("suites"),
        dados.get("vagas_garagem"),
        dados.get("area"),
        dados.get("iptu"),
        dados.get("observacoes")
    ))

    conexao.commit()
    cursor.close()
    conexao.close()

    return {"mensagem": "Imóvel criado com sucesso ;D"}


@app.route("/imoveis/<int:id>", methods=["PUT"])
def atualizar_imovel(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE imoveis SET
            nome_imovel = %s,
            tipo = %s,
            cep = %s,
            endereco = %s,
            numero = %s,
            complemento = %s,
            bairro = %s,
            cidade = %s,
            estado = %s,
            status = %s,
            valor_locacao = %s,
            valor_venda = %s,
            quartos = %s,
            suites = %s,
            vagas_garagem = %s,
            area = %s,
            iptu = %s,
            observacoes = %s
        WHERE id_imovel = %s
    """, (
        dados["nome_imovel"],
        dados["tipo"],
        dados["cep"],
        dados["endereco"],
        dados["numero"],
        dados.get("complemento"),
        dados["bairro"],
        dados["cidade"],
        dados["estado"],
        dados["status"],
        dados.get("valor_locacao"),
        dados.get("valor_venda"),
        dados.get("quartos"),
        dados.get("suites"),
        dados.get("vagas_garagem"),
        dados.get("area"),
        dados.get("iptu"),
        dados.get("observacoes"),
        id
    ))

    conexao.commit()
    cursor.close()
    conexao.close()

    return {"mensagem": "Imóvel atualizado com sucesso ;D"}

@app.route("/imoveis/<int:id>", methods=["DELETE"])
def deletar_imovel(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM imoveis WHERE id_imovel = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Imóvel removido com sucesso ;D"}


#########################################################################################
# CRUD PROPRIETARIOS #
#########################################################################################

@app.route("/proprietarios", methods=["GET"])
def listar_proprietarios():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM proprietarios")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/proprietarios", methods=["POST"])
def criar_proprietario():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO proprietarios(
            nome,
            sobrenome,
            sexo,
            CPF,
            CNPJ,
            dt_nascimento,
            email,
            situacao
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["nome"],
        dados["sobrenome"],
        dados["sexo"],
        dados["CPF"],
        dados["CNPJ"],
        dados["dt_nascimento"],
        dados["email"],
        dados["situacao"]
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Proprietário criado com sucesso ;D"}


@app.route("/proprietarios/<int:id>", methods=["PUT"])
def atualizar_proprietario(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE proprietarios SET
            nome = %s,
            sobrenome = %s,
            sexo = %s,
            CPF = %s,
            CNPJ = %s,
            dt_nascimento = %s,
            email = %s,
            situacao = %s
        WHERE id_proprietario = %s
    """, (
        dados["nome"],
        dados["sobrenome"],
        dados["sexo"],
        dados["CPF"],
        dados["CNPJ"],
        dados["dt_nascimento"],
        dados["email"],
        dados["situacao"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Proprietário atualizado com sucesso ;D"}


@app.route("/proprietarios/<int:id>", methods=["DELETE"])
def deletar_proprietario(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM proprietarios WHERE id_proprietario = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Proprietário removido com sucesso ;D"}


#########################################################################################
# CRUD FUNCIONARIOS #
#########################################################################################

@app.route("/funcionarios", methods=["GET"])
def listar_funcionarios():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM funcionarios")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/funcionarios", methods=["POST"])
def criar_funcionario():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO funcionarios(
            tipo_funcionario,
            nome,
            sobrenome,
            sexo,
            CPF,
            dt_nascimento,
            email,
            salario,
            situacao,
            CNH_numero,
            CNH_categoria,
            CNH_validade
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["tipo_funcionario"],
        dados["nome"],
        dados["sobrenome"],
        dados["sexo"],
        dados["CPF"],
        dados["dt_nascimento"],
        dados["email"],
        dados["salario"],
        dados["situacao"],
        dados["CNH_numero"],
        dados["CNH_categoria"],
        dados["CNH_validade"]
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Funcionário criado com sucesso ;D"}


@app.route("/funcionarios/<int:id>", methods=["PUT"])
def atualizar_funcionario(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE funcionarios SET
            tipo_funcionario = %s,
            nome = %s,
            sobrenome = %s,
            sexo = %s,
            CPF = %s,
            dt_nascimento = %s,
            email = %s,
            salario = %s,
            situacao = %s,
            CNH_numero = %s,
            CNH_categoria = %s,
            CNH_validade = %s
        WHERE id_funcionario = %s
    """, (
        dados["tipo_funcionario"],
        dados["nome"],
        dados["sobrenome"],
        dados["sexo"],
        dados["CPF"],
        dados["dt_nascimento"],
        dados["email"],
        dados["salario"],
        dados["situacao"],
        dados["CNH_numero"],
        dados["CNH_categoria"],
        dados["CNH_validade"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Funcionário atualizado com sucesso ;D"}


@app.route("/funcionarios/<int:id>", methods=["DELETE"])
def deletar_funcionario(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM funcionarios WHERE id_funcionario = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Funcionário removido com sucesso ;D"}


#########################################################################################
# CRUD CARROS #
#########################################################################################

@app.route("/carros", methods=["GET"])
def listar_carros():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM carro")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/carros", methods=["POST"])
def criar_carro():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO carro(
            modelo_carro,
            placa_carro,
            situacao
        )
        VALUES (%s, %s, %s)
    """, (
        dados["modelo_carro"],
        dados["placa_carro"],
        dados["situacao"]
    ))

    conexao.commit()
    cursor.close()
    conexao.close()

    return {"mensagem": "Carro criado com sucesso ;D"}


@app.route("/carros/<int:id>", methods=["PUT"])
def atualizar_carro(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE carro SET
            modelo_carro = %s,
            placa_carro = %s,
            situacao = %s
        WHERE id_carro = %s
    """, (
        dados["modelo_carro"],
        dados["placa_carro"],
        dados["situacao"],
        id
    ))

    conexao.commit()
    cursor.close()
    conexao.close()

    return {"mensagem": "Carro atualizado com sucesso ;D"}


@app.route("/carros/<int:id>", methods=["DELETE"])
def deletar_carro(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM carro WHERE id_carro = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Carro removido com sucesso ;D"}


#########################################################################################
# CRUD USO DO CARRO #
#########################################################################################

@app.route("/uso-carro", methods=["GET"])
def listar_uso_carro():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM uso_do_carro")
    resultados = cursor.fetchall()

    for uso in resultados:

        if uso["hora_saida"] is not None:
            uso["hora_saida"] = str(uso["hora_saida"])

        if uso["hora_retorno"] is not None:
            uso["hora_retorno"] = str(uso["hora_retorno"])

    cursor.close()
    conexao.close()

    return resultados


@app.route("/uso-carro", methods=["POST"])
def criar_uso_carro():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO uso_do_carro(
            id_funcionario,
            id_carro,
            data_saida,
            hora_saida,
            data_retorno,
            hora_retorno,
            observacoes
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["id_funcionario"],
        dados["id_carro"],
        dados["data_saida"],
        dados["hora_saida"],
        dados["data_retorno"],
        dados["hora_retorno"],
        dados["observacoes"]
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Registro de uso criado com sucesso ;D"}


@app.route("/uso-carro/<int:id>", methods=["PUT"])
def atualizar_uso_carro(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE uso_do_carro SET
            id_funcionario = %s,
            id_carro = %s,
            data_saida = %s,
            hora_saida = %s,
            data_retorno = %s,
            hora_retorno = %s,
            observacoes = %s
        WHERE id_registro = %s
    """, (
        dados["id_funcionario"],
        dados["id_carro"],
        dados["data_saida"],
        dados["hora_saida"],
        dados["data_retorno"],
        dados["hora_retorno"],
        dados["observacoes"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Registro atualizado com sucesso ;D"}


@app.route("/uso-carro/<int:id>", methods=["DELETE"])
def deletar_uso_carro(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM uso_do_carro WHERE id_registro = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Registro removido com sucesso ;D"}


#########################################################################################
#CRUD TELEFONES #
#########################################################################################

@app.route("/telefones", methods=["GET"])
def listar_telefones():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM telefone")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/telefones", methods=["POST"])
def criar_telefone():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO telefone(
            numero,
            id_funcionario,
            id_proprietario
        )
        VALUES (%s, %s, %s)
    """, (
        dados["numero"],
        dados.get("id_funcionario"),
        dados.get("id_proprietario")
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Telefone criado com sucesso ;D"}


@app.route("/telefones/<int:id>", methods=["PUT"])
def atualizar_telefone(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE telefone SET
            numero = %s,
            id_funcionario = %s,
            id_proprietario = %s
        WHERE id_telefone = %s
    """, (
        dados["numero"],
        dados.get("id_funcionario"),
        dados.get("id_proprietario"),
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Telefone atualizado com sucesso ;D"}


@app.route("/telefones/<int:id>", methods=["DELETE"])
def deletar_telefone(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM telefone WHERE id_telefone = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Telefone removido com sucesso ;D"}

###############################################################################################
# CRUD CLIENTES #
###############################################################################################

@app.route("/clientes", methods=["GET"])
def listar_clientes():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM clientes")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/clientes", methods=["POST"])
def criar_cliente():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO clientes(
            nome,
            sobrenome,
            sexo,
            CPF,
            dt_nascimento,
            email,
            senha,
            telefone,
            situacao
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["nome"],
        dados["sobrenome"],
        dados["sexo"],
        dados["CPF"],
        dados["dt_nascimento"],
        dados["email"],
        dados["senha"],
        dados["telefone"],
        dados["situacao"]
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Cliente criado com sucesso ;D"}


@app.route("/clientes/<int:id>", methods=["PUT"])
def atualizar_cliente(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE clientes SET
            nome = %s,
            sobrenome = %s,
            sexo = %s,
            CPF = %s,
            dt_nascimento = %s,
            email = %s,
            senha = %s,
            telefone = %s,
            situacao = %s
        WHERE id_cliente = %s
    """, (
        dados["nome"],
        dados["sobrenome"],
        dados["sexo"],
        dados["CPF"],
        dados["dt_nascimento"],
        dados["email"],
        dados["senha"],
        dados["telefone"],
        dados["situacao"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Cliente atualizado com sucesso ;D"}


@app.route("/clientes/<int:id>", methods=["DELETE"])
def deletar_cliente(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM clientes WHERE id_cliente = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Cliente removido com sucesso ;D"}


###############################################################################################
# CRUD VISITAS #
###############################################################################################


@app.route("/visitas", methods=["GET"])
def listar_visitas():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM visitas")
    resultados = cursor.fetchall()

    for visita in resultados:

        if visita["hora_visita"] is not None:
            visita["hora_visita"] = str(visita["hora_visita"])

    cursor.close()
    conexao.close()

    return resultados


@app.route("/visitas", methods=["POST"])
def criar_visita():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO visitas(
            id_cliente,
            id_imovel,
            id_funcionario,
            data_visita,
            hora_visita,
            status,
            observacoes
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["id_cliente"],
        dados["id_imovel"],
        dados["id_funcionario"],
        dados["data_visita"],
        dados["hora_visita"],
        dados["status"],
        dados["observacoes"]
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Visita criada com sucesso ;D"}


@app.route("/visitas/<int:id>", methods=["PUT"])
def atualizar_visita(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE visitas SET
            id_cliente = %s,
            id_imovel = %s,
            id_funcionario = %s,
            data_visita = %s,
            hora_visita = %s,
            status = %s,
            observacoes = %s
        WHERE id_visita = %s
    """, (
        dados["id_cliente"],
        dados["id_imovel"],
        dados["id_funcionario"],
        dados["data_visita"],
        dados["hora_visita"],
        dados["status"],
        dados["observacoes"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Visita atualizada com sucesso ;D"}


@app.route("/visitas/<int:id>", methods=["DELETE"])
def deletar_visita(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM visitas WHERE id_visita = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Visita removida com sucesso ;D"}


###############################################################################################
#CRUD VENDAS #
###############################################################################################

@app.route("/vendas", methods=["GET"])
def listar_vendas():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM vendas")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/vendas", methods=["POST"])
def criar_venda():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO vendas(
            id_imovel,
            id_cliente,
            id_funcionario,
            valor_venda,
            forma_pagamento,
            observacoes
        )
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        dados["id_imovel"],
        dados["id_cliente"],
        dados["id_funcionario"],
        dados["valor_venda"],
        dados["forma_pagamento"],
        dados["observacoes"]
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Venda criada com sucesso ;D"}


@app.route("/vendas/<int:id>", methods=["PUT"])
def atualizar_venda(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE vendas SET
            id_imovel = %s,
            id_cliente = %s,
            id_funcionario = %s,
            valor_venda = %s,
            forma_pagamento = %s,
            observacoes = %s
        WHERE id_venda = %s
    """, (
        dados["id_imovel"],
        dados["id_cliente"],
        dados["id_funcionario"],
        dados["valor_venda"],
        dados["forma_pagamento"],
        dados["observacoes"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Venda atualizada com sucesso ;D"}


@app.route("/vendas/<int:id>", methods=["DELETE"])
def deletar_venda(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM vendas WHERE id_venda = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Venda removida com sucesso ;D"}


###############################################################################################
# CRUD LOCACOES #
###############################################################################################

@app.route("/locacoes", methods=["GET"])
def listar_locacoes():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM locacoes")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/locacoes", methods=["POST"])
def criar_locacao():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO locacoes(
            id_imovel,
            id_cliente,
            id_funcionario,
            valor_aluguel,
            forma_pagamento,
            data_entrada,
            data_saida,
            observacoes
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["id_imovel"],
        dados["id_cliente"],
        dados["id_funcionario"],
        dados["valor_aluguel"],
        dados["forma_pagamento"],
        dados["data_entrada"],
        dados["data_saida"],
        dados["observacoes"]
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Locação criada com sucesso ;D"}


@app.route("/locacoes/<int:id>", methods=["PUT"])
def atualizar_locacao(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE locacoes SET
            id_imovel = %s,
            id_cliente = %s,
            id_funcionario = %s,
            valor_aluguel = %s,
            forma_pagamento = %s,
            data_entrada = %s,
            data_saida = %s,
            observacoes = %s
        WHERE id_locacao = %s
    """, (
        dados["id_imovel"],
        dados["id_cliente"],
        dados["id_funcionario"],
        dados["valor_aluguel"],
        dados["forma_pagamento"],
        dados["data_entrada"],
        dados["data_saida"],
        dados["observacoes"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Locação atualizada com sucesso ;D"}


@app.route("/locacoes/<int:id>", methods=["DELETE"])
def deletar_locacao(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM locacoes WHERE id_locacao = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Locação removida com sucesso ;D"}


###############################################################################################
# CRUD CONTRATOS #
###############################################################################################

@app.route("/contratos", methods=["GET"])
def listar_contratos():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM contratos")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/contratos", methods=["POST"])
def criar_contrato():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO contratos(
            id_venda,
            id_locacao,
            id_funcionario,
            tipo_contrato,
            status,
            observacoes
        )
        VALUES (%s, %s, %s, %s, %s, %s)
    """, (
        dados["id_venda"],
        dados["id_locacao"],
        dados["id_funcionario"],
        dados["tipo_contrato"],
        dados["status"],
        dados["observacoes"]
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Contrato criado com sucesso ;D"}


@app.route("/contratos/<int:id>", methods=["PUT"])
def atualizar_contrato(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE contratos SET
            id_venda = %s,
            id_locacao = %s,
            id_funcionario = %s,
            tipo_contrato = %s,
            status = %s,
            observacoes = %s
        WHERE id_contrato = %s
    """, (
        dados["id_venda"],
        dados["id_locacao"],
        dados["id_funcionario"],
        dados["tipo_contrato"],
        dados["status"],
        dados["observacoes"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Contrato atualizado com sucesso ;D"}


@app.route("/contratos/<int:id>", methods=["DELETE"])
def deletar_contrato(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM contratos WHERE id_contrato = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Contrato removido com sucesso ;D"}

###############################################################################################
# CRUD IMAGENS IMOVEL #
###############################################################################################

@app.route("/imagens-imovel", methods=["GET"])
def listar_imagens():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM imagens_imovel")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/imagens-imovel", methods=["POST"])
def criar_imagem():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO imagens_imovel(
            id_imovel,
            caminho_imagem
        )
        VALUES (%s, %s)
    """, (
        dados["id_imovel"],
        dados["caminho_imagem"]
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Imagem cadastrada com sucesso ;D"}


@app.route("/imagens-imovel/<int:id>", methods=["PUT"])
def atualizar_imagem(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE imagens_imovel SET
            id_imovel = %s,
            caminho_imagem = %s
        WHERE id_imagem = %s
    """, (
        dados["id_imovel"],
        dados["caminho_imagem"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Imagem atualizada com sucesso ;D"}


@app.route("/imagens-imovel/<int:id>", methods=["DELETE"])
def deletar_imagem(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    cursor.execute(
        "DELETE FROM imagens_imovel WHERE id_imagem = %s",
        (id,)
    )

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Imagem removida com sucesso ;D"}
###############################################################################################
if __name__ == "__main__":
    app.run(host= "0.0.0.0", port=5000)

#if __name__ == "__main__":
 #   app.run(debug=True)
