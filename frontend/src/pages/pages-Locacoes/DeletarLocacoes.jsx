import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function DeletarLocacoes(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [locacao, setLocacao] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:5000/locacoes/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setLocacao(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function deletarLocacao(){

        const confirmar = window.confirm(
            "Deseja realmente deletar esta locação?"
        )

        if(!confirmar){

            return

        }

        fetch(`http://localhost:5000/locacoes/${id}`, {

            method: "DELETE"

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Locação deletada!")

            navigate("/admin/locacoes/mostrar-locacoes")

        })

    }

    if(!locacao){

        return <h2>Carregando...</h2>

    }

    return(

        <div>

            <h1>Deletar Locação</h1>

            <div className="card-deletar">

                <p>
                    <strong>ID Locação:</strong> {locacao.id_locacao}
                </p>

                <p>
                    <strong>ID Imóvel:</strong> {locacao.id_imovel}
                </p>

                <p>
                    <strong>ID Cliente:</strong> {locacao.id_cliente}
                </p>

                <p>
                    <strong>Valor:</strong> R$ {locacao.valor_aluguel}
                </p>

                <p>
                    <strong>Status:</strong> {locacao.status}
                </p>

                <button
                    className="btn-deletar"
                    onClick={deletarLocacao}
                >
                    Confirmar Exclusão
                </button>

                <button
                    className="btn-cancelar"
                    onClick={() => navigate("/admin/locacoes/mostrar-locacoes")}
                >
                    Cancelar
                </button>

            </div>

        </div>

    )

}

export default DeletarLocacoes
