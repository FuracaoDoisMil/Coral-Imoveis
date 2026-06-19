import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

function Contratos(){
    const [contratos, setContratos] = useState([])
    useEffect(() => {

    fetch("http://localhost:5000/contratos")

        .then(resposta => {
            console.log(resposta)
            return resposta.json()
        })

        .then(dados => {
            console.log(dados)
            setContratos(dados)
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })

}, [])

    return(
        <div>
            <h1>Gerenciar Contratos 📋✍️</h1>
            <div className="caixinhas_aba_funcionalidades">
                <Link to = "/contratos/mostrar-contratos" className ="caixinha">
                    <h3>Mostrar Contratos</h3>
                
                </Link>

                <Link to="/contratos/cadastrar-contratos" className="caixinha">

                    <h3>Gerar Contratos</h3>

                </Link>
                   
            </div>
        </div>
    )

}

export default Contratos


