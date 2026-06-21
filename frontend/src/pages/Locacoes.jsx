import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Locacoes(){
    const [locacoes, setLocacoes] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:5000/locacoes`)

        .then(resposta => {
            console.log(resposta)
            return resposta.json()
        })

        .then(dados => {
            console.log(dados)
            setLocacoes(dados)
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })
    },[])

    return(
        <div>
            <h1>Gerenciar Locacoes 💸</h1>
            <div className="caixinhas_aba_funcionalidades">
                <Link to="mostrar-locacoes" className="caixinha">
                    <h3>Mostrar Locações</h3>
                </Link>
            </div>
        </div>
    )
}
export default Locacoes
