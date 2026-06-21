import { useState } from "react"
import { useNavigate } from "react-router-dom"

function CadastrarCarros(){

    const [modelo, setModelo] = useState("")
    const [placa, setPlaca] = useState("")

    const navigate = useNavigate()

    function cadastrarCarros(){

        if(
            !modelo ||
            !placa
        ){
            alert("Preencha todos os campos obrigatórios!")
            return
        }

        fetch("http://localhost:5000/carros", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                modelo_carro: modelo,
                placa_carro: placa
            })

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log("Carro criado:", dados)

            alert("Carro cadastrado com sucesso! :D")

            setModelo("")
            setPlaca("")

        })

        .catch(erro => {

            console.error("ERRO ao cadastrar carro:", erro)

        })

    }

    return(

        <div className="cadastro-container">

            <h2>Cadastrar carros</h2>

            <div className="form-grid">

                <input
                    type="text"
                    placeholder="Modelo"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Placa do Carro"
                    value={placa}
                    maxLength={8}

                    onChange={(e) => {

                        let valor = e.target.value

                        valor = valor.toUpperCase()

                        valor = valor.replace(/[^A-Z0-9]/g, "")

                        valor = valor.replace(
                            /^([A-Z]{3})(\d)/,
                            "$1-$2"
                        )

                        setPlaca(valor)

                    }}
                />

            </div>

            <button
                className="botao-cadastrar"
                onClick={cadastrarCarros}
            >
                Cadastrar
            </button>

            <button
                className="botao-cadastrar"
                onClick={() => navigate("/admin/carros/mostrar-carros")}
            >
                Cancelar
            </button>

        </div>

    )

}

export default CadastrarCarros
