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
            <div className="caixinhas_aba_visitas">
                <Link to="/visitas/mostrar-visitas" className="caixinha">
                    <h3>Mostrar Visitas</h3>
                </Link>

                <Link to="/visitas/cadastrar-visitas" className="caixinha">
                    <h3>Cadastrar Visitas</h3>
                </Link>


            </div>
        </div>
    )
}
export default Vendas
