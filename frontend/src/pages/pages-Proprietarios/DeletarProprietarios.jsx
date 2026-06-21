import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function DeletarProprietarios(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [proprietario, setProprietario] = useState(null)

    const [telefone, setTelefone] = useState("")

    useEffect(() => {

        fetch(`http://localhost:5000/proprietarios/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {

                console.log(dados)

                setProprietario(dados)

                return fetch(`http://localhost:5000/telefones/proprietarios/${id}`)

            })

            .then(resposta => {

                if(!resposta.ok){

                    return null

                }

                return resposta.json()

            })

            .then(dados => {

                if(dados){

                    const telefoneFormatado = dados.numero
                        .replace(/^(\d{2})(\d)/g, "($1) $2")
                        .replace(/(\d{5})(\d)/, "$1-$2")

                    setTelefone(telefoneFormatado)

                }

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])


    function deletarProprietarios(){

        const confirmar = window.confirm(
            "Tem certeza que deseja deletar este proprietário?"
        )

        if(!confirmar){

            return

        }

        fetch(`http://localhost:5000/proprietarios/${id}`, {

            method: "DELETE"

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Proprietario deletado com sucesso! :D")

            navigate("/admin/proprietarios/mostrar-proprietarios")

        })

        .catch(erro => {

            console.log("ERRO:", erro)

        })

    }

    if(!proprietario){

        return <h2>Carregando...</h2>

    }

    return(

        <div>

            <h1>Deletar Proprietario</h1>

            <div className="card-deletar">

                <p>
                    <strong>ID:</strong> {proprietario.id_proprietario}
                </p>

                <p>
                    <strong>Nome:</strong> {proprietario.nome}
                </p>

                <p>
                    <strong>Sobrenome:</strong> {proprietario.sobrenome}
                </p>

                <p>
                    <strong>Sexo:</strong> {proprietario.sexo}
                </p>

                <p>
                    <strong>CPF:</strong> {proprietario.CPF || "Não possui CPF"}
                </p>

                <p>
                    <strong>CNPJ:</strong> {proprietario.CNPJ || "Não possui CNPJ"}
                </p>

                <p>
                    <strong>Data de Nascimento:</strong>{" "}
                    {new Date(proprietario.dt_nascimento)
                        .toLocaleDateString("pt-BR")}
                </p>

                <p>
                    <strong>E-mail:</strong> {proprietario.email}
                </p>

                <p>
                    <strong>Telefone:</strong> {telefone || "Sem telefone"}
                </p>

                <p>
                    <strong>Situação:</strong> {proprietario.situacao}
                </p>

                <button
                    className="btn-deletar"
                    onClick={deletarProprietarios}
                >
                    Confirmar Exclusão
                </button>

                <button
                    className="btn-cancelar"
                    onClick={() => navigate("/admin/proprietarios/mostrar-proprietarios")}
                >
                    Cancelar
                </button>

            </div>

        </div>

    )

}

export default DeletarProprietarios
