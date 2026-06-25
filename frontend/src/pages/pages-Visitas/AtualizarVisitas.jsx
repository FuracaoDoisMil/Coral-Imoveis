import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AtualizarVisitas(){

    const { id } = useParams()
    const navigate = useNavigate()

    const [clientes, setClientes] = useState([])
    const [funcionarios, setFuncionarios] = useState([])
    const [imoveis, setImoveis] = useState([])

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
                setIdCliente(dados.id_cliente)
                setIdImovel(dados.id_imovel)
                setIdFuncionario(dados.id_funcionario)
                setDataVisita(dados.data_visita)
                setHoraVisita(dados.hora_visita)
                setStatus(dados.status)
                setObservacoes(dados.observacoes)
            })
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/clientes")
            .then(resposta => resposta.json())
            .then(dados => setClientes(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/funcionarios")
            .then(resposta => resposta.json())
            .then(dados => setFuncionarios(dados))
            .catch(erro => console.log("ERRO:", erro))

        fetch("http://localhost:5000/imoveis")
            .then(resposta => resposta.json())
            .then(dados => setImoveis(dados))
            .catch(erro => console.log("ERRO:", erro))

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

        .catch(erro => console.log("ERRO:", erro))

    }

    return(

        <div className="cadastro-container">

            <h1>Atualizar Visita</h1>

            <div className="form-grid">

                <select
                    value={idCliente}
                    onChange={(e) => setIdCliente(e.target.value)}
                >
                    <option value="">Selecione o Cliente</option>
                    {clientes.map(cliente => (
                        <option
                            key={cliente.id_cliente}
                            value={cliente.id_cliente}
                        >
                            {cliente.nome} {cliente.sobrenome}
                        </option>
                    ))}
                </select>

                <select
                    value={idFuncionario}
                    onChange={(e) => setIdFuncionario(e.target.value)}
                >
                    <option value="">Selecione o Corretor</option>
                    {funcionarios.map(funcionario => (
                        <option
                            key={funcionario.id_funcionario}
                            value={funcionario.id_funcionario}
                        >
                            {funcionario.nome} {funcionario.sobrenome}
                        </option>
                    ))}
                </select>

                <select
                    value={idImovel}
                    onChange={(e) => setIdImovel(e.target.value)}
                >
                    <option value="">Selecione o Imóvel</option>
                    {imoveis.map(imovel => (
                        <option
                            key={imovel.id_imovel}
                            value={imovel.id_imovel}
                        >
                            {imovel.nome_imovel}
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
