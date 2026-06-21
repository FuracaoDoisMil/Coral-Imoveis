import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function AtualizarVisitas(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [idCliente, setIdCliente] = useState("")
    const [idImovel, setIdImovel] = useState("")
    const [idFuncionario, setIdFuncionario] = useState("")

    const [dataVisita, setDataVisita] = useState("")
    const [horaVisita, setHoraVisita] = useState("")

    const [status, setStatus] = useState("")

    const [observacoes, setObservacoes] = useState("")

    useEffect(() => {

        fetch(`http://localhost:5000/visitas/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setIdCliente(dados.id_cliente)
                setIdImovel(dados.id_imovel)
                setIdFuncionario(dados.id_funcionario)

                setDataVisita(dados.data_visita)
                setHoraVisita(dados.hora_visita)

                setStatus(dados.status)

                setObservacoes(dados.observacoes)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function atualizarVisita(){

        fetch(`http://localhost:5000/visitas/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                id_cliente: idCliente,
                id_imovel: idImovel,
                id_funcionario: idFuncionario,

                data_visita: dataVisita,
                hora_visita: horaVisita,

                status,
                observacoes

            })

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Visita atualizada com sucesso!")

            navigate("/admin/visitas/mostrar-visitas")

        })

        .catch(erro => {

            console.log("ERRO:", erro)

        })

    }

    return(

        <div className="cadastro-container">

            <h1>Atualizar Visita</h1>

            <div className="form-grid">

                <input
                    type="number"
                    placeholder="ID Cliente"
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="ID Imóvel"
                    value={idImovel}
                    onChange={(e) => setIdImovel(e.target.value)}
                />

                <input
                    type="number"
                    placeholder="ID Funcionário"
                    value={idFuncionario}
                    onChange={(e) => setIdFuncionario(e.target.value)}
                />

                <input
                    type="date"
                    value={dataVisita}
                    onChange={(e) => setDataVisita(e.target.value)}
                />

                <input
                    type="time"
                    value={horaVisita}
                    onChange={(e) => setHoraVisita(e.target.value)}
                />

                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >

                    <option value="aguardando visita">
                        Aguardando visita
                    </option>

                    <option value="visitado">
                        Visitado
                    </option>

                    <option value="cancelado">
                        Cancelado
                    </option>

                </select>

                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />

            </div>

            <button className="botao-cadastrar" onClick={atualizarVisita}>
                Atualizar
            </button>

            <button className="btn-cancelar" onClick={() => navigate("/admin/visitas/mostrar-visitas")}>
                Cancelar
            </button>            


        </div>

    )

}

export default AtualizarVisitas
