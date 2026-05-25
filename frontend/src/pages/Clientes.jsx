import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Clientes(){
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
            <h1>Gerenciar Clientes 🤝</h1>
            <div className="caixinhas_aba_clientes">
                <Link to="/clientes/mostrar-clientes" className="caixinha">
                    <h3>Mostrar Clientes</h3>
                </Link>

                <Link to="/clientes/cadastrar-clientes" className="caixinha">
                    <h3>Cadastrar Clientes</h3>
                </Link>
            </div>
        </div>
    )
}
export default Clientes
