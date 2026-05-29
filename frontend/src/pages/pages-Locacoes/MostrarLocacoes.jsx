import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MostrarLocacoes(){

    const [locacoes, setLocacoes] = useState([])

    const [pesquisa, setPesquisa] = useState("")

    const [filtro, setFiltro] = useState("id")

    const navigate = useNavigate()

    useEffect(() => {

        fetch("http://localhost:5000/locacoes")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setLocacoes(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

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
                            <th>ID Imóvel</th>
                            <th>ID Cliente</th>
                            <th>ID Funcionário</th>
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

                                    return locacao.id_locacao
                                        ?.toString()
                                        .includes(pesquisa)

                                }

                                if(filtro === "cliente"){

                                    return locacao.id_cliente
                                        ?.toString()
                                        .includes(pesquisa)

                                }

                                if(filtro === "status"){

                                    return locacao.status
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())

                                }

                            })

                            .map(locacao => {

                                return(

                                    <tr key={locacao.id_locacao}>

                                        <td>{locacao.id_locacao}</td>

                                        <td>{locacao.id_imovel}</td>

                                        <td>{locacao.id_cliente}</td>

                                        <td>{locacao.id_funcionario}</td>

                                        <td>
                                            R$ {locacao.valor_aluguel}
                                        </td>

                                        <td>{locacao.forma_pagamento}</td>

                                        <td>{locacao.status}</td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    navigate(`/locacoes/atualizar-locacoes/${locacao.id_locacao}`)
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(`/locacoes/deletar-locacoes/${locacao.id_locacao}`)
                                                }
                                            >
                                                Deletar
                                            </button>

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