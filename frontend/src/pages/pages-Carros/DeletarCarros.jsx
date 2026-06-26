import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function DeletarCarros(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [carro, setCarro] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:5000/carros`)

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                const carroEncontrado = dados.find(
                    carro => carro.id_carro == id
                )

                setCarro(carroEncontrado)

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function deletarCarro(){

        const confirmar = window.confirm(
            "Tem certeza que deseja deletar este carro?"
        )

        if(!confirmar){

            return

        }

        fetch(`http://localhost:5000/carros/${id}`, {

            method: "DELETE"

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Carro deletado com sucesso! :D")

            navigate("/admin/carros/mostrar-carros")

        })

        .catch(erro => {

            console.log("ERRO:", erro)

        })

    }

    if(!carro){

        return <h2>Carregando...</h2>

    }

    return(

        <div>

            <h1>Deletar Carro</h1>

            <div className="card-deletar">

                <p>
                    <strong>ID:</strong> {carro.id_carro}
                </p>

                <p>
                    <strong>Modelo:</strong> {carro.modelo_carro}
                </p>

                <p>
                    <strong>Placa:</strong> {carro.placa_carro}
                </p>

                <p>
                    <strong>Situação:</strong> {carro.situacao}
                </p>
                
                <button
                    className="btn-deletar"
                    onClick={deletarCarro}
                >
                    Confirmar Exclusão
                </button>

                <button
                    className="btn-cancelar"
                    onClick={() => navigate("/admin/carros/mostrar-carros")}
                >
                    Cancelar
                </button>

            </div>

        </div>

    )

}

export default DeletarCarros
