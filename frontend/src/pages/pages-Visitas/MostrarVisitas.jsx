import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MostrarVisitas(){
    const funcionario = JSON.parse(localStorage.getItem("funcionario"))
    const tipo = funcionario?.tipo_funcionario       
    const [visitas, setVisitas] = useState([])
    const [clientes, setClientes] = useState([])
    const [imoveis, setImoveis] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [pesquisa, setPesquisa] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        fetch("http://localhost:5000/visitas")
            .then(resposta => resposta.json())
            .then(dados => setVisitas(dados))
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
            <h1>Visitas</h1>
            <input
                type="text"
                placeholder="Pesquisar por ID..."
                value={pesquisa}
                onChange={(e) => setPesquisa(e.target.value)}
            />
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cliente</th>
                        <th>Imóvel</th>
                        <th>Corretor</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Status</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {visitas
                        .filter(visita =>
                            visita.id_visita.toString().includes(pesquisa)
                        )
                        .map(visita => {

                            const cliente = clientes.find(c => c.id_cliente === visita.id_cliente)
                            const imovel = imoveis.find(i => i.id_imovel === visita.id_imovel)
                           const corretor = funcionarios.find(f => 
                                f.id_funcionario === visita.id_funcionario && 
                                f.tipo_funcionario === "Corretor"
                            )
                            return (
                                <tr key={visita.id_visita}>
                                    <td>{visita.id_visita}</td>
                                    <td>{cliente?.nome} {cliente?.sobrenome}</td>
                                    <td>{imovel?.nome_imovel}</td>
                                    <td>{corretor?.nome} {corretor?.sobrenome}</td>
                                    <td>
                                        {new Date(visita.data_visita).toLocaleDateString("pt-BR")}
                                    </td>
                                    <td>{visita.hora_visita}</td>
                                    <td>{visita.status}</td>
                                    <td>
                                        {(tipo === "Secretario" || tipo === "Gerente") && (
                                            <>
                                                <button
                                                    onClick={() => navigate(`/admin/visitas/atualizar-visitas/${visita.id_visita}`)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    onClick={() => navigate(`/admin/visitas/deletar-visitas/${visita.id_visita}`)}
                                                >
                                                    Deletar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                </tbody>
            </table>
        </div>
    )
}

export default MostrarVisitas
