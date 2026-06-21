import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Carros(){
    const [carros, setCarros] = useState([])
    
    useEffect(() => {
        fetch(`http://localhost:5000/carros`)

        .then(resposta => {
            console.log(resposta)
            return resposta.json()
        })

        .then(dados => {
            console.log(dados)
            setCarros(dados)
        })

        .catch(erro => {
            console.log("ERRO:", erro)
        })
    },[])

    return(
        <div>
            <h1>Gerenciar Carros 🏎️</h1>
            <div className="caixinhas_aba_funcionalidades">
                <Link to="mostrar-carros" className="caixinha">
                    <h3>Mostrar Carros</h3>
                </Link>

                <Link to="cadastrar-carros" className="caixinha">
                    <h3>Cadastrar carros</h3>
                </Link>
            </div>
        </div>
    )
}
export default Carros
