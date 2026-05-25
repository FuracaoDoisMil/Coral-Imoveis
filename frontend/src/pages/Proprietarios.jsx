import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Proprietarios(){
    const [proprietarios, setProprietarios] = useState([])
    useEffect(() => {

    fetch(`http://localhost:5000/proprietarios`)

        .then(resposta => {
            console.log(resposta)
            return resposta.json()
        })

        .then(dados => {
            console.log(dados)
            setProprietarios(dados)
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })

}, [])

    return(
        <div>
            <h1>Gerenciar Proprietarios 🤝</h1>
            <div className="caixinhas_aba_proprietarios">
                <Link to = "/proprietarios/mostrar-proprietarios" className ="caixinha">
                    <h3>Mostrar Proprietarios</h3>
                
                </Link>

                <Link to="/proprietarios/cadastrar-proprietarios" className="caixinha">

                    <h3>Cadastrar Proprietarios</h3>

                </Link>
                   
            </div>
        </div>
    )

}

export default Proprietarios


