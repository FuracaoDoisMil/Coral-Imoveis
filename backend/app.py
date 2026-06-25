from werkzeug.utils import secure_filename
import os
from flask import Flask, request, send_from_directory
from flask_cors import CORS
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

UPLOAD_FOLDER = "uploads"

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

CORS(app)



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


@app.route("/imoveis/<int:id>", methods=["GET"])
def buscar_imovel(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM imoveis WHERE id_imovel = %s",
        (id,)
    )

    imovel = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not imovel:

        return {"erro": "Imóvel não encontrado"}, 404

    return imovel, 200


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
        dados.get("status", "disponivel"),
        dados.get("valor_locacao")or None,
        dados.get("valor_venda")or None,
        dados.get("quartos")or None,
        dados.get("suites")or None,
        dados.get("vagas_garagem")or None,
        dados.get("area")or None,
        dados.get("iptu")or None,
        dados.get("observacoes")
    ))

    conexao.commit()

    idImovel = cursor.lastrowid

    cursor.close()
    conexao.close()

    return {"mensagem": "Imóvel criado com sucesso ;D", "id_imovel":idImovel}


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
        dados.get("valor_locacao") or None,
        dados.get("valor_venda") or None,
        dados.get("quartos")or None,
        dados.get("suites")or None,
        dados.get("vagas_garagem")or None,
        dados.get("area")or None,
        dados.get("iptu")or None,
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

@app.route("/proprietarios/<int:id>", methods=["GET"])
def buscar_proprietario(id):
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM proprietarios WHERE id_proprietario = %s", (id,))

    proprietario = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not proprietario:
        return {"ERRO:", "Proprietario não encontrado :("}, 404
    return proprietario, 200

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
        dados.get("situacao", "ativo")
    ))

    conexao.commit()
    idProprietario = cursor.lastrowid
    cursor.close()
    conexao.close()

    return {"mensagem": "Proprietário criado com sucesso ;D", "id_proprietario":idProprietario}


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

@app.route("/funcionarios/<int:id>", methods=["GET"])
def buscar_funcionario(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)


    cursor.execute("SELECT * FROM funcionarios WHERE id_funcionario = %s", (id,))

    funcionario = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not funcionario:
        return {"erro": "Funcionário não encontrado :("}, 404

    return funcionario, 200


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
            senha,
            salario,
            situacao,
            CNH_numero,
            CNH_categoria,
            CNH_validade
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["tipo_funcionario"],
        dados["nome"],
        dados["sobrenome"],
        dados["sexo"],
        dados["CPF"],
        dados["dt_nascimento"],
        dados["email"],
        dados["senha"],
        dados["salario"],
        dados.get("situacao", "ativo"),
        dados["CNH_numero"],
        dados["CNH_categoria"],
        dados["CNH_validade"]
    ))

    conexao.commit()

    idFuncionario = cursor.lastrowid

    cursor.close()
    conexao.close()

    return {"mensagem": "Funcionário criado com sucesso ;D", "id_funcionario":idFuncionario}


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
        dados.get("situacao", "disponivel")
    ))

    conexao.commit()
    cursor.close()
    conexao.close()

    return {"mensagem": "Carro criado com sucesso ;D"}


@app.route("/carros/<int:id>", methods=["PUT"])
def atualizar_carro(id):
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    dados = request.json

    cursor.execute("SELECT * FROM carro WHERE id_carro = %s", (id,))
    carro = cursor.fetchone()

    if not carro:
        cursor.close()
        conexao.close()
        return {"erro": "Carro não encontrado"}, 404

    modelo = dados.get("modelo_carro") or carro["modelo_carro"]
    placa = dados.get("placa_carro") or carro["placa_carro"]
    situacao = dados.get("situacao") or carro["situacao"]

    cursor.execute("""
        UPDATE carro SET
            modelo_carro = %s,
            placa_carro = %s,
            situacao = %s
        WHERE id_carro = %s
    """, (modelo, placa, situacao, id))

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
# CRUD TELEFONES #
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

@app.route("/telefones/funcionarios/<int:id>", methods=["GET"])
def buscar_telefone_funcionario(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)


    cursor.execute("SELECT * FROM telefone WHERE id_funcionario = %s", (id,))

    telefone_funcionario = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not telefone_funcionario:
        return {"erro": "Telefone do funcionario não encontrado :("}, 404

    return telefone_funcionario, 200


@app.route("/telefones/proprietarios/<int:id>", methods=["GET"])
def buscar_telefone_proprietarios(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)


    cursor.execute("SELECT * FROM telefone WHERE id_proprietario = %s", (id,))

    telefone_proprietario = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not telefone_proprietario:
        return {"erro": "Telefone do proprietario não encontrado :("}, 404

    return telefone_proprietario, 200

@app.route("/telefones/clientes/<int:id>", methods=["GET"])
def buscar_telefone_clientes(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)


    cursor.execute("SELECT * FROM telefone WHERE id_cliente = %s", (id,))

    telefone_clientes = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not telefone_clientes:
        return {"erro": "Telefone do cliente não encontrado :("}, 404

    return telefone_clientes, 200


@app.route("/telefones", methods=["POST"])
def criar_telefone():
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        INSERT INTO telefone(
            numero,
            id_funcionario,
            id_proprietario,
            id_cliente
        )
        VALUES (%s, %s, %s, %s)
    """, (
        dados["numero"],
        dados.get("id_funcionario"),
        dados.get("id_proprietario"),
        dados.get("id_cliente")
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
            id_proprietario = %s,
            id_cliente= %s
        WHERE id_telefone = %s
    """, (
        dados["numero"],
        dados.get("id_funcionario"),
        dados.get("id_proprietario"),
        dados.get("id_cliente"),
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

@app.route("/clientes/<int:id>", methods=["GET"])
def buscar_cliente(id):
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM clientes WHERE id_cliente = %s", (id,))

    cliente = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not cliente:
        return {"Erro": "Cliente não encontrado :("}, 404

    return cliente, 200



@app.route("/clientes", methods=["POST"])
def criar_cliente():
    
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json
    
    print(dados)

    cursor.execute("""
        INSERT INTO clientes(
            nome,
            sobrenome,
            sexo,
            CPF,
            dt_nascimento,
            email,
            senha,
            situacao
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["nome"],
        dados["sobrenome"],
        dados["sexo"],
        dados["CPF"],
        dados["dt_nascimento"],
        dados["email"],
        dados["senha"],
        dados.get("situacao", "ativo")
    ))

    conexao.commit()
    idCliente = cursor.lastrowid
    cursor.close()
    conexao.close()

    return {"mensagem": "Cliente criado com sucesso ;D", "id_cliente": idCliente}


@app.route("/clientes/<int:id>", methods=["PUT"])
def atualizar_cliente(id):
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    dados = request.json

    cursor.execute("SELECT senha FROM clientes WHERE id_cliente = %s", (id,))
    cliente = cursor.fetchone()

    senha = dados.get("senha") or cliente["senha"]

    cursor.execute("""
        UPDATE clientes SET
            nome = %s,
            sobrenome = %s,
            sexo = %s,
            CPF = %s,
            dt_nascimento = %s,
            email = %s,
            senha = %s,
            situacao = %s
        WHERE id_cliente = %s
    """, (
        dados["nome"],
        dados["sobrenome"],
        dados["sexo"],
        dados["CPF"],
        dados["dt_nascimento"],
        dados["email"],
        senha,
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


@app.route("/visitas/<int:id>", methods=["GET"])
def buscar_visita(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM visitas WHERE id_visita = %s",
        (id,)
    )

    visita = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not visita:
        return {"Erro": "Visita não encontrada :("}, 404

    if visita["hora_visita"] is not None:
        visita["hora_visita"] = str(visita["hora_visita"])

    return visita, 200


@app.route("/visitas/<int:id>", methods=["POST"])
def criar_visita(id):
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
        dados.get("status", "aguardando visita"),
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
# CRUD VENDAS #
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


@app.route("/vendas/<int:id>", methods=["GET"])
def buscar_venda(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM vendas WHERE id_venda = %s",
        (id,)
    )

    venda = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not venda:

        return {"erro": "Venda não encontrada"}, 404

    return venda, 200


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

    id_venda = cursor.lastrowid

    cursor.execute("""
        INSERT INTO contratos(
            id_venda,
            id_funcionario,
            tipo_contrato,
            status,
            observacoes
        )
        VALUES (%s, %s, %s, %s, %s)
    """, (
        id_venda,
        dados["id_funcionario"],
        "venda",
        "aguardando_aprovacao",
        "Aguardando aprovação do gerente"
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {
        "mensagem": "Venda criada e enviada para aprovação"
    }


@app.route("/vendas/<int:id>", methods=["PUT"])
def atualizar_venda(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    
    cursor.execute("""
        SELECT status
        FROM vendas
        WHERE id_venda = %s
    """, (id,))

    venda = cursor.fetchone()

    if not venda:
        cursor.close()
        conexao.close()

        return {"erro": "Venda não encontrada"}, 404

    if venda["status"] in ["concluida", "nao_aprovada"]:

        cursor.close()
        conexao.close()

        return {
            "erro": "Não é possível editar uma venda concluída ou não aprovada"
        }, 400

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
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT status FROM vendas WHERE id_venda = %s", (id,))
    venda = cursor.fetchone()

    if not venda:
        cursor.close()
        conexao.close()
        return {"erro": "Venda não encontrada"}, 404

    if venda["status"] == "concluida":
        cursor.close()
        conexao.close()
        return {"erro": "Não é possível deletar uma venda concluída"}, 400

    cursor.execute("DELETE FROM vendas WHERE id_venda = %s", (id,))
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


@app.route("/locacoes/<int:id>", methods=["GET"])
def buscar_locacao(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM locacoes WHERE id_locacao = %s",
        (id,)
    )

    locacao = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not locacao:

        return {"erro": "Locação não encontrada"}, 404

    return locacao, 200



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
    
    id_locacao = cursor.lastrowid

    cursor.execute("""
        INSERT INTO contratos(
            id_locacao,
            id_funcionario,
            tipo_contrato,
            status,
            observacoes
        )
        VALUES (%s, %s, %s, %s, %s)
    """, (
        id_locacao,
        dados["id_funcionario"],
        "locacao",
        "aguardando_aprovacao",
        "Aguardando aprovação do gerente"
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {
        "mensagem": "Locacao criada e enviada para aprovação"
    }


@app.route("/locacoes/<int:id>", methods=["PUT"])
def atualizar_locacao(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    
    cursor.execute("""
        SELECT status
        FROM locacoes
        WHERE id_locacao = %s
    """, (id,))

    locacao = cursor.fetchone()

    if not locacao:
        cursor.close()
        conexao.close()

        return {"erro": "Locação não encontrada"}, 404

    if locacao["status"] in ["concluida", "nao_aprovada"]:

        cursor.close()
        conexao.close()

        return {
            "erro": "Não é possível editar uma locação concluída ou não aprovada"
        }, 400

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
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT status FROM locacoes WHERE id_locacao = %s", (id,))
    locacao = cursor.fetchone()

    if not locacao:
        cursor.close()
        conexao.close()
        return {"erro": "Locação não encontrada"}, 404

    if locacao["status"] == "concluida":
        cursor.close()
        conexao.close()
        return {"erro": "Não é possível deletar uma locação concluída"}, 400

    cursor.execute("DELETE FROM locacoes WHERE id_locacao = %s", (id,))
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


@app.route("/contratos/<int:id>", methods=["GET"])
def buscar_contrato(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM contratos WHERE id_contrato = %s",
        (id,)
    )

    contrato = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not contrato:

        return {"erro": "Contrato não encontrado"}, 404
    return contrato, 200



@app.route("/contratos/<int:id>/aprovar", methods=["PUT"])
def aprovar_contrato(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM contratos WHERE id_contrato = %s",
        (id,)
    )

    contrato = cursor.fetchone()

    
    if not contrato:

        cursor.close()
        conexao.close()

        return {"erro": "Contrato não encontrado"}, 404

    if contrato["status"] != "aguardando_aprovacao":

        cursor.close()
        conexao.close()

        return {
            "erro": "Contrato já foi processado"
        }, 400

    cursor.execute("""
        UPDATE contratos
        SET status = 'aprovado'
        WHERE id_contrato = %s
    """, (id,))

    if contrato["id_venda"]:

        cursor.execute("""
            UPDATE vendas
            SET status = 'concluida'
            WHERE id_venda = %s
        """, (contrato["id_venda"],))

        cursor.execute("""
            SELECT id_imovel
            FROM vendas
            WHERE id_venda = %s
        """, (contrato["id_venda"],))

        venda = cursor.fetchone()

        cursor.execute("""
            UPDATE imoveis
            SET status = 'vendido'
            WHERE id_imovel = %s
        """, (venda["id_imovel"],))

    elif contrato["id_locacao"]:

        cursor.execute("""
            UPDATE locacoes
            SET status = 'concluida'
            WHERE id_locacao = %s
        """, (contrato["id_locacao"],))

        cursor.execute("""
            SELECT id_imovel
            FROM locacoes
            WHERE id_locacao = %s
        """, (contrato["id_locacao"],))

        locacao = cursor.fetchone()

        cursor.execute("""
            UPDATE imoveis
            SET status = 'alugado'
            WHERE id_imovel = %s
        """, (locacao["id_imovel"],))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Contrato aprovado"}

@app.route("/contratos/<int:id>/rejeitar", methods=["PUT"])
def rejeitar_contrato(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM contratos WHERE id_contrato = %s",
        (id,)
    )

    contrato = cursor.fetchone()

    if not contrato:

        cursor.close()
        conexao.close()

        return {"erro": "Contrato não encontrado"}, 404


    if contrato["status"] != "aguardando_aprovacao":

        cursor.close()
        conexao.close()

        return {
            "erro": "Contrato já foi processado"
        }, 400

    cursor.execute("""
        UPDATE contratos
        SET status = 'rejeitado'
        WHERE id_contrato = %s
    """, (id,))

    if contrato["id_venda"]:

        cursor.execute("""
            UPDATE vendas
            SET status = 'nao_aprovada'
            WHERE id_venda = %s
        """, (contrato["id_venda"],))

    elif contrato["id_locacao"]:

        cursor.execute("""
            UPDATE locacoes
            SET status = 'nao_aprovada'
            WHERE id_locacao = %s
        """, (contrato["id_locacao"],))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Contrato rejeitado"}


@app.route("/contratos/<int:id>", methods=["DELETE"])
def deletar_contrato(id):
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT status FROM contratos WHERE id_contrato = %s", (id,))
    contrato = cursor.fetchone()

    if not contrato:
        cursor.close()
        conexao.close()
        return {"erro": "Contrato não encontrado"}, 404

    if contrato["status"] in ["aprovado", "rejeitado"]:
        cursor.close()
        conexao.close()
        return {"erro": "Não é possível deletar um contrato aprovado ou rejeitado"}, 400

    cursor.execute("DELETE FROM contratos WHERE id_contrato = %s", (id,))
    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Contrato deletado com sucesso"}

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



@app.route("/imagens-imoveis/<int:id>", methods=["GET"])
def buscar_imagem(id):

    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute(
        "SELECT * FROM imagens_imovel WHERE id_imagem = %s",
        (id,)
    )

    imagem = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not imagem:

        return {"erro": "Imagem não encontrada"}, 404

    return imagem, 200

@app.route("/imagens-imovel", methods=["POST"])
def criar_imagem():

    conexao = conectar_banco()
    cursor = conexao.cursor()

    id_imovel = request.form.get("id_imovel")

    imagem = request.files.get("imagem")

    if not imagem:

        return {"erro": "Nenhuma imagem enviada"}, 400

    nome_arquivo = secure_filename(imagem.filename)

    caminho_arquivo = os.path.join(
        app.config["UPLOAD_FOLDER"],
        nome_arquivo
    )

    imagem.save(caminho_arquivo)

    caminho_banco = f"uploads/{nome_arquivo}"

    cursor.execute("""
        INSERT INTO imagens_imovel(
            id_imovel,
            caminho_imagem
        )
        VALUES (%s, %s)
    """, (
        id_imovel,
        caminho_banco
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {
        "mensagem": "Imagem cadastrada com sucesso ;D",
        "caminho": caminho_banco
    }

@app.route("/imagens-imovel-capa", methods=["POST"])
def criar_imagem_capa():

    conexao = conectar_banco()
    cursor = conexao.cursor()

    id_imovel = request.form.get("id_imovel")

    imagem = request.files.get("imagem_capa")

    if not imagem:

        return {"erro": "Nenhuma imagem enviada"}, 400

    nome_arquivo = secure_filename(imagem.filename)

    caminho_arquivo = os.path.join(
        app.config["UPLOAD_FOLDER"],
        nome_arquivo
    )

    imagem.save(caminho_arquivo)

    caminho_banco = f"uploads/{nome_arquivo}"

    cursor.execute("""
        INSERT INTO imagens_imovel(
            id_imovel,
            caminho_imagem_capa
        )
        VALUES (%s, %s)
    """, (
        id_imovel,
        caminho_banco
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {
        "mensagem": "Imagem cadastrada com sucesso ;D",
        "caminho": caminho_banco
    }


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

@app.route("/imagens-imovel-capa/<int:id>", methods=["PUT"])
def atualizar_imagem_capa(id):
    conexao = conectar_banco()
    cursor = conexao.cursor()

    dados = request.json

    cursor.execute("""
        UPDATE imagens_imovel SET
            id_imovel = %s,
            caminho_imagem_capa = %s
        WHERE id_imagem = %s
    """, (
        dados["id_imovel"],
        dados["caminho_imagem_capa"],
        id
    ))

    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Imagem da capa atualizada com sucesso ;D"}


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

@app.route("/login", methods=["POST"])
def login():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    dados = request.json

    cursor.execute("""
        SELECT * FROM funcionarios
        WHERE email = %s AND senha = %s
    """, (
        dados["email"],
        dados["senha"]
    ))

    funcionario = cursor.fetchone()

    cursor.close()
    conexao.close()

    if not funcionario:
        return {"erro": "Email ou senha incorretos"}, 400

    return {
        "id_funcionario": funcionario["id_funcionario"],
        "nome": funcionario["nome"],
        "sobrenome": funcionario["sobrenome"],
        "tipo_funcionario": funcionario["tipo_funcionario"],
        "email": funcionario["email"]
    }, 200


@app.route("/uploads/<filename>")
def uploaded_file(filename):

    return send_from_directory(
        app.config["UPLOAD_FOLDER"],
        filename
    )

###############################################################################################
if __name__ == "__main__":
    app.run(host= "0.0.0.0", port=5000)

#if __name__ == "__main__":
 #   app.run(debug=True)
