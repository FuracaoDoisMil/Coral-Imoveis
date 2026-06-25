import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function MostrarCarros(){

    const [carros, setCarros] = useState([])
    const [pesquisa, setPesquisa] = useState("")
    const [filtro, setFiltro] = useState("modelo")

    const navigate = useNavigate()

    useEffect(() => {

        fetch(`http://localhost:5000/carros`)
            .then(resposta => resposta.json())
            .then(dados => {
                console.log(dados)
                setCarros(dados)
            })
            .catch(erro => console.log("ERRO:", erro))

    }, [])

    return(
        <div>

            <h1>Carros</h1>

            <div className="filtro-container">

                <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
                    <option value="id">ID</option>
                    <option value="modelo">Modelo do Carro</option>
                    <option value="placa">Placa do Carro</option>
                    <option value="situacao">Situação</option>
                </select>

                <input
                    type="text"
                    placeholder="Pesquisar carros..."
                    value={pesquisa}
                    onChange={(e) => setPesquisa(e.target.value)}
                />

            </div>

            <div className="tabela-container">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Modelo do Carro</th>
                            <th>Placa do Carro</th>
                            <th>Situação</th>
                            <th>Ações</th>
                        </tr>
                    </thead>

                    <tbody>
                        {carros
                            .filter(carro => {
                                if(filtro === "id") return carro.id_carro?.toString().includes(pesquisa)
                                if(filtro === "modelo") return carro.modelo_carro?.toLowerCase().includes(pesquisa.toLowerCase())
                                if(filtro === "placa") return carro.placa_carro?.toLowerCase().includes(pesquisa.toLowerCase())
                                if(filtro === "situacao") return carro.situacao?.toLowerCase().includes(pesquisa.toLowerCase())
                            })
                            .map(carro => (
                                <tr key={carro.id_carro}>
                                    <td>{carro.id_carro}</td>
                                    <td>{carro.modelo_carro}</td>
                                    <td>{carro.placa_carro}</td>
                                    <td>{carro.situacao}</td>
                                    <td>

                                        {carro.situacao === "disponivel" && (
                                            <button onClick={() => navigate(`/admin/carros/usar-carro/${carro.id_carro}`)}>
                                                Usar Carro
                                            </button>
                                        )}

                                        {carro.situacao === "indisponivel" && (
                                            <button onClick={() => navigate(`/admin/carros/retorno-carro/${carro.id_carro}`)}>
                                                Registrar Retorno
                                            </button>
                                        )}

                                        <button onClick={() => navigate(`/admin/carros/atualizar-carros/${carro.id_carro}`)}>
                                            Editar
                                        </button>

                                        <button onClick={() => navigate(`/admin/carros/deletar-carros/${carro.id_carro}`)}>
                                            Deletar
                                        </button>

                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>

        </div>
    )

}

export default MostrarCarros
