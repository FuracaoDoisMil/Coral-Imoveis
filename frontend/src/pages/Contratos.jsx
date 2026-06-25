import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Contratos(){
    const [clientes, setClientes] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:5000/clientes`)

        .then(resposta => {
            console.log(resposta)
            return resposta.json()
        })

        .then(dados => {
            console.log(dados)
            setClientes(dados)
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })
    },[])

    return(
        <div>
            <h1>Gerenciar Contratos</h1>
            <div className="caixinhas_aba_funcionalidades">
                <Link to="mostrar-contratos" className="caixinha">
                    <h3>Mostrar Contratos</h3>
                </Link>
            </div>
        </div>
    )
}
export default Contratos
