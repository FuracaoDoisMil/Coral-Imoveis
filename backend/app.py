from flask import Flask, request
import mysql.connector


def conectar_banco():
    return mysql.connector.connect(
        host="127.0.0.1",
        port="3306",
        user="gustavo",
        password="Juranda22!!",
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
            bairro,
            cidade,
            estado,
            status,
            valor_locacao,
            valor_venda,
            quartos,
            suites,
            vagas_garagem,
            area
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, (
        dados["id_proprietario"],
        dados["id_funcionario"],
        dados["nome_imovel"],
        dados["tipo"],
        dados["cep"],
        dados["endereco"],
        dados["numero"],
        dados["bairro"],
        dados["cidade"],
        dados["estado"],
        dados["status"],
        dados["valor_locacao"],
        dados["valor_venda"],
        dados["quartos"],
        dados["suites"],
        dados["vagas_garagem"],
        dados["area"]
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
            bairro = %s,
            cidade = %s,
            estado = %s,
            status = %s,
            valor_locacao = %s,
            valor_venda = %s,
            quartos = %s,
            suites = %s,
            vagas_garagem = %s,
            area = %s
        WHERE id_imovel = %s
    """, (
        dados["nome_imovel"],
        dados["tipo"],
        dados["cep"],
        dados["endereco"],
        dados["numero"],
        dados["bairro"],
        dados["cidade"],
        dados["estado"],
        dados["status"],
        dados["valor_locacao"],
        dados["valor_venda"],
        dados["quartos"],
        dados["suites"],
        dados["vagas_garagem"],
        dados["area"],
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
            placa_carro
        )
        VALUES (%s, %s)
    """, (
        dados["modelo_carro"],
        dados["placa_carro"]
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
            placa_carro = %s
        WHERE id_carro = %s
    """, (
        dados["modelo_carro"],
        dados["placa_carro"],
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


#########################################################################################

if __name__ == "__main__":
    app.run(debug=True)
