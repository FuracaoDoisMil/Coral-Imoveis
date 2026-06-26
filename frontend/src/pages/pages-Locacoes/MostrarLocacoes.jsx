import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MostrarLocacoes(){
    const funcionario = JSON.parse(localStorage.getItem("funcionario"))
    const tipo = funcionario?.tipo_funcionario

    const [locacoes, setLocacoes] = useState([])
    const [clientes, setClientes] = useState([])
    const [imoveis, setImoveis] = useState([])
    const [funcionarios, setFuncionarios] = useState([])

    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("id")

    const navigate = useNavigate()

    useEffect(() => {

        fetch("http://localhost:5000/locacoes")
            .then(resposta => resposta.json())
            .then(dados => setLocacoes(dados))
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

            <h1>Locações</h1>

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

                        {locacoes
                            .filter(locacao => {

                                if(filtro === "id"){
                                    return locacao.id_locacao?.toString().includes(pesquisa)
                                }

                                if(filtro === "cliente"){
                                    const cliente = clientes.find(c => c.id_cliente === locacao.id_cliente)
                                    const nomeCompleto = `${cliente?.nome ?? ""} ${cliente?.sobrenome ?? ""}`.toLowerCase()
                                    return nomeCompleto.includes(pesquisa.toLowerCase())
                                }

                                if(filtro === "status"){
                                    return locacao.status?.toLowerCase().includes(pesquisa.toLowerCase())
                                }

                            })
                            .map(locacao => {

                                const cliente = clientes.find(c => c.id_cliente === locacao.id_cliente)
                                const imovel = imoveis.find(i => i.id_imovel === locacao.id_imovel)
                                const corretor = funcionarios.find(f =>
                                    f.id_funcionario === locacao.id_funcionario &&
                                    f.tipo_funcionario === "Corretor"
                                )

                                return(
                                    <tr key={locacao.id_locacao}>

                                        <td>{locacao.id_locacao}</td>
                                        <td>{imovel?.nome_imovel}</td>
                                        <td>{cliente?.nome} {cliente?.sobrenome}</td>
                                        <td>{corretor?.nome} {corretor?.sobrenome}</td>
                                        <td>R$ {locacao.valor_aluguel}</td>
                                        <td>{locacao.forma_pagamento}</td>
                                        <td>{locacao.status}</td>

                                        <td>
                                            {(tipo === "Corretor" || tipo === "Gerente") && (
                                                <button
                                                    onClick={() =>
                                                        navigate(`/admin/locacoes/deletar-locacoes/${locacao.id_locacao}`)
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

export default MostrarLocacoes
