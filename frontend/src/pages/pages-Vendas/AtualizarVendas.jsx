import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function AtualizarVendas(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [venda, setVenda] = useState(null)

    const [status, setStatus] = useState("")

    useEffect(() => {

        fetch(`http://localhost:5000/vendas/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {

                setVenda(dados)

                setStatus(dados.status)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function atualizarVenda(){

        fetch(`http://localhost:5000/vendas/${id}`, {

            method: "PUT",

            headers: {

                "Content-Type": "application/json"

            },

            body: JSON.stringify({

                ...venda,
                status

            })

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Venda atualizada!")

            navigate("/vendas/mostrar-vendas")

        })

    }

    if(!venda){

        return <h2>Carregando...</h2>

    }

    return(

        <div>

            <h1>Atualizar Venda</h1>

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

            <button onClick={atualizarVenda}>
                Atualizar
            </button>

        </div>

    )

}

export default AtualizarVendas