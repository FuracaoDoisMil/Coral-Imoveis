import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

function MostrarVisitas(){

    const [visitas, setVisitas] = useState([])

    const [pesquisa, setPesquisa] = useState("")

    const navigate = useNavigate()

    useEffect(() => {

        fetch("http://localhost:5000/visitas")

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setVisitas(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

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
                        <th>ID Cliente</th>
                        <th>ID Imóvel</th>
                        <th>ID Funcionário</th>
                        <th>Data</th>
                        <th>Hora</th>
                        <th>Status</th>
                        <th>Ações</th>

                    </tr>

                </thead>

                <tbody>

                    {visitas

                        .filter(visita =>
                            visita.id_visita
                                .toString()
                                .includes(pesquisa)
                        )

                        .map(visita => (

                            <tr key={visita.id_visita}>

                                <td>{visita.id_visita}</td>
                                <td>{visita.id_cliente}</td>
                                <td>{visita.id_imovel}</td>
                                <td>{visita.id_funcionario}</td>

                                <td>
                                    {new Date(visita.data_visita)
                                        .toLocaleDateString("pt-BR")}
                                </td>

                                <td>{visita.hora_visita}</td>

                                <td>{visita.status}</td>

                                <td>

                                    <button
                                        onClick={() =>
                                            navigate(`/admin/visitas/atualizar-visitas/${visita.id_visita}`)
                                        }
                                    >
                                        Editar
                                    </button>

                                    <button
                                        onClick={() =>
                                            navigate(`/admin/visitas/deletar-visitas/${visita.id_visita}`)
                                        }
                                    >
                                        Deletar
                                    </button>

                                </td>

                            </tr>

                        ))}

                </tbody>

            </table>

        </div>

    )

}

export default MostrarVisitas
