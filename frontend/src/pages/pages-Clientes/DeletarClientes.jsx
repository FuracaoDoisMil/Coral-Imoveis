import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function DeletarClientes(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [cliente, setClientes] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:5000/clientes/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {
                console.log(dados)
                setClientes(dados)
            })

            .catch(erro => {
                console.log("ERRO:", erro)
            })

    }, [id])


    function deletarClientes(){

        const confirmar = window.confirm(
            "Tem certeza que deseja deletar este cliente?"
        )

        if(!confirmar){
            return
        }

        fetch(`http://localhost:5000/clientes/${id}`, {

            method: "DELETE"

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Cliente deletado com sucesso! :D")

            navigate("/clientes/mostrar-clientes")

        })

        .catch(erro => {

            console.log("ERRO:", erro)

        })

    }

    if(!cliente){

        return <h2>Carregando...</h2>

    }

return(

    <div>

        <h1>Deletar Cliente</h1>

        <div className="card-deletar">

            <p>
                <strong>ID:</strong> {cliente.id_cliente}
            </p>                
                
            <p>
                <strong>Nome:</strong> {cliente.nome}
            </p>

            <p>
                <strong>Sobrenome:</strong> {cliente.sobrenome}
            </p>

            <p>
                <strong>Sexo:</strong> {cliente.sexo}
            </p>

            <p>
                <strong>CPF:</strong> {cliente.CPF}
            </p>

            <p>
                <strong>Data de Nascimento:</strong>{" "}
                {new Date(cliente.dt_nascimento)
                    .toLocaleDateString("pt-BR")}
            </p>

            <p>
                <strong>E-mail:</strong> {cliente.email}
            </p>
            
            <p>
                <strong>Telefone:</strong>{cliente.telefone}
            </p>

            <p>
                <strong>Situação:</strong> {cliente.situacao}
            </p>

            <button className="btn-deletar" onClick={deletarClientes}>
                Confirmar Exclusão
            </button>

            <button className="btn-cancelar" onClick={() => navigate("/clientes/mostrar-clientes")}>
                Cancelar
            </button>

        </div>

    </div>

)

}

export default DeletarClientes
