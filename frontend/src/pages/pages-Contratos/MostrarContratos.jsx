import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MostrarContratos(){

    const navigate = useNavigate()

    const [contratos, setContratos] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("id")

    useEffect(() => {

        fetch("http://localhost:5000/contratos")
            .then(resposta => resposta.json())
            .then(dados => {
                console.log(dados)
                setContratos(dados)
            })
            .catch(erro => {
                console.log("ERRO:", erro)
            })

        fetch("http://localhost:5000/funcionarios")
            .then(resposta => resposta.json())
            .then(dados => {
                console.log(dados)
                setFuncionarios(dados)
            })
            .catch(erro => {
                console.log("ERRO:", erro)
            })

    }, [])

    return(

        <div>

            <h1>Contratos</h1>

            <div className="filtro-container">

                <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                >
                    <option value="id">ID Contrato</option>
                    <option value="nome">Nome Funcionário</option>
                    <option value="tipo">Tipo</option>
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
                            <th>Tipo</th>
                            <th>Status</th>
                            <th>Nome Funcionário</th>
                            <th>ID Venda</th>
                            <th>ID Locação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>

                        {contratos && contratos
                            .filter(contrato => {

                                if (filtro === "id") {
                                    return contrato.id_contrato
                                        ?.toString()
                                        .includes(pesquisa)
                                }

                                if (filtro === "tipo") {
                                    return contrato.tipo_contrato
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())
                                }

                                if (filtro === "status") {
                                    return contrato.status
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())
                                }

                                if (filtro === "nome") {
                                    const funcionario = funcionarios.find(
                                        f => f.id_funcionario === contrato.id_funcionario
                                    )
                                    return `${funcionario?.nome} ${funcionario?.sobrenome}`
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())
                                }

                            })
                            .map(contrato => {

                                const funcionario = funcionarios.find(
                                    f => f.id_funcionario === contrato.id_funcionario
                                )

                                return (
                                    <tr key={contrato.id_contrato}>
                                        <td>{contrato.id_contrato}</td>
                                        <td>{contrato.tipo_contrato}</td>
                                        <td>{contrato.status}</td>
                                        <td>{funcionario ? `${funcionario.nome} ${funcionario.sobrenome}` : "-"}</td>
                                        <td>{contrato.id_venda ?? "-"}</td>
                                        <td>{contrato.id_locacao ?? "-"}</td>
                                        <td>
                                            <button
                                                onClick={() =>
                                                    navigate(`/admin/contratos/detalhes-contratos/${contrato.id_contrato}`)
                                                }
                                            >
                                                Detalhes
                                            </button>

                                            <button
                                                onClick={()=> 
                                                    navigate(`/admin/contratos/deletar-contratos/${contrato.id_contrato}`)}    
                                            >
                                                Deletar
                                            </button>
                                        </td>
                                    </tr>
                                )

                            })
                        }

                    </tbody>

                </table>

            </div>

        </div>

    )

}

export default MostrarContratos
