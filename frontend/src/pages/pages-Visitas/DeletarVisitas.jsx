import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function DeletarVisitas(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [visita, setVisita] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:5000/visitas/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setVisita(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function deletarVisita(){

        const confirmar = window.confirm(
            "Tem certeza que deseja deletar esta visita?"
        )

        if(!confirmar){

            return

        }

        fetch(`http://localhost:5000/visitas/${id}`, {

            method: "DELETE"

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Visita deletada com sucesso!")

            navigate("/visitas/mostrar-visitas")

        })

        .catch(erro => {

            console.log("ERRO:", erro)

        })

    }

    if(!visita){

        return <h2>Carregando...</h2>

    }

    return(

        <div>

            <h1>Deletar Visita</h1>

            <div className="card-deletar">

                <p>
                    <strong>ID:</strong> {visita.id_visita}
                </p>

                <p>
                    <strong>ID Cliente:</strong> {visita.id_cliente}
                </p>

                <p>
                    <strong>ID Imóvel:</strong> {visita.id_imovel}
                </p>

                <p>
                    <strong>ID Funcionário:</strong> {visita.id_funcionario}
                </p>

                <p>
                    <strong>Data:</strong>{" "}

                    {new Date(visita.data_visita)
                        .toLocaleDateString("pt-BR")}
                </p>

                <p>
                    <strong>Hora:</strong> {visita.hora_visita}
                </p>

                <p>
                    <strong>Status:</strong> {visita.status}
                </p>

                <p>
                    <strong>Observações:</strong> {visita.observacoes}
                </p>

                <button
                    className="btn-deletar"
                    onClick={deletarVisita}
                >
                    Confirmar Exclusão
                </button>

                <button
                    className="btn-cancelar"
                    onClick={() => navigate("/visitas/mostrar-visitas")}
                >
                    Cancelar
                </button>

            </div>

        </div>

    )

}

export default DeletarVisitas