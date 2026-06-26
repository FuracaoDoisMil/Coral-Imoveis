import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MostrarVendas(){

    const funcionario = JSON.parse(localStorage.getItem("funcionario"))
    const tipo = funcionario?.tipo_funcionario

    const [vendas, setVendas] = useState([])
    const [clientes, setClientes] = useState([])
    const [imoveis, setImoveis] = useState([])
    const [funcionarios, setFuncionarios] = useState([])

    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("id")

    const navigate = useNavigate()

    useEffect(() => {

        fetch("http://localhost:5000/vendas")
            .then(resposta => resposta.json())
            .then(dados => setVendas(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/clientes")
            .then(resposta => resposta.json())
            .then(dados => setClientes(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/imoveis")
            .then(resposta => resposta.json())
            .then(dados => setImoveis(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/funcionarios")
            .then(resposta => resposta.json())
            .then(dados => setFuncionarios(dados))
            .catch(erro => console.log("ERRO:", erro))

    }, [])

    return(

        <div>

            <h1>Vendas</h1>

            <div className="filtro-container">

                <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                >
                    <option value="id">ID</option>
                    <option value="cliente">Cliente</option>
                    <option value="status">Status</option>
                </select>

                <input
                    type="text"
                    placeholder="Pesquisar..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />

            </div>

            <div className="tabela-container">

                <table>

                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Imóvel</th>
                            <th>Cliente</th>
                            <th>Corretor</th>
                            <th>Valor</th>
                            <th>Forma Pagamento</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>

                        {vendas
                            .filter(venda => {

                                if(filtro === "id"){
                                    return venda.id_venda?.toString().includes(pesquisa)
                                }

                                if(filtro === "cliente"){
                                    const cliente = clientes.find(c => c.id_cliente === venda.id_cliente)
                                    const nomeCompleto = `${cliente?.nome ?? ""} ${cliente?.sobrenome ?? ""}`.toLowerCase()
                                    return nomeCompleto.includes(pesquisa.toLowerCase())
                                }

                                if(filtro === "status"){
                                    return venda.status?.toLowerCase().includes(pesquisa.toLowerCase())
                                }

                            })
                            .map(venda => {

                                const cliente = clientes.find(c => c.id_cliente === venda.id_cliente)
                                const imovel = imoveis.find(i => i.id_imovel === venda.id_imovel)
                                const corretor = funcionarios.find(f =>
                                    f.id_funcionario === venda.id_funcionario &&
                                    f.tipo_funcionario === "Corretor"
                                )

                                return(
                                    <tr key={venda.id_venda}>

                                        <td>{venda.id_venda}</td>
                                        <td>{imovel?.nome_imovel}</td>
                                        <td>{cliente?.nome} {cliente?.sobrenome}</td>
                                        <td>{corretor?.nome} {corretor?.sobrenome}</td>
                                        <td>R$ {venda.valor_venda}</td>
                                        <td>{venda.forma_pagamento}</td>
                                        <td>{venda.status}</td>

                                        <td>
                                            {(tipo === "Corretor" || tipo === "Gerente") && (
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/vendas/deletar-vendas/${venda.id_venda}`)
                                                    }
                                                >
                                                    Deletar
                                                </button>
                                            )}
                                        </td>

                                    </tr>
                                )

                            })}

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default MostrarVendas
