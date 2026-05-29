import { useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function CadastrarLocacoes(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [idCliente, setIdCliente] = useState("")
    const [idFuncionario, setIdFuncionario] = useState("")
    const [valorAluguel, setValorAluguel] = useState("")
    const [formaPagamento, setFormaPagamento] = useState("")
    const [dataEntrada, setDataEntrada] = useState("")
    const [dataSaida, setDataSaida] = useState("")
    const [status, setStatus] = useState("aguardando_aprovacao")
    const [observacoes, setObservacoes] = useState("")

    function cadastrarLocacao(){

        fetch("http://localhost:5000/locacoes", {

            method: "POST",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                id_imovel: id,
                id_cliente: idCliente,
                id_funcionario: idFuncionario,
                valor_aluguel: valorAluguel,
                forma_pagamento: formaPagamento,
                data_entrada: dataEntrada,
                data_saida: dataSaida,
                status,
                observacoes

            })

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Locação cadastrada!")

            navigate("/locacoes/mostrar-locacoes")

        })

        .catch(erro => {

            console.log("ERRO:", erro)

        })

    }

    return(

        <div className="cadastro-container">

            <h1>Cadastrar Locação</h1>

            <div className="form-grid">

                <input
                    type="number"
                    placeholder="ID Cliente"
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="ID Funcionário"
                    value={idFuncionario}
                    onChange={(e) => setIdFuncionario(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="Valor Aluguel"
                    value={valorAluguel}
                    onChange={(e) => setValorAluguel(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Forma de Pagamento"
                    value={formaPagamento}
                    onChange={(e) => setFormaPagamento(e.target.value)}
                />

                <input
                    type="date"
                    value={dataEntrada}
                    onChange={(e) => setDataEntrada(e.target.value)}
                />

                <input
                    type="date"
                    value={dataSaida}
                    onChange={(e) => setDataSaida(e.target.value)}
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >

                    <option value="aguardando_aprovacao">
                        aguardando_aprovacao
                    </option>

                    <option value="concluida">
                        concluida
                    </option>

                    <option value="cancelada">
                        cancelada
                    </option>

                    <option value="nao_aprovada">
                        nao_aprovada
                    </option>

                </select>

                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />

            </div>

            <button
                className="botao-cadastrar"
                onClick={cadastrarLocacao}
            >
                Cadastrar
            </button>

        </div>

    )

}

export default CadastrarLocacoes