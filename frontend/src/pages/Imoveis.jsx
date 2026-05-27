import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Imoveis(){
    const [imoveis, setImoveis] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:5000/imoveis`)

        .then(resposta => {
            console.log(resposta)
            return resposta.json()
        })

        .then(dados => {
            console.log(dados)
            setImoveis(dados)
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })
    },[])

    return(
        <div>
            <h1>Gerenciar Imoveis 🏢</h1>
            <div className="caixinhas_aba_imoveis">
                <Link to="/imoveis/mostrar-imoveis" className="caixinha">
                    <h3>Mostrar Imoveis</h3>
                </Link>

                <Link to="/imoveis/cadastrar-imoveis" className="caixinha">
                    <h3>Cadastrar Imoveis</h3>
                </Link>
            </div>
        </div>
    )
}
export default Imoveis
