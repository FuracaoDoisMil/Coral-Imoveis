import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Funcionarios(){
    const [funcionarios, setFuncionarios] = useState([])
    useEffect(() => {

    fetch("http://localhost:5000/funcionarios")

        .then(resposta => {
            console.log(resposta)
            return resposta.json()
        })

        .then(dados => {
            console.log(dados)
            setFuncionarios(dados)
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })

}, [])

    return(
        <div>
            <h1>Gerenciar Funcionarios 👨‍💼👩‍💼</h1>
            <div className="caixinhas_aba_funcionalidades">
                <Link to = "mostrar-funcionarios" className ="caixinha">
                    <h3>Mostrar Funcionarios</h3>
                
                </Link>

                <Link to="cadastrar-funcionarios" className="caixinha">

                    <h3>Cadastrar Funcionarios</h3>

                </Link>
                   
            </div>
        </div>
    )

}

export default Funcionarios


