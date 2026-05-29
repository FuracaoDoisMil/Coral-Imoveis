import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function AtualizarLocacoes(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [locacao, setLocacao] = useState(null)

    const [status, setStatus] = useState("")

    useEffect(() => {

        fetch(`http://localhost:5000/locacoes/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setLocacao(dados)

                setStatus(dados.status)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function atualizarLocacao(){

        fetch(`http://localhost:5000/locacoes/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                ...locacao,
                status

            })

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Locação atualizada!")

            navigate("/locacoes/mostrar-locacoes")

        })

    }

    if(!locacao){

        return <h2>Carregando...</h2>

    }

    return(

        <div>

            <h1>Atualizar Locação</h1>

            <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            >

                <option value="aguardando_aprovacao">
                    aguardando_aprovacao
                </option>

                <option value="concluida">
                    concluida
                </option>

                <option value="cancelada">
                    cancelada
                </option>

                <option value="nao_aprovada">
                    nao_aprovada
                </option>

            </select>

            <button onClick={atualizarLocacao}>
                Atualizar
            </button>

        </div>

    )

}

export default AtualizarLocacoes