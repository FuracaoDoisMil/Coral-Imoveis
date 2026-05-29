import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MostrarVendas(){

    const [vendas, setVendas] = useState([])

    const [pesquisa, setPesquisa] = useState("")

    const [filtro, setFiltro] = useState("id")

    const navigate = useNavigate()

    useEffect(() => {

        fetch("http://localhost:5000/vendas")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setVendas(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

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

                        {vendas

                            .filter(venda => {

                                if(filtro === "id"){

                                    return venda.id_venda
                                        ?.toString()
                                        .includes(pesquisa)

                                }

                                if(filtro === "cliente"){

                                    return venda.id_cliente
                                        ?.toString()
                                        .includes(pesquisa)

                                }

                                if(filtro === "status"){

                                    return venda.status
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())

                                }

                            })

                            .map(venda => {

                                return(

                                    <tr key={venda.id_venda}>

                                        <td>{venda.id_venda}</td>

                                        <td>{venda.id_imovel}</td>

                                        <td>{venda.id_cliente}</td>

                                        <td>{venda.id_funcionario}</td>

                                        <td>
                                            R$ {venda.valor_venda}
                                        </td>

                                        <td>{venda.forma_pagamento}</td>

                                        <td>{venda.status}</td>

                                        <td>

                                            <button
                                                onClick={() =>
                                                    navigate(`/vendas/atualizar-vendas/${venda.id_venda}`)
                                                }
                                            >
                                                Editar
                                            </button>

                                            <button
                                                onClick={() =>
                                                    navigate(`/vendas/deletar-vendas/${venda.id_venda}`)
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

export default MostrarVendas