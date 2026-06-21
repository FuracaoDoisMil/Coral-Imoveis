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
            <h1>Gerenciar Vendas 💸</h1>
            <div className="caixinhas_aba_funcionalidades">
                <Link to="mostrar-vendas" className="caixinha">
                    <h3>Mostrar Vendas</h3>
                </Link>
            </div>
        </div>
    )
}
export default Vendas
