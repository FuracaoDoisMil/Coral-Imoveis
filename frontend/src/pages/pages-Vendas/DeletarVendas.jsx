import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function DeletarVendas(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [venda, setVenda] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:5000/vendas/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {

                setVenda(dados)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function deletarVenda(){

        const confirmar = window.confirm(
            "Deseja realmente deletar esta venda?"
        )

        if(!confirmar){

            return

        }

        fetch(`http://localhost:5000/vendas/${id}`, {

            method: "DELETE"

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Venda deletada!")

            navigate("/vendas/mostrar-vendas")

        })

    }

    if(!venda){

        return <h2>Carregando...</h2>

    }

    return(

        <div>

            <h1>Deletar Venda</h1>

            <div className="card-deletar">

                <p>
                    <strong>ID Venda:</strong> {venda.id_venda}
                </p>

                <p>
                    <strong>ID Imóvel:</strong> {venda.id_imovel}
                </p>

                <p>
                    <strong>ID Cliente:</strong> {venda.id_cliente}
                </p>

                <p>
                    <strong>Valor:</strong> R$ {venda.valor_venda}
                </p>

                <p>
                    <strong>Status:</strong> {venda.status}
                </p>

                <button
                    className="btn-deletar"
                    onClick={deletarVenda}
                >
                    Confirmar Exclusão
                </button>

                <button
                    className="btn-cancelar"
                    onClick={() => navigate("/locacoes/mostrar-locacoes")}
                >
                    Cancelar
                </button>

            </div>

        </div>

    )

}

export default DeletarVendas