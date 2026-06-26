import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function CadastrarVendas(){

    const { id } = useParams()
    const navigate = useNavigate()

    const [clientes, setClientes] = useState([])
    const [funcionarios, setFuncionarios] = useState([])

    const [idCliente, setIdCliente] = useState("")
    const [idFuncionario, setIdFuncionario] = useState("")
    const [valorVenda, setValorVenda] = useState("")
    const [formaPagamento, setFormaPagamento] = useState("")
    const [observacoes, setObservacoes] = useState("")

    useEffect(() => {

        fetch("http://localhost:5000/clientes")
            .then(resposta => resposta.json())
            .then(dados => setClientes(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/funcionarios")
            .then(resposta => resposta.json())
            .then(dados => setFuncionarios(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch(`http://localhost:5000/imoveis/${id}`)
            .then(resposta => resposta.json())
            .then(dados => setValorVenda(dados.valor_venda || ""))
            .catch(erro => console.log("ERRO:", erro))

    }, [])

    function cadastrarVenda(){

        fetch("http://localhost:5000/vendas", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_imovel: id,
                id_cliente: idCliente,
                id_funcionario: idFuncionario,
                valor_venda: valorVenda,
                forma_pagamento: formaPagamento,
                observacoes
            })
        })

        .then(resposta => resposta.json())

        .then(dados => {
            console.log(dados)
            alert("Venda cadastrada com sucesso! :D")
            navigate("/admin/vendas/mostrar-vendas")
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })

    }

    return(

        <div className="cadastro-container">

            <h1>Cadastrar Venda</h1>

            <div className="form-grid">

                <select
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                >
                    <option value="">Selecione o Cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id_cliente} value={cliente.id_cliente}>
                            {cliente.nome} {cliente.sobrenome}
                        </option>
                    ))}
                </select>

                <select
                    value={idFuncionario}
                    onChange={(e) => setIdFuncionario(e.target.value)}
                >
                    <option value="">Selecione o Corretor</option>
                {funcionarios
                    .filter(funcionario => funcionario.tipo_funcionario === "Corretor")
                    .map(funcionario => (
                        <option key={funcionario.id_funcionario} value={funcionario.id_funcionario}>
                            {funcionario.nome} {funcionario.sobrenome}
                        </option>
                    ))}
                </select>

                <input
                    type="number"
                    placeholder="Valor Venda"
                    value={valorVenda}
                    onChange={(e) => setValorVenda(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Forma de Pagamento"
                    value={formaPagamento}
                    onChange={(e) => setFormaPagamento(e.target.value)}
                />

                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />

            </div>

            <button
                className="botao-cadastrar"
                onClick={cadastrarVenda}
            >
                Cadastrar
            </button>

        </div>

    )

}

export default CadastrarVendas
