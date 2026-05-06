#Necessario implementar os outros cruds

from flask import Flask, request
import mysql.connector

def conectar_banco():
    return mysql.connector.connect(
        host= "127.0.0.1",
        port= "3306",
        user = "root",
        password = "root",
        database = "Imobiliaria"
    )

app = Flask(__name__)

@app.route("/")
def home():
    return "Backend Coral Imóveis funcionando!"


@app.route("/imoveis", methods = ["GET"])
def listar_imoveis():
    conexao = conectar_banco()
    cursor = conexao.cursor(dictionary=True)

    cursor.execute("SELECT * FROM imoveis")
    resultados = cursor.fetchall()

    cursor.close()
    conexao.close()

    return resultados


@app.route("/imoveis", methods = ["POST"])
def criar_imovel():
    conexao =  conectar_banco()
    cursor = conexao.cursor()
    
    dados = request.json
   
    cursor.execute("""
                   INSERT INTO imoveis(
                   id_proprietario, id_funcionario, nome_imovel, tipo, cep, 
                   endereco, numero, bairro, cidade, estado, status, 
                   valor_venda, quartos, suites, vagas_garagem, area
                   )VALUES ((%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)""",(
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
                       dados["valor_venda"],
                       dados["quartos"],
                       dados["suites"],
                       dados["vagas_garagem"],
                       dados["area"]
                   ))
    conexao.commit()

    cursor.close()
    conexao.close()

    return {"mensagem": "Imovel criado com sucesso ;D"}




if __name__ == "__main__":
    app.run(debug=True)
