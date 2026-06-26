import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MostrarContratos(){
    const funcionario = JSON.parse(localStorage.getItem("funcionario"))
    const tipo = funcionario?.tipo_funcionario      

    const navigate = useNavigate()

    const [contratos, setContratos] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [imoveis, setImoveis] = useState([])
    const [vendas, setVendas] = useState([])
    const [locacoes, setLocacoes] = useState([])
    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("id")

    useEffect(() => {

        fetch("http://localhost:5000/contratos")
            .then(resposta => resposta.json())
            .then(dados => setContratos(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/funcionarios")
            .then(resposta => resposta.json())
            .then(dados => setFuncionarios(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/vendas")
            .then(resposta => resposta.json())
            .then(dados => setVendas(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/locacoes")
            .then(resposta => resposta.json())
            .then(dados => setLocacoes(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/imoveis")
            .then(resposta => resposta.json())
            .then(dados => setImoveis(dados))
            .catch(erro => console.log("ERRO:", erro))

    }, [])

    function getNomeImovel(contrato) {
        if (contrato.id_venda) {
            const venda = vendas.find(v => v.id_venda === contrato.id_venda)
            const imovel = imoveis.find(i => i.id_imovel === venda?.id_imovel)
            return imovel?.nome_imovel ?? "-"
        } else if (contrato.id_locacao) {
            const locacao = locacoes.find(l => l.id_locacao === contrato.id_locacao)
            const imovel = imoveis.find(i => i.id_imovel === locacao?.id_imovel)
            return imovel?.nome_imovel ?? "-"
        }
        return "-"
    }

    return(

        <div>

            <h1>Contratos</h1>

            <div className="filtro-container">

                <select
                    value={filtro}
                    onChange={(e) => setFiltro(e.target.value)}
                >
                    <option value="id">ID Contrato</option>
                    <option value="nome">Nome Corretor</option>
                    <option value="tipo">Tipo</option>
                    <option value="status">Status</option>
                    <option value="nome_imovel">Nome Imóvel</option>
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
                            <th>ID Venda</th>
                            <th>ID Locação</th>
                            <th>Tipo</th>
                            <th>Nome do Imóvel</th>
                            <th>Nome do Corretor</th>
                            <th>Status</th>
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
                                    const func = funcionarios.find(
                                        f => f.id_funcionario === contrato.id_funcionario
                                    )
                                    return `${func?.nome} ${func?.sobrenome}`
                                        ?.toLowerCase()
                                        .includes(pesquisa.toLowerCase())
                                }

                                if (filtro === "nome_imovel") {
                                    return getNomeImovel(contrato)
                                        .toLowerCase()
                                        .includes(pesquisa.toLowerCase())
                                }

                            })
                            .map(contrato => {

                                const func = funcionarios.find(
                                    f => f.id_funcionario === contrato.id_funcionario
                                )

                                return (
                                    <tr key={contrato.id_contrato}>
                                        <td>{contrato.id_contrato}</td>
                                        <td>{contrato.id_venda ?? "-"}</td>
                                        <td>{contrato.id_locacao ?? "-"}</td>
                                        <td>{contrato.tipo_contrato}</td>
                                        <td>{getNomeImovel(contrato)}</td>
                                        <td>{func ? `${func.nome} ${func.sobrenome}` : "-"}</td>
                                        <td>{contrato.status}</td>
                                        <td>
                                            {(tipo === "Gerente") && (
                                                <>
                                                    <button
                                                        onClick={() =>
                                                            navigate(`/admin/contratos/detalhes-contratos/${contrato.id_contrato}`)
                                                        }
                                                    >
                                                        Detalhes
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            navigate(`/admin/contratos/deletar-contratos/${contrato.id_contrato}`)
                                                        }
                                                    >
                                                        Deletar
                                                    </button>
                                                </>
                                            )}
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
