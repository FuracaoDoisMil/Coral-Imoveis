import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

function AtualizarCarros(){

    const [modelo, setModelo] = useState("")
    const [placa, setPlaca] = useState("")
    const [situacao, setSituacao] = useState("disponivel")

    const { id } = useParams()

    const navigate = useNavigate()

    useEffect(() => {

        fetch(`http://localhost:5000/carros`)

            .then(resposta => resposta.json())

            .then(dados => {

                const carro = dados.find(
                    carro => carro.id_carro == id
                )

                if(carro){

                    setModelo(carro.modelo_carro)
                    setPlaca(carro.placa_carro)
                    setSituacao(carro.situacao)

                }

            })

            .catch(erro => {

                console.log("ERRO:", erro)

            })

    }, [id])

    function atualizarCarro(){

        if(
            !modelo ||
            !placa ||
            !situacao
        ){
            alert("Preencha todos os campos!")
            return
        }

        fetch(`http://localhost:5000/carros/${id}`, {

            method: "PUT",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                modelo_carro: modelo,
                placa_carro: placa,
                situacao: situacao
            })

        })

        .then(resposta => resposta.json())

        .then(dados => {

            console.log(dados)

            alert("Carro atualizado com sucesso! :D")

            navigate("/admin/carros/mostrar-carros")

        })

        .catch(erro => {

            console.log("ERRO:", erro)

        })

    }

    return(

        <div className="cadastro-container">

            <h2>Atualizar carro</h2>

            <div className="form-grid">

                <input
                    type="text"
                    placeholder="Modelo"
                    value={modelo}
                    onChange={(e) => setModelo(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Placa"
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

                <select
                    value={situacao}
                    onChange={(e) => setSituacao(e.target.value)}
                >

                    <option value="disponivel">
                        Disponível
                    </option>

                    <option value="indisponivel">
                        Indisponivel
                    </option>

                </select>

            </div>
    

            <button
                className="botao-cadastrar"
                onClick={atualizarCarro}
            >
                Atualizar
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

export default AtualizarCarros
