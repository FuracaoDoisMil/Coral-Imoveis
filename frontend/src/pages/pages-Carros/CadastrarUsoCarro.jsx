import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function CadastrarUsoCarro(){
    const { id } = useParams()
    const navigate = useNavigate()

    const [funcionarios, setFuncionarios] = useState([])
    const [idFuncionario, setIdFuncionario] = useState("")
    const [dataSaida, setDataSaida] = useState("")
    const [horaSaida, setHoraSaida] = useState("")
    const [observacoes, setObservacoes] = useState("")

    useEffect(() => {

        fetch("http://localhost:5000/funcionarios")
            .then(resposta => resposta.json())
            .then(dados => setFuncionarios(dados))
            .catch(erro => console.log("ERRO:", erro))

    }, [])

    function registrarSaida(){

        if(!idFuncionario || !dataSaida || !horaSaida){
            alert("Preencha todos os campos obrigatórios!")
            return
        }

        fetch("http://localhost:5000/uso-carro", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_funcionario: idFuncionario,
                id_carro: id,
                data_saida: dataSaida,
                hora_saida: horaSaida,
                data_retorno: null,
                hora_retorno: null,
                observacoes: observacoes
            })
        })

        .then(resposta => resposta.json())

        .then(() => {
            return fetch(`http://localhost:5000/carros/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    situacao: "indisponivel"
                })
            })
        })

        .then(() => {
            alert("Saída registrada com sucesso!")
            navigate("/admin/carros/mostrar-carros")
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })

    }

    return(

        <div className="cadastro-container">

            <h1>Registrar Saída do Carro</h1>

            <div className="form-grid">

                <select
                    value={idFuncionario}
                    onChange={(e) => setIdFuncionario(e.target.value)}
                >
                    <option value="">Selecione o Funcionário</option>
                    {funcionarios.map(funcionario => (
                        <option
                            key={funcionario.id_funcionario}
                            value={funcionario.id_funcionario}
                        >
                            {funcionario.nome} {funcionario.sobrenome}
                        </option>
                    ))}
                </select>

                <input
                    type="date"
                    value={dataSaida}
                    onChange={(e) => setDataSaida(e.target.value)}
                />

                <input
                    type="time"
                    value={horaSaida}
                    onChange={(e) => setHoraSaida(e.target.value)}
                />

                <textarea
                    placeholder="Observações"
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                />

            </div>
            
            <button
                className="botao-cadastrar"
                onClick={registrarSaida}
            >
                Registrar Saída
            </button>
                    

            <button
                className="botao-cadastrar"
                onClick={() => navigate("/admin/carros/mostrar-carros")}
            >
                Cancelar
            </button>

        </div>

    )

}

export default CadastrarUsoCarro
