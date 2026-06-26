import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function CadastrarVisitas(){

    const { id } = useParams()
    const navigate = useNavigate()

    const [clientes, setClientes] = useState([])
    const [funcionarios, setFuncionarios] = useState([])

    const [idCliente, setIdCliente] = useState("")
    const [idFuncionario, setIdFuncionario] = useState("")
    const [dataVisita, setDataVisita] = useState("")
    const [horaVisita, setHoraVisita] = useState("")
    const [observacoes, setObservacoes] = useState("")

    useEffect(() => {

        fetch("http://localhost:5000/clientes")
            .then(resposta => resposta.json())
            .then(dados => setClientes(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/funcionarios")
            .then(resposta => resposta.json())
            .then(dados => setFuncionarios(dados))
            .catch(erro => console.log("ERRO:", erro))

    }, [])

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

                <select
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                >
                    <option value="">Selecione o Cliente</option>
                    {clientes.map(cliente => (
                        <option key={cliente.id_cliente} value={cliente.id_cliente}>
                            {cliente.nome} {cliente.sobrenome}
                        </option>
                    ))}
                </select>

                <select
                    value={idFuncionario}
                    onChange={(e) => setIdFuncionario(e.target.value)}
                >
                    <option value="">Selecione o Corretor</option>
                    {funcionarios
                        .filter(funcionario => funcionario.tipo_funcionario === "Corretor")
                        .map(funcionario => (
                            <option key={funcionario.id_funcionario} value={funcionario.id_funcionario}>
                                {funcionario.nome} {funcionario.sobrenome}
                            </option>
                        ))}
                </select>

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
                onClick={() => navigate("/admin/visitas")}
            >
                Cancelar
            </button>

        </div>

    )

}

export default CadastrarVisitas
