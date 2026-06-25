import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function CadastrarVisitas(){

    const { id } = useParams()
    const navigate = useNavigate()

    const [idCliente, setIdCliente] = useState("")
    const [idFuncionario, setIdFuncionario] = useState("")
    const [dataVisita, setDataVisita] = useState("")
    const [horaVisita, setHoraVisita] = useState("")
    const [status, setStatus] = useState("aguardando visita")
    const [observacoes, setObservacoes] = useState("")

    function cadastrarVisita(){
        fetch(`http://localhost:5000/visitas/${id}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_cliente: idCliente,
                id_imovel: id,
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
            alert("Visita cadastrada com sucesso!")
            navigate("/admin/visitas/mostrar-visitas")
        })
        .catch(erro => {
            console.log("ERRO:", erro)
        })
    }

    return(
        <div className="cadastro-container">

            <h1>Cadastrar Visita</h1>

            <div className="form-grid">

                <input
                    type="number"
                    placeholder="ID Cliente"
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
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
                    <option value="aguardando visita">Aguardando visita</option>
                    <option value="visitado">Visitado</option>
                    <option value="cancelado">Cancelado</option>
                </select>

                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />

            </div>

            <button
                className="botao-cadastrar"
                onClick={cadastrarVisita}
            >
                Cadastrar
            </button>

            <button
                className="btn-cancelar"
                onClick={() => navigate("/admin/visitas/mostrar-visitas")}
            >
                Cancelar
            </button>

        </div>
    )
}

export default CadastrarVisitas
