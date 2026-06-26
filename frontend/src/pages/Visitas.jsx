import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Vendas(){
    const [vendas, setVendas] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:5000/vendas`)

        .then(resposta => {
            console.log(resposta)
            return resposta.json()
        })

        .then(dados => {
            console.log(dados)
            setVendas(dados)
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })
    },[])

    return(
        <div>
            <h1>Gerenciar Visitas 🏢 </h1>
            <div className="caixinha_aba_funcionalidade_unica">
                <Link to="mostrar-visitas" className="caixinha">
                    <h3>Mostrar Visitas</h3>
                </Link>
            </div>
        </div>
    )
}
export default Vendas
