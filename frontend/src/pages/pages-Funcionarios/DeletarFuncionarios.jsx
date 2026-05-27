import { useEffect, useState } from "react"

import { useNavigate, useParams } from "react-router-dom"

function DeletarFuncionarios(){

    const { id } = useParams()

    const navigate = useNavigate()

    const [funcionario, setFuncionario] = useState(null)

    const [telefone, setTelefone] = useState(null)

    useEffect(() => {

        fetch(`http://localhost:5000/funcionarios/${id}`)

            .then(resposta => resposta.json())

            .then(dados => {
                console.log(dados)
                setFuncionario(dados)
            })

            .catch(erro => {
                console.log("ERRO:", erro)
            })

    }, [id])


    useEffect(() => {
        fetch(`http://localhost:5000/telefones/funcionarios/${id}`)

        .then(resposta => resposta.json())

        .then(dados => {
            console.log(dados)
            setTelefone(dados)
        })

        .catch(erro => {
            console.log("ERRO", erro)
        })
    },[id])

    function deletarFuncionario(){

        const confirmar = window.confirm(
            "Tem certeza que deseja deletar este funcionário?"
        )

        if(!confirmar){
            return
        }

        fetch(`http://localhost:5000/funcionarios/${id}`, {

            method: "DELETE"

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Funcionário deletado com sucesso!")

            navigate("/funcionarios/mostrar-funcionarios")

        })

        .catch(erro => {

            console.log("ERRO:", erro)

        })

    }

    if(!funcionario){

        return <h2>Carregando...</h2>

    }

return(

    <div>

        <h1>Deletar Funcionário</h1>

        <div className="card-deletar">

            <p>
                <strong>ID:</strong> {funcionario.id_funcionario}
            </p>
           
            <p>
                <strong>Cargo:</strong> {funcionario.tipo_funcionario}
            </p>                
                
            <p>
                <strong>Nome:</strong> {funcionario.nome}
            </p>

            <p>
                <strong>Sobrenome:</strong> {funcionario.sobrenome}
            </p>

            <p>
                <strong>Sexo:</strong> {funcionario.sexo}
            </p>

            <p>
                <strong>CPF:</strong> {funcionario.CPF}
            </p>

            <p>
                <strong>Data de Nascimento:</strong>{" "}
                {new Date(funcionario.dt_nascimento)
                    .toLocaleDateString("pt-BR")}
            </p>

            <p>
                <strong>Telefone:</strong>{" "}
                {telefone?.numero || "Sem telefone"}
            </p>
            
            <p>
                <strong>E-mail:</strong> {funcionario.email}
            </p>

            <p>
                <strong>Salário:</strong> {funcionario.salario}
            </p>

            <p>
                <strong>Situação:</strong> {funcionario.situacao}
            </p>

            <p>
                <strong>Número da CNH:</strong>{" "}
                {funcionario.CNH_numero || "Sem CNH"}
            </p>

            <p>
                <strong>Categoria da CNH:</strong>{" "}
                {funcionario.CNH_categoria || "Sem CNH"}
            </p>

            <p>
                <strong>Validade da CNH:</strong>{" "}
                {funcionario.CNH_validade
                    ? new Date(funcionario.CNH_validade)
                        .toLocaleDateString("pt-BR")
                    : "Sem CNH"}
            </p>

            <button className="btn-deletar" onClick={deletarFuncionario}>
                Confirmar Exclusão
            </button>

            <button className="btn-cancelar" onClick={() => navigate("/funcionarios/mostrar-funcionarios")}>
                Cancelar
            </button>

        </div>

    </div>

)

}

export default DeletarFuncionarios
